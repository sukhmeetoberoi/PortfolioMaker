import React from 'react';
import styled from 'styled-components';
import { Code2, Sparkles } from 'lucide-react';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const TagLine = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo>
            <Code2 size={28} />
            Portfolio Generator
          </Logo>
          <TagLine>Create stunning portfolios in minutes</TagLine>
        </HeaderContent>
      </HeaderContainer>
      
      <HeroSection>
        <HeroTitle>
          Build Your Perfect Portfolio
        </HeroTitle>
        <HeroSubtitle>
          Generate beautiful, professional portfolios using your GitHub repositories, 
          LinkedIn profile, and personal information. Choose from multiple templates 
          and download ready-to-use code.
        </HeroSubtitle>
        
        <FeatureList>
          <Feature>
            <Sparkles size={16} />
            GitHub Integration
          </Feature>
          <Feature>
            <Sparkles size={16} />
            Multiple Templates
          </Feature>
          <Feature>
            <Sparkles size={16} />
            Instant Download
          </Feature>
        </FeatureList>
      </HeroSection>
    </>
  );
};

export default Header;