import React from 'react';
import LifeQuotes from '../components/Main/LifeQuotes';
import MainLetter from '../components/Main/MainLetters/MainLetter';
import MainSection from '../components/Main/MainSection';
import MainVoca from '../components/Main/MainVoca/MainVoca';
import RecomandUser from '../components/Main/RecomandUser/RecomandUser';

const MainPage = () => {
  return (
    <div>
      <MainSection>
        <LifeQuotes />
      </MainSection>
      <MainSection>
        <RecomandUser />
      </MainSection>
      <MainSection>
        <MainLetter />
      </MainSection>
      <MainSection>
        <MainVoca />
      </MainSection>
    </div>
  );
};

export default MainPage;
