import React from 'react';
import Button from '../components/Common/Button/Button';
import LifeQuotes from '../components/Main/LifeQuotes/LifeQuotes';
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
        <Button variant="primary" size="lg" full to="/search">
          친구 찾으러 가기
        </Button>
      </MainSection>
      <MainSection>
        <MainVoca />
      </MainSection>
    </div>
  );
};

export default MainPage;
