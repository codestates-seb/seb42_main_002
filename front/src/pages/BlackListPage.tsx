import BlackList from '../components/BlackList/BlackList';
import PageTitle from '../components/Common/PageTitle/PageTitle';

const BlackListPage = () => {
  return (
    <>
      <PageTitle title="Blacklist" translate="차단 유저 목록" />
      <BlackList />
    </>
  );
};

export default BlackListPage;
