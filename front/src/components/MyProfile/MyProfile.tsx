import { useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';
import useModals from '../../hooks/useModals';
import PageTitle from '../Common/PageTitle/PageTitle';
import MyProfileImage from './MyProfileImage';
import Button from '../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../Common/Modal/FullPageModal';
import { ReactComponent as PrevButtonIcon } from '../../assets/img/prev_button.svg';
import styles from './MyProfile.module.scss';
import LanguageEditModal from './LanguageEditModal/LanguageEditModal';
import Label from '../Common/Label/Label';
import { langTransformer } from '../../utils/common';
import TagEditModal from './TagEditModal/TagEditModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { userTagState } from '../../recoil/atoms/userTag';
import { userLanguageState } from '../../recoil/atoms/userLanguage';
import ButtonGroup from '../Common/Button/ButtonGroup';
import ProfileCard from '../Common/ProfileCard/ProfileCard.module';
import Flex from '../Common/Flex/Flex';
import ProfileImage from '../Common/ProfileImage/ProfileImage';
import InfoGroup from '../Common/InfoGroup/InfoGroup';
import { RiAlarmWarningLine } from 'react-icons/ri';
import InputForm from '../SignUp/InputForm';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { FaMars, FaTransgender, FaVenus } from 'react-icons/fa';
import RadioGroup from '../Common/RadioButton/RadioButtonGroup';
import {
  CONST_GENDER_TYPE,
  GENDER_TYPE,
} from '../../utils/enums/common/common.enum';
import InputFeild from '../Common/InputFeild/InputFeild';
import TextAreaFeild from '../Common/TextAreaFeild/TextAreaFeild';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      국가 수정 모달
    </FullPageModal>
  );
};

const MyProfile = () => {
  const { logout } = useAuth();
  const userInfo = useRecoilValue(userState);
  const userTags = useRecoilValue(userTagState);
  const userLanguages = useRecoilValue(userLanguageState);
  const [isEditBaseInfo, setIsEditBaseInfo] = useState(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState(false);
  const { openModal } = useModals();

  const [selectedGender, setSelectedGender] = useState(userInfo.gender);

  const GaenderIcons = {
    MALE: <FaMars color="#253c63" />,
    FEMALE: <FaVenus color="#932f42" />,
    OTHERS: <FaTransgender color="#505050" />,
  };

  const onChangeEditBaseInfo = () => {
    setIsEditBaseInfo((prevState) => !prevState);
  };

  const onChangeGenderHandler = (value: any) => {
    console.log('성별 선택');
    setSelectedGender(value);
    console.log(value);
  };

  const onSubmitChangeBaseInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      name: formData.get('name'),
      gender: formData.get('gender'),
      birthDay: formData.get('birthDay'),
    };
    console.log(requestData);
    if (requestData) {
      setIsEditBaseInfo((prevState) => !prevState);
    }
  };

  const onChangeEditIntroduce = () => {
    setIsEditIntroduce((prevState) => !prevState);
  };

  const onSubmitChangeIntroduceHandler = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      introduce: formData.get('introduce'),
    };
    console.log(requestData);
    if (requestData) {
      setIsEditIntroduce((prevState) => !prevState);
    }
  };

  const onClickLocationModalHandler = () => {
    openModal(LocationEditModal, {
      onSubmit: () => {
        console.log('국가 수정');
      },
    });
  };

  const onClickLangugeModalHandler = () => {
    openModal(LanguageEditModal, {
      onSubmit: () => {
        console.log('언어 수정');
      },
    });
  };

  const onClickTagModalHandler = () => {
    openModal(TagEditModal, {
      onSubmit: () => {
        console.log('태그 수정');
      },
    });
  };

  return (
    <>
      <ProfileCard>
        {userInfo && (
          <>
            <ProfileCard.BaseInfo>
              <ProfileCard.BaseInfo.ImageArea>
                <Flex dir="column" gap="sm">
                  <Flex.Col>
                    <ProfileImage
                      profile={userInfo.profile}
                      location={userInfo.location}
                    />
                  </Flex.Col>
                  <Flex.Col>
                    <ButtonGroup>
                      <Flex dir="column" gap="sm">
                        <Button size="sm" variant="secondary" full>
                          사진수정
                        </Button>
                      </Flex>
                    </ButtonGroup>
                  </Flex.Col>
                </Flex>
              </ProfileCard.BaseInfo.ImageArea>
              <ProfileCard.BaseInfo.InfoArea>
                {/** TODO : 추후 컴포넌트로 분리 */}
                {!isEditBaseInfo ? (
                  // 정보 출력
                  <>
                    <Flex dir="column" gap="lg">
                      <Flex.Col>
                        <InfoGroup>
                          <InfoGroup.Label>별명</InfoGroup.Label>
                          <InfoGroup.Content>
                            <p>{userInfo.name}</p>
                          </InfoGroup.Content>
                        </InfoGroup>
                        <InfoGroup>
                          <InfoGroup.Label>성별</InfoGroup.Label>
                          <InfoGroup.Content>
                            <p>{userInfo.gender}</p>
                          </InfoGroup.Content>
                        </InfoGroup>
                        <InfoGroup>
                          <InfoGroup.Label>생년월일</InfoGroup.Label>
                          <InfoGroup.Content>
                            <p>{userInfo.birthday}</p>
                          </InfoGroup.Content>
                        </InfoGroup>
                      </Flex.Col>
                      <Flex.Col>
                        <ButtonGroup justify="end">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={onChangeEditBaseInfo}
                          >
                            수정
                          </Button>
                        </ButtonGroup>
                      </Flex.Col>
                    </Flex>
                  </>
                ) : (
                  // 정보 수정 폼
                  <form onSubmit={onSubmitChangeBaseInfo}>
                    <Flex dir="column" gap="lg">
                      <Flex.Col>
                        <InfoGroup>
                          <InfoGroup.Label>
                            <label htmlFor="name">별명</label>
                          </InfoGroup.Label>
                          <InfoGroup.Content>
                            <InputFeild
                              id="name"
                              name="name"
                              type="text"
                              placeholder="홍길동"
                            />
                          </InfoGroup.Content>
                        </InfoGroup>
                        <InfoGroup>
                          <InfoGroup.Label>성별</InfoGroup.Label>
                          <InfoGroup.Content>
                            <RadioGroup
                              name="gender"
                              onChange={onChangeGenderHandler}
                              value={selectedGender}
                              isSet
                            >
                              {CONST_GENDER_TYPE.map((gender, index) => (
                                <>
                                  <RadioGroup.Item
                                    key={index}
                                    value={gender}
                                    id={`gender_${gender}`}
                                    icon={GaenderIcons[gender]}
                                  >
                                    {gender}
                                  </RadioGroup.Item>
                                </>
                              ))}
                            </RadioGroup>
                          </InfoGroup.Content>
                        </InfoGroup>
                        <InfoGroup>
                          <InfoGroup.Label>
                            <label htmlFor="birthDay">생년월일</label>
                          </InfoGroup.Label>
                          <InfoGroup.Content>
                            <InputFeild
                              id="birthDay"
                              name="birthDay"
                              type="text"
                              pattern="^\d{4}-\d{2}-\d{2}$"
                              placeholder="1989-12-24"
                            />
                          </InfoGroup.Content>
                        </InfoGroup>
                      </Flex.Col>
                      <Flex.Col>
                        <ButtonGroup justify="end">
                          <Button size="sm" variant="primary" type="submit">
                            저장
                          </Button>
                        </ButtonGroup>
                      </Flex.Col>
                    </Flex>
                  </form>
                )}
              </ProfileCard.BaseInfo.InfoArea>
            </ProfileCard.BaseInfo>
            <ProfileCard.ExtraInfo>
              {/** TODO : 추후 컴포넌트로 분리 */}
              {!isEditIntroduce ? (
                <InfoGroup className="extra_info">
                  <InfoGroup.Label>자기소개</InfoGroup.Label>
                  <InfoGroup.Content>
                    <Flex gap="sm">
                      <Flex.Col cols={12}>
                        <p>{userInfo.introduce}</p>
                      </Flex.Col>
                      <Flex.Col cols={2}>
                        <ButtonGroup justify="end">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={onChangeEditIntroduce}
                          >
                            수정
                          </Button>
                        </ButtonGroup>
                      </Flex.Col>
                    </Flex>
                  </InfoGroup.Content>
                </InfoGroup>
              ) : (
                <InfoGroup className="extra_info">
                  <form onSubmit={onSubmitChangeIntroduceHandler}>
                    <InfoGroup.Label>자기소개</InfoGroup.Label>
                    <InfoGroup.Content>
                      <Flex gap="sm">
                        <Flex.Col cols={10}>
                          <TextAreaFeild
                            id="introduce"
                            name="introduce"
                            value={userInfo.introduce}
                          />
                        </Flex.Col>
                        <Flex.Col cols={2}>
                          <ButtonGroup justify="end">
                            <Button size="sm" variant="primary" type="submit">
                              저장
                            </Button>
                          </ButtonGroup>
                        </Flex.Col>
                      </Flex>
                    </InfoGroup.Content>
                  </form>
                </InfoGroup>
              )}

              <InfoGroup className="extra_info">
                <InfoGroup.Label>언어</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    <>
                      {userLanguages &&
                        userLanguages.map((language) => (
                          <>
                            <Flex.Col key={language.nation}>
                              <Label>
                                {langTransformer(language.nation)} Lv.
                                {language.level}
                              </Label>
                            </Flex.Col>
                          </>
                        ))}
                    </>
                    <Button
                      size="sm"
                      variant="dashed"
                      onClick={onClickLangugeModalHandler}
                    >
                      + 언어관리
                    </Button>
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>태그</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    <>
                      {userTags &&
                        userTags.map((tag) => (
                          <>
                            <Flex.Col key={tag.id}>
                              <Label>{tag.name}</Label>
                            </Flex.Col>
                          </>
                        ))}
                    </>
                    <Button
                      size="sm"
                      variant="dashed"
                      onClick={onClickTagModalHandler}
                    >
                      + 태그관리
                    </Button>
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
            </ProfileCard.ExtraInfo>
          </>
        )}
      </ProfileCard>
      <ButtonGroup gap="sm" justify="end" className={styles.btns}>
        <Button variant="secondary" size="sm" to="/guide">
          스타일 가이드
        </Button>
        <Button variant="primary" size="sm" onClick={logout}>
          로그아웃
        </Button>
      </ButtonGroup>
    </>
  );
};

export default MyProfile;
