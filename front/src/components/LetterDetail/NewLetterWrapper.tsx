import { useState } from 'react';
import NewLetterContent from './LetterContent/NewLetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import LetterType from './LetterType/LetterType';

const NewLetterWrapper = () => {
  // 첨부 파일
  const [pictures, setPictures] = useState<string[]>([
    'https://images.unsplash.com/photo-1678565555430-f8640bf41628?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1678582911712-43934e3fe86d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    'https://images.unsplash.com/photo-1674574124649-778f9afc0e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1678537223079-aac394356c16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  ]);
  // 콘텐츠
  const [body, setBody] = useState<string>();

  // TODO : 이미지 삭제 시, 모달로 확인하기?
  const pictureRemoveHandler = (idx: number) => {
    console.log('현재 사진 삭제', idx);
    const newPictures = pictures.filter((_, picIdx) => picIdx !== idx);
    setPictures(newPictures);
  };

  // TODO : 이미지 추가 로직 변경
  const pictureAddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files && event.target.files[0];

    reader.onload = () => {
      setPictures((prev) => [...prev, String(reader.result)]);
    };
    file && reader.readAsDataURL(file);
  };

  return (
    <>
      <LetterType />
      <NewLetterContent />
      <LetterPictureWrapper
        pictures={pictures}
        onRemove={pictureRemoveHandler}
        onAdd={pictureAddHandler}
        isRead={false}
      />
    </>
  );
};

export default NewLetterWrapper;
