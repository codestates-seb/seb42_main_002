import React from 'react';
import PageTitle from '../components/Common/PageTitle/PageTitle';
import PrevButton from '../components/Common/PrevButton/PrevButton';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <>
      <PageTitle prevIcon={<PrevButton />} />
      <Profile />
    </>
  );
};

export default ProfilePage;
