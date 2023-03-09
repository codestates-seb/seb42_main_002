import React from 'react';
import { FiMail } from 'react-icons/fi';
import Button from '../components/Common/Button/Button';
import ButtonGroup from '../components/Common/Button/ButtonGroup';
import Label from '../components/Common/Label/Label';
import GuideBox from '../components/Guide/GuideBox';
import GuideSection from '../components/Guide/GuideSection';

const GuidePage = () => {
  return (
    <>
      <GuideSection>
        <h3>Button / ButtonGroup </h3>
        <GuideBox>
          <h4>variant</h4>
          <ButtonGroup gap="sm">
            <Button size="md" variant="default">
              Default
            </Button>
            <Button size="md" variant="primary">
              Primary
            </Button>
            <Button size="md" variant="secondary">
              Secondary
            </Button>
            <Button size="md" variant="dashed">
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
            <Button size="md" variant="primary" icon={<FiMail />}>
              Primary
            </Button>
            <Button size="md" variant="secondary" icon={<FiMail />}>
              Secondary
            </Button>
            <Button size="md" variant="dashed" icon={<FiMail />}>
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
            <Button size="lg" variant="primary" full>
              Primary
            </Button>
            <Button size="lg" variant="secondary" full>
              Secondary
            </Button>
            <Button size="lg" variant="dashed" full>
              Dashed
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>full size - nowrap</h4>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="lg" variant="primary" full>
              Primary
            </Button>
            <Button size="lg" variant="secondary" full>
              Secondary
            </Button>
            <Button size="lg" variant="dashed" full>
              Dashed
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="lg" variant="primary" full>
              Primary
            </Button>
            <Button size="lg" variant="secondary" full>
              Secondary
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="lg" variant="primary" full>
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
        </GuideBox>
        <GuideBox>
          <h4>gap size (sm / md / lg)</h4>
          <ButtonGroup gap="sm">
            <Button size="lg" variant="primary">
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="dashed">
              Dashed
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="md">
            <Button size="lg" variant="primary">
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="dashed">
              Dashed
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="lg">
            <Button size="lg" variant="primary">
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="dashed">
              Dashed
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
    </>
  );
};

export default GuidePage;
