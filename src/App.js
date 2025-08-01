import React, { useState } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import DataForm from './components/DataForm';
import TemplateSelector from './components/TemplateSelector';
import PreviewSection from './components/PreviewSection';
import { Github, Linkedin, User, Download } from 'lucide-react';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StepCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StepIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StepTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StepNumber = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const GenerateSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

function App() {
  const [formData, setFormData] = useState({});
  const [githubData, setGithubData] = useState(null);
  const [linkedinData, setLinkedinData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleGithubData = (data) => {
    setGithubData(data);
  };

  const handleLinkedinData = (data) => {
    setLinkedinData(data);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_data: formData,
          github_data: githubData,
          linkedin_data: linkedinData,
          template_id: selectedTemplate,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'portfolio.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Failed to generate portfolio');
      }
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = formData.name || githubData || linkedinData;

  return (
    <AppContainer>
      <Toaster position="top-right" />
      <Header />
      <MainContent>
        <StepsContainer>
          <StepCard>
            <StepHeader>
              <StepIcon>
                <User size={24} />
              </StepIcon>
              <div>
                <StepTitle>Personal Info</StepTitle>
                <StepNumber>Step 1</StepNumber>
              </div>
            </StepHeader>
            <DataForm onSubmit={handleFormSubmit} />
          </StepCard>

          <StepCard>
            <StepHeader>
              <StepIcon>
                <Github size={24} />
              </StepIcon>
              <div>
                <StepTitle>GitHub Data</StepTitle>
                <StepNumber>Step 2</StepNumber>
              </div>
            </StepHeader>
            <DataForm 
              type="github" 
              onGithubData={handleGithubData}
              onLinkedinData={handleLinkedinData}
            />
          </StepCard>

          <StepCard>
            <StepHeader>
              <StepIcon>
                <Linkedin size={24} />
              </StepIcon>
              <div>
                <StepTitle>Choose Template</StepTitle>
                <StepNumber>Step 3</StepNumber>
              </div>
            </StepHeader>
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
            />
          </StepCard>
        </StepsContainer>

        {(formData.name || githubData || linkedinData) && (
          <PreviewSection 
            formData={formData}
            githubData={githubData}
            linkedinData={linkedinData}
            selectedTemplate={selectedTemplate}
          />
        )}

        <GenerateSection>
          <GenerateButton 
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
          >
            <Download size={20} />
            {isGenerating ? 'Generating...' : 'Generate Portfolio'}
          </GenerateButton>
        </GenerateSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;