import { AiOutlinePlus } from 'react-icons/ai';
import VocaCard from './VocaCard/VocaCard';
import Button from '../Common/Button/Button';
import styles from './Voca.module.scss';
import { vocaArr } from '../../dummy/voca';

const Voca = () => {
  const onEditHandler = () => {
    console.log('수정');
  };

  const onDeleteHandler = () => {
    console.log('삭제');
  };

  return (
    <>
      <ul className={styles.card_list}>
        {vocaArr.map((voca) => (
          <VocaCard
            key={voca.vocabId}
            word={voca.word}
            meaning={voca.meaning}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </ul>
      <Button
        variant="primary"
        size="md"
        iconBtn
        icon={<AiOutlinePlus />}
        className={styles.button}
      />
    </>
  );
};

export default Voca;
