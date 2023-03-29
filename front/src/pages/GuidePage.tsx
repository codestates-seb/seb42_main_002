import React from 'react';
import { FiMail } from 'react-icons/fi';
import Button from '../components/Common/Button/Button';
import ButtonGroup from '../components/Common/Button/ButtonGroup';
import Label from '../components/Common/Label/Label';
import AlertModal, {
  AlertModalProps,
} from '../components/Common/Modal/AlertModal';
import FullPageModal, {
  FullPageModalProps,
} from '../components/Common/Modal/FullPageModal';
import GuideBox from '../components/Guide/GuideBox';
import GuideSection from '../components/Guide/GuideSection';
import useModals from '../hooks/useModals';

const GuidePage = () => {
  const { openModal } = useModals();

  const ConfirmAlertModal = ({ onSubmit, onClose }: AlertModalProps) => {
    return (
      <AlertModal onSubmit={onSubmit} onClose={onClose} title="타이틀">
        Alert 모달
      </AlertModal>
    );
  };

  const CustomPullPageModal = ({ onSubmit, onClose }: FullPageModalProps) => {
    return (
      <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
        Pull Page 모달
      </FullPageModal>
    );
  };

  const onClickAlertModalHandler = () => {
    openModal(ConfirmAlertModal);
  };

  const onClickPullPageModalHandler = () => {
    openModal(CustomPullPageModal);
  };

  return (
    <>
      <GuideSection>
        <h3>Button / ButtonGroup </h3>
        <GuideBox>
          <h4>variant</h4>
          <ButtonGroup gap="sm">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="dashed">
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>size (sm / md / lg)</h4>
          <ButtonGroup gap="sm" align="center">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="md" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="dashed">
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>icon</h4>
          <ButtonGroup gap="sm">
            <Button size="sm" variant="primary" icon={<FiMail />}>
              Primary
            </Button>
            <Button size="sm" variant="secondary" icon={<FiMail />}>
              Secondary
            </Button>
            <Button size="sm" variant="dashed" icon={<FiMail />}>
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>icon button </h4>
          <ButtonGroup gap="sm" align="center">
            <Button size="sm" variant="default" icon={<FiMail />} iconBtn>
              Primary
            </Button>
            <Button size="sm" variant="primary" icon={<FiMail />} iconBtn>
              Primary
            </Button>
            <Button size="md" variant="secondary" icon={<FiMail />} iconBtn>
              Secondary
            </Button>
            <Button size="lg" variant="dashed" icon={<FiMail />} iconBtn>
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>full size</h4>
          <ButtonGroup gap="sm">
            <Button size="sm" variant="primary" full>
              Primary
            </Button>
            <Button size="sm" variant="secondary" full>
              Secondary
            </Button>
            <Button size="sm" variant="dashed" full>
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>full size - nowrap</h4>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="sm" variant="primary" full>
              Primary
            </Button>
            <Button size="sm" variant="secondary" full>
              Secondary
            </Button>
            <Button size="sm" variant="dashed" full>
              Dashed
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="sm" variant="primary" full>
              Primary
            </Button>
            <Button size="sm" variant="secondary" full>
              Secondary
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="sm" variant="primary" full>
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>gap size (sm / md / lg)</h4>
          <ButtonGroup gap="sm">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="md">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="lg">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
        </GuideBox>
      </GuideSection>
      <GuideSection>
        <h3>Label</h3>
        <GuideBox>
          <ButtonGroup gap="sm">
            <Label>한국어 Lv.1</Label>
            <Label>한국어 Lv.1</Label>
            <Button size="sm" variant="dashed">
              + 언어 추가
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="sm">
            <Label>코딩</Label>
            <Label isActive>음악</Label>
            <Label>반려동물</Label>
            <Label>음악</Label>
            <Button size="sm" variant="dashed">
              + 태그 추가
            </Button>
          </ButtonGroup>
        </GuideBox>
      </GuideSection>
      <GuideSection>
        <h3>Modal</h3>
        <GuideBox>
          <ButtonGroup gap="sm">
            <Button
              size="sm"
              variant="dashed"
              onClick={onClickAlertModalHandler}
            >
              Alert
            </Button>
            <Button
              size="sm"
              variant="dashed"
              onClick={onClickPullPageModalHandler}
            >
              Full Page
            </Button>
          </ButtonGroup>
        </GuideBox>
      </GuideSection>
    </>
  );
};

export default GuidePage;
