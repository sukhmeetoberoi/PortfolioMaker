from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os
import json
import zipfile
import tempfile
from datetime import datetime
from jinja2 import Template
import re

app = Flask(__name__)
CORS(app)

class PortfolioGenerator:
    def __init__(self):
        self.github_token = os.getenv('GITHUB_TOKEN', '')
    
    def fetch_github_data(self, username):
        """Fetch GitHub profile and repository data"""
        try:
            # Get user profile
            profile_url = f"https://api.github.com/users/{username}"
            headers = {'Authorization': f'token {self.github_token}'} if self.github_token else {}
            
            profile_response = requests.get(profile_url, headers=headers)
            if profile_response.status_code != 200:
                return None
            
            profile_data = profile_response.json()
            
            # Get repositories
            repos_url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=10"
            repos_response = requests.get(repos_url, headers=headers)
            repos_data = repos_response.json() if repos_response.status_code == 200 else []
            
            # Filter and format repositories
            formatted_repos = []
            for repo in repos_data:
                if not repo['fork']:  # Exclude forked repositories
                    formatted_repos.append({
                        'name': repo['name'],
                        'description': repo['description'] or 'No description available',
                        'html_url': repo['html_url'],
                        'language': repo['language'],
                        'stars': repo['stargazers_count'],
                        'forks': repo['forks_count'],
                        'updated_at': repo['updated_at']
                    })
            
            return {
                'profile': {
                    'name': profile_data.get('name', username),
                    'bio': profile_data.get('bio', ''),
                    'avatar_url': profile_data.get('avatar_url', ''),
                    'html_url': profile_data.get('html_url', ''),
                    'location': profile_data.get('location', ''),
                    'company': profile_data.get('company', ''),
                    'blog': profile_data.get('blog', ''),
                    'public_repos': profile_data.get('public_repos', 0),
                    'followers': profile_data.get('followers', 0),
                    'following': profile_data.get('following', 0)
                },
                'repositories': formatted_repos
            }
        except Exception as e:
            print(f"Error fetching GitHub data: {e}")
            return None
    
    def fetch_linkedin_data(self, profile_url):
        """Fetch basic LinkedIn profile data (limited due to API restrictions)"""
        try:
            # Extract username from LinkedIn URL
            username_match = re.search(r'linkedin\.com/in/([^/]+)', profile_url)
            if not username_match:
                return None
            
            username = username_match.group(1)
            
            # For now, return basic structure - LinkedIn API requires OAuth
            return {
                'profile': {
                    'name': '',
                    'headline': '',
                    'summary': '',
                    'location': '',
                    'profile_url': profile_url,
                    'username': username
                },
                'experience': [],
                'education': [],
                'skills': []
            }
        except Exception as e:
            print(f"Error processing LinkedIn data: {e}")
            return None

portfolio_gen = PortfolioGenerator()

@app.route('/api/fetch-github', methods=['POST'])
def fetch_github():
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        return jsonify({'error': 'GitHub username is required'}), 400
    
    github_data = portfolio_gen.fetch_github_data(username)
    if github_data is None:
        return jsonify({'error': 'Failed to fetch GitHub data'}), 404
    
    return jsonify(github_data)

@app.route('/api/fetch-linkedin', methods=['POST'])
def fetch_linkedin():
    data = request.get_json()
    profile_url = data.get('profile_url')
    
    if not profile_url:
        return jsonify({'error': 'LinkedIn profile URL is required'}), 400
    
    linkedin_data = portfolio_gen.fetch_linkedin_data(profile_url)
    if linkedin_data is None:
        return jsonify({'error': 'Invalid LinkedIn profile URL'}), 400
    
    return jsonify(linkedin_data)

@app.route('/api/generate-portfolio', methods=['POST'])
def generate_portfolio():
    data = request.get_json()
    
    # Extract form data
    form_data = data.get('form_data', {})
    github_data = data.get('github_data', {})
    linkedin_data = data.get('linkedin_data', {})
    template_id = data.get('template_id', 'modern')
    
    try:
        # Generate portfolio files
        portfolio_files = generate_portfolio_files(form_data, github_data, linkedin_data, template_id)
        
        # Create ZIP file
        temp_dir = tempfile.mkdtemp()
        zip_path = os.path.join(temp_dir, f'portfolio_{datetime.now().strftime("%Y%m%d_%H%M%S")}.zip')
        
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for filename, content in portfolio_files.items():
                zipf.writestr(filename, content)
        
        return send_file(zip_path, as_attachment=True, download_name='portfolio.zip')
    
    except Exception as e:
        return jsonify({'error': f'Failed to generate portfolio: {str(e)}'}), 500

def generate_portfolio_files(form_data, github_data, linkedin_data, template_id):
    """Generate portfolio files based on template and data"""
    
    # Combine all data
    portfolio_data = {
        'personal': form_data,
        'github': github_data,
        'linkedin': linkedin_data,
        'generated_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    # Load template
    template_files = get_template_files(template_id)
    generated_files = {}
    
    for filename, template_content in template_files.items():
        if filename.endswith(('.html', '.css', '.js')):
            # Process template with Jinja2
            template = Template(template_content)
            generated_files[filename] = template.render(**portfolio_data)
        else:
            # Copy static files as-is
            generated_files[filename] = template_content
    
    return generated_files

def get_template_files(template_id):
    """Get template files for the specified template"""
    templates_dir = 'templates'
    template_path = os.path.join(templates_dir, template_id)
    
    if not os.path.exists(template_path):
        template_id = 'modern'  # Fallback to default
        template_path = os.path.join(templates_dir, template_id)
    
    template_files = {}
    
    # Read all files in template directory
    for root, dirs, files in os.walk(template_path):
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, template_path)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                template_files[relative_path] = f.read()
    
    return template_files

@app.route('/api/templates', methods=['GET'])
def get_templates():
    """Get available portfolio templates"""
    templates = [
        {
            'id': 'modern',
            'name': 'Modern Portfolio',
            'description': 'Clean and modern design with dark theme',
            'preview': '/templates/modern/preview.jpg'
        },
        {
            'id': 'classic',
            'name': 'Classic Portfolio',
            'description': 'Traditional layout with professional styling',
            'preview': '/templates/classic/preview.jpg'
        },
        {
            'id': 'creative',
            'name': 'Creative Portfolio',
            'description': 'Colorful and creative design for artists',
            'preview': '/templates/creative/preview.jpg'
        }
    ]
    return jsonify(templates)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)