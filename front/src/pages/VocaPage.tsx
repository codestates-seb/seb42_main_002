import PageTitle from '../components/Common/PageTitle/PageTitle';
import Voca from '../components/Voca/Voca';

const VocaPage = () => {
  return (
    <>
      <PageTitle title="Words" translate="단어 목록" />
      <Voca />
    </>
  );
};

export default VocaPage;
