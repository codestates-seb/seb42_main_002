import React from 'react';
import { FiMail } from 'react-icons/fi';
import Button from '../components/Common/Button/Button';
import ButtonGroup from '../components/Common/Button/ButtonGroup';
import GuideSection from '../components/Guide/GuideSection';

const GuidePage = () => {
  return (
    <>
      <GuideSection>
        <h3>Button / ButtonGroup </h3>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <h4>full size - nowrap</h4>
          <ButtonGroup gap="sm" wrap="nowrap">
            <Button size="lg" variant="primary" full>
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
          </ButtonGroup>
        </div>
        <div>
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
        </div>
      </GuideSection>
    </>
  );
};

export default GuidePage;
