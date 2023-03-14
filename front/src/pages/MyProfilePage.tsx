import React from 'react';
import PageTitle from '../components/Common/PageTitle/PageTitle';
import PrevButton from '../components/Common/PrevButton/PrevButton';
import MyProfile from '../components/MyProfile/MyProfile';

const MyProfilePage = () => {
  return (
    <>
      <PageTitle title="Profile" translate="프로필" prevIcon={<PrevButton />} />
      <MyProfile />
    </>
  );
};

export default MyProfilePage;
