import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin, Search, Check } from 'lucide-react';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #333;
`;

const AddSkillInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SmallButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const FetchSection = styled.div`
  border-top: 1px solid #e1e5e9;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const StatusMessage = styled.div`
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
`;

const DataForm = ({ onSubmit, type, onGithubData, onLinkedinData }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setValue('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue('skills', updatedSkills);
  };

  const fetchGithubData = async (username) => {
    setIsLoading(true);
    setFetchStatus(null);
    
    try {
      const response = await fetch('/api/fetch-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        onGithubData(data);
        setFetchStatus({ type: 'success', message: `Successfully fetched data for ${data.profile.name}` });
        toast.success('GitHub data fetched successfully!');
      } else {
        throw new Error('Failed to fetch GitHub data');
      }
    } catch (error) {
      setFetchStatus({ type: 'error', message: 'Failed to fetch GitHub data. Please check the username.' });
      toast.error('Failed to fetch GitHub data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLinkedinData = async (profileUrl) => {
    setIsLoading(true);
    setFetchStatus(null);
    
    try {
      const response = await fetch('/api/fetch-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_url: profileUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        onLinkedinData(data);
        setFetchStatus({ type: 'success', message: 'LinkedIn profile URL processed successfully' });
        toast.success('LinkedIn data processed successfully!');
      } else {
        throw new Error('Failed to process LinkedIn data');
      }
    } catch (error) {
      setFetchStatus({ type: 'error', message: 'Failed to process LinkedIn data. Please check the URL.' });
      toast.error('Failed to process LinkedIn data');
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (data) => {
    data.skills = skills;
    onSubmit(data);
    toast.success('Form data saved!');
  };

  if (type === 'github') {
    return (
      <FormContainer>
        <InputGroup>
          <Label>
            <Github size={16} />
            GitHub Username
          </Label>
          <Input
            {...register('github_username')}
            placeholder="e.g., octocat"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <Linkedin size={16} />
            LinkedIn Profile URL
          </Label>
          <Input
            {...register('linkedin_url')}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </InputGroup>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            type="button"
            onClick={() => {
              const username = watch('github_username');
              if (username) fetchGithubData(username);
            }}
            disabled={isLoading}
          >
            <Search size={16} />
            Fetch GitHub Data
          </Button>

          <Button
            type="button"
            onClick={() => {
              const url = watch('linkedin_url');
              if (url) fetchLinkedinData(url);
            }}
            disabled={isLoading}
          >
            <Search size={16} />
            Process LinkedIn
          </Button>
        </div>

        {fetchStatus && (
          <StatusMessage className={fetchStatus.type}>
            {fetchStatus.type === 'success' ? <Check size={16} /> : null}
            {fetchStatus.message}
          </StatusMessage>
        )}
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputGroup>
          <Label>
            <User size={16} />
            Full Name *
          </Label>
          <Input
            {...register('name', { required: true })}
            placeholder="Your full name"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <Mail size={16} />
            Email *
          </Label>
          <Input
            {...register('email', { required: true })}
            type="email"
            placeholder="your.email@example.com"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <Phone size={16} />
            Phone
          </Label>
          <Input
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <MapPin size={16} />
            Location
          </Label>
          <Input
            {...register('location')}
            placeholder="City, Country"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            Professional Title
          </Label>
          <Input
            {...register('title')}
            placeholder="e.g., Full Stack Developer"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <Globe size={16} />
            Website/Portfolio
          </Label>
          <Input
            {...register('website')}
            placeholder="https://yourwebsite.com"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            About/Bio
          </Label>
          <TextArea
            {...register('about')}
            placeholder="Tell us about yourself, your experience, and what you're passionate about..."
          />
        </InputGroup>

        <InputGroup>
          <Label>
            Years of Experience
          </Label>
          <Input
            {...register('experience_years')}
            placeholder="e.g., 3"
          />
        </InputGroup>

        <InputGroup>
          <Label>Skills & Technologies</Label>
          <SkillsContainer>
            {skills.map((skill, index) => (
              <SkillTag 
                key={index}
                onClick={() => removeSkill(skill)}
                style={{ cursor: 'pointer' }}
                title="Click to remove"
              >
                {skill} ×
              </SkillTag>
            ))}
          </SkillsContainer>
          <AddSkillInput>
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <SmallButton type="button" onClick={addSkill}>
              Add
            </SmallButton>
          </AddSkillInput>
        </InputGroup>

        <Button type="submit">
          Save Information
        </Button>
      </form>
    </FormContainer>
  );
};

export default DataForm;