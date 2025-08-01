# Portfolio Generator

A web application that generates beautiful, professional portfolios using GitHub repositories, LinkedIn profiles, and personal information. Choose from multiple templates and download ready-to-use code.

![Portfolio Generator](https://img.shields.io/badge/Portfolio-Generator-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![Flask](https://img.shields.io/badge/Flask-2.3+-red)

## ✨ Features

- **GitHub Integration**: Automatically fetch repositories, profile data, and statistics
- **LinkedIn Support**: Process LinkedIn profile URLs for professional information
- **Multiple Templates**: Choose from modern, classic, and creative portfolio designs
- **Personal Information Form**: Add custom details, skills, and contact information
- **Instant Download**: Generate and download complete portfolio code as ZIP file
- **Responsive Design**: All templates are mobile-friendly and responsive
- **Real-time Preview**: See your portfolio data before generating

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-generator
   ```

2. **Set up the backend**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up the frontend**
   ```bash
   # Install Node.js dependencies
   npm install
   ```

4. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   python app.py
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to use the application.

## 🎨 Available Templates

### Modern Portfolio
- Dark theme with neon accents
- Animated elements and smooth transitions
- Perfect for developers and tech professionals
- Features: Hero section, project showcase, skills grid

### Classic Portfolio
- Professional and clean design
- Traditional layout with elegant typography
- Ideal for business professionals
- Features: Header navigation, about section, portfolio grid

### Creative Portfolio
- Vibrant colors and creative animations
- Artistic design with floating elements
- Great for artists and creative professionals
- Features: Animated backgrounds, colorful gradients, interactive elements

## 📋 Usage

1. **Personal Information**: Fill out your basic details, skills, and contact information
2. **GitHub Data**: Enter your GitHub username to fetch repositories and profile data
3. **LinkedIn Profile**: Provide your LinkedIn URL for professional information
4. **Template Selection**: Choose from available portfolio templates
5. **Preview**: Review your portfolio data in the preview section
6. **Generate**: Click "Generate Portfolio" to create and download your portfolio

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: GitHub API token for higher rate limits
GITHUB_TOKEN=your_github_personal_access_token

# Flask configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### GitHub API Token (Optional)

To avoid rate limiting when fetching GitHub data:

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `public_repo` scope
3. Add it to your `.env` file as `GITHUB_TOKEN`

## 🏗️ Project Structure

```
portfolio-generator/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── .env.example          # Environment variables template
├── README.md             # Project documentation
├── public/               # React public files
│   └── index.html
├── src/                  # React source code
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── components/       # React components
│       ├── Header.js
│       ├── DataForm.js
│       ├── TemplateSelector.js
│       └── PreviewSection.js
└── templates/            # Portfolio templates
    ├── modern/           # Modern template
    │   ├── index.html
    │   ├── styles.css
    │   └── script.js
    ├── classic/          # Classic template
    │   ├── index.html
    │   ├── styles.css
    │   └── script.js
    └── creative/         # Creative template
        ├── index.html
        ├── styles.css
        └── script.js
```

## 🔌 API Endpoints

### Backend API

- `GET /api/templates` - Get available portfolio templates
- `POST /api/fetch-github` - Fetch GitHub profile and repository data
- `POST /api/fetch-linkedin` - Process LinkedIn profile URL
- `POST /api/generate-portfolio` - Generate and download portfolio ZIP file

### Example API Usage

```javascript
// Fetch GitHub data
const response = await fetch('/api/fetch-github', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'octocat' })
});

// Generate portfolio
const response = await fetch('/api/generate-portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    form_data: { name: 'John Doe', email: 'john@example.com' },
    github_data: githubData,
    linkedin_data: linkedinData,
    template_id: 'modern'
  })
});
```

## 🎯 Features in Detail

### GitHub Integration
- Fetches user profile information
- Retrieves repository data with statistics
- Filters out forked repositories
- Sorts repositories by last updated

### Template System
- Jinja2 templating for dynamic content
- Responsive CSS with modern design patterns
- JavaScript animations and interactions
- Easy to extend with new templates

### Form Handling
- React Hook Form for form management
- Real-time validation
- Skills management with add/remove functionality
- Toast notifications for user feedback

## 🚀 Deployment

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Configure Flask for production**
   ```python
   # In app.py, set debug=False
   app.run(debug=False, host='0.0.0.0', port=5000)
   ```

3. **Deploy to your preferred platform**
   - Heroku
   - Vercel
   - DigitalOcean
   - AWS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Adding New Templates

To add a new portfolio template:

1. Create a new directory in `templates/` (e.g., `templates/minimal/`)
2. Add the following files:
   - `index.html` - HTML template with Jinja2 variables
   - `styles.css` - CSS styles for the template
   - `script.js` - JavaScript functionality
3. Update the templates list in `app.py`
4. Test the template with sample data

### Template Variables

Available variables in templates:
- `personal.*` - Form data (name, email, skills, etc.)
- `github.profile.*` - GitHub profile data
- `github.repositories` - Array of repository objects
- `linkedin.profile.*` - LinkedIn profile data
- `generated_at` - Generation timestamp

## 🐛 Troubleshooting

### Common Issues

1. **GitHub API Rate Limiting**
   - Add a GitHub token to `.env` file
   - Check your rate limit status

2. **Port Already in Use**
   - Change the port in `app.py` or kill the process using the port

3. **Dependencies Issues**
   - Delete `node_modules` and run `npm install` again
   - Create a new virtual environment for Python

4. **Template Not Loading**
   - Check template directory structure
   - Verify template files exist and are readable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for repository data
- Font Awesome for icons
- Google Fonts for typography
- React community for amazing tools
- Flask community for the excellent framework

## 📞 Support

If you have any questions or need help, please:
1. Check the troubleshooting section
2. Open an issue on GitHub
3. Contact the maintainers

---

Made with ❤️ by the Portfolio Generator team