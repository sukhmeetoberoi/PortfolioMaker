import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Check, Eye } from 'lucide-react';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const TemplateCard = styled.div`
  border: 2px solid ${props => props.selected ? '#667eea' : '#e1e5e9'};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TemplateName = styled.h3`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const TemplateDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const SelectIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.selected ? '#667eea' : '#e1e5e9'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const PreviewButton = styled.button`
  background: transparent;
  border: 1px solid #667eea;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
`;

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        // Fallback templates if API fails
        setTemplates([
          {
            id: 'modern',
            name: 'Modern Portfolio',
            description: 'Clean and modern design with dark theme, perfect for developers and designers.'
          },
          {
            id: 'classic',
            name: 'Classic Portfolio',
            description: 'Traditional layout with professional styling, ideal for business professionals.'
          },
          {
            id: 'creative',
            name: 'Creative Portfolio',
            description: 'Colorful and creative design, great for artists and creative professionals.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Fallback templates
      setTemplates([
        {
          id: 'modern',
          name: 'Modern Portfolio',
          description: 'Clean and modern design with dark theme, perfect for developers and designers.'
        },
        {
          id: 'classic',
          name: 'Classic Portfolio',
          description: 'Traditional layout with professional styling, ideal for business professionals.'
        },
        {
          id: 'creative',
          name: 'Creative Portfolio',
          description: 'Colorful and creative design, great for artists and creative professionals.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (templateId) => {
    onTemplateSelect(templateId);
  };

  if (loading) {
    return (
      <SelectorContainer>
        <LoadingMessage>Loading templates...</LoadingMessage>
      </SelectorContainer>
    );
  }

  return (
    <SelectorContainer>
      <TemplateGrid>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            selected={selectedTemplate === template.id}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <TemplateHeader>
              <TemplateName>{template.name}</TemplateName>
              <SelectIcon selected={selectedTemplate === template.id}>
                {selectedTemplate === template.id && <Check size={14} />}
              </SelectIcon>
            </TemplateHeader>
            <TemplateDescription>{template.description}</TemplateDescription>
            <PreviewButton
              onClick={(e) => {
                e.stopPropagation();
                // Could implement preview functionality here
                console.log(`Preview ${template.name}`);
              }}
            >
              <Eye size={14} />
              Preview
            </PreviewButton>
          </TemplateCard>
        ))}
      </TemplateGrid>
    </SelectorContainer>
  );
};

export default TemplateSelector;