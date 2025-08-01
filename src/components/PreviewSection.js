import React from 'react';
import styled from 'styled-components';
import { User, Github, Linkedin, Code, Star, GitBranch, MapPin, Mail, Phone } from 'lucide-react';

const PreviewContainer = styled.div`
  margin-top: 3rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const PreviewTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PreviewCard = styled.div`
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f8f9fa;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #666;
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #333;
  min-width: 80px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const RepoItem = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const RepoName = styled.h4`
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const RepoStats = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.85rem;
`;

const RepoDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  line-height: 1.4;
`;

const RepoLanguage = styled.span`
  background: #f0f0f0;
  color: #333;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
`;

const PreviewSection = ({ formData, githubData, linkedinData, selectedTemplate }) => {
  const hasPersonalData = formData && Object.keys(formData).length > 0;
  const hasGithubData = githubData && githubData.profile;
  const hasLinkedinData = linkedinData && linkedinData.profile;

  if (!hasPersonalData && !hasGithubData && !hasLinkedinData) {
    return (
      <PreviewContainer>
        <EmptyState>
          Fill out the forms above to see a preview of your portfolio data
        </EmptyState>
      </PreviewContainer>
    );
  }

  return (
    <PreviewContainer>
      <PreviewTitle>Portfolio Preview</PreviewTitle>
      
      <PreviewGrid>
        {/* Personal Information */}
        {hasPersonalData && (
          <PreviewCard>
            <CardHeader>
              <CardIcon>
                <User size={20} />
              </CardIcon>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            
            {formData.name && (
              <InfoItem>
                <InfoLabel>Name:</InfoLabel>
                {formData.name}
              </InfoItem>
            )}
            
            {formData.email && (
              <InfoItem>
                <Mail size={14} />
                {formData.email}
              </InfoItem>
            )}
            
            {formData.phone && (
              <InfoItem>
                <Phone size={14} />
                {formData.phone}
              </InfoItem>
            )}
            
            {formData.location && (
              <InfoItem>
                <MapPin size={14} />
                {formData.location}
              </InfoItem>
            )}
            
            {formData.title && (
              <InfoItem>
                <InfoLabel>Title:</InfoLabel>
                {formData.title}
              </InfoItem>
            )}
            
            {formData.experience_years && (
              <InfoItem>
                <InfoLabel>Experience:</InfoLabel>
                {formData.experience_years} years
              </InfoItem>
            )}
            
            {formData.skills && formData.skills.length > 0 && (
              <div>
                <InfoLabel>Skills:</InfoLabel>
                <SkillsContainer>
                  {formData.skills.map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))}
                </SkillsContainer>
              </div>
            )}
          </PreviewCard>
        )}

        {/* GitHub Data */}
        {hasGithubData && (
          <PreviewCard>
            <CardHeader>
              <CardIcon>
                <Github size={20} />
              </CardIcon>
              <CardTitle>GitHub Profile</CardTitle>
            </CardHeader>
            
            <InfoItem>
              <InfoLabel>Username:</InfoLabel>
              {githubData.profile.name}
            </InfoItem>
            
            {githubData.profile.bio && (
              <InfoItem>
                <InfoLabel>Bio:</InfoLabel>
                {githubData.profile.bio}
              </InfoItem>
            )}
            
            <InfoItem>
              <InfoLabel>Repos:</InfoLabel>
              {githubData.profile.public_repos}
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Followers:</InfoLabel>
              {githubData.profile.followers}
            </InfoItem>
            
            {githubData.profile.location && (
              <InfoItem>
                <MapPin size={14} />
                {githubData.profile.location}
              </InfoItem>
            )}
          </PreviewCard>
        )}

        {/* LinkedIn Data */}
        {hasLinkedinData && (
          <PreviewCard>
            <CardHeader>
              <CardIcon>
                <Linkedin size={20} />
              </CardIcon>
              <CardTitle>LinkedIn Profile</CardTitle>
            </CardHeader>
            
            <InfoItem>
              <InfoLabel>Profile:</InfoLabel>
              Connected
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>URL:</InfoLabel>
              {linkedinData.profile.profile_url}
            </InfoItem>
          </PreviewCard>
        )}
      </PreviewGrid>

      {/* GitHub Repositories */}
      {hasGithubData && githubData.repositories && githubData.repositories.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <CardHeader>
            <CardIcon>
              <Code size={20} />
            </CardIcon>
            <CardTitle>Recent Repositories</CardTitle>
          </CardHeader>
          
          {githubData.repositories.slice(0, 3).map((repo, index) => (
            <RepoItem key={index}>
              <RepoHeader>
                <RepoName>{repo.name}</RepoName>
                <RepoStats>
                  <span>
                    <Star size={12} style={{ marginRight: '0.25rem' }} />
                    {repo.stars}
                  </span>
                  <span>
                    <GitBranch size={12} style={{ marginRight: '0.25rem' }} />
                    {repo.forks}
                  </span>
                </RepoStats>
              </RepoHeader>
              
              {repo.description && (
                <RepoDescription>{repo.description}</RepoDescription>
              )}
              
              {repo.language && (
                <RepoLanguage>{repo.language}</RepoLanguage>
              )}
            </RepoItem>
          ))}
        </div>
      )}

      {/* Template Selection */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <InfoItem style={{ justifyContent: 'center' }}>
          <InfoLabel>Selected Template:</InfoLabel>
          <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#667eea' }}>
            {selectedTemplate}
          </span>
        </InfoItem>
      </div>
    </PreviewContainer>
  );
};

export default PreviewSection;