import PageTitle from '../../Common/PageTitle/PageTitle';
import PrevButton from '../../Common/PrevButton/PrevButton';

const LetterListHeader = () => {
  return (
    <>
      <PageTitle
        title="Letters"
        translate="편지 목록"
        prevIcon={<PrevButton />}
      />
    </>
  );
};

export default LetterListHeader;
