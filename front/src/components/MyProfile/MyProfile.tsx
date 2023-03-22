import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FaMars, FaTransgender, FaVenus } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';
import useModals from '../../hooks/useModals';
import Button from '../Common/Button/Button';
import LanguageEditModal from './LanguageEditModal/LanguageEditModal';
import Label from '../Common/Label/Label';
import { genderTransformer, langTransformer } from '../../utils/common';
import TagEditModal from './TagEditModal/TagEditModal';
import { userState } from '../../recoil/atoms/user/user';
import { userTagState } from '../../recoil/atoms/user/userTag';
import { userLanguageState } from '../../recoil/atoms/user/userLanguage';
import ButtonGroup from '../Common/Button/ButtonGroup';
import ProfileCard from '../Common/ProfileCard/ProfileCard.module';
import Flex from '../Common/Flex/Flex';
import InfoGroup from '../Common/InfoGroup/InfoGroup';
import RadioGroup from '../Common/RadioButton/RadioButtonGroup';
import {
  CONST_GENDER_TYPE,
  GENDER_TYPE,
} from '../../utils/enums/common/common.enum';
import InputFeild from '../Common/InputFeild/InputFeild';
import TextAreaFeild from '../Common/TextAreaFeild/TextAreaFeild';
import MyProfileImage from './MyProfileImage';
import LocationEditModal from './LocationEditModal/LocationEditModal';
import styles from './MyProfile.module.scss';
import { PATCH } from '../../utils/axios';
import { getAge, LanguageDataType } from '../../utils';
import { TagDataType } from '../../utils/types/tags/tags';

const MyProfile = () => {
  const { logout } = useAuth();
  const { openModal } = useModals();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [userTags, setUserTags] = useRecoilState(userTagState);
  const [userLanguages, setUserLanguages] = useRecoilState(userLanguageState);
  const [isEditBaseInfo, setIsEditBaseInfo] = useState(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState(false);
  const [selectedGender, setSelectedGender] = useState(userInfo?.gender);

  const GenderIcons = {
    MALE: <FaMars color="#253c63" />,
    FEMALE: <FaVenus color="#932f42" />,
    OTHER: <FaTransgender color="#505050" />,
  };

  useEffect(() => {
    setUserLanguages(userInfo?.language as LanguageDataType[]);
    setUserTags(userInfo?.tag as TagDataType[]);
  }, []);

  const onChangeEditBaseInfo = () => {
    setIsEditBaseInfo((prevState) => !prevState);
  };

  const onChangeGenderHandler = (value: string) => {
    setSelectedGender(value as GENDER_TYPE);
  };

  const onSubmitChangeBaseInfo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      name: formData.get('name'),
      gender: formData.get('gender'),
      birthDay: formData.get('birthDay'),
    };

    if (requestData) {
      try {
        const response = await PATCH('/members', {
          ...requestData,
        });
        if (response) {
          setIsEditBaseInfo((prevState) => !prevState);
          setUserInfo((prevState: any) => ({
            ...prevState,
            name: requestData.name,
            gender: requestData.gender,
            birthday: requestData.birthDay,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeEditIntroduce = () => {
    setIsEditIntroduce((prevState) => !prevState);
  };

  const onSubmitChangeIntroduceHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      introduce: formData.get('introduce'),
    };
    if (requestData) {
      try {
        const response = await PATCH('/members', {
          ...requestData,
        });
        if (response) {
          setIsEditIntroduce((prevState) => !prevState);
          setUserInfo((prevState: any) => ({
            ...prevState,
            introduce: requestData.introduce,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClickLangugeModalHandler = () => {
    openModal(LanguageEditModal);
  };

  const onClickTagModalHandler = () => {
    openModal(TagEditModal);
  };

  const onClickLocationModalHandler = () => {
    openModal(LocationEditModal);
  };

  return (
    <>
      <ProfileCard>
        {userInfo && (
          <>
            <ProfileCard.BaseInfo>
              <ProfileCard.BaseInfo.ImageArea>
                <MyProfileImage
                  onChangeLocation={onClickLocationModalHandler}
                />
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
                          <InfoGroup.Label>이메일</InfoGroup.Label>
                          <InfoGroup.Content>
                            <p>{userInfo.email}</p>
                          </InfoGroup.Content>
                        </InfoGroup>
                        {userInfo.gender && (
                          <InfoGroup>
                            <InfoGroup.Label>성별</InfoGroup.Label>
                            <InfoGroup.Content>
                              <p>{genderTransformer(userInfo.gender)}</p>
                            </InfoGroup.Content>
                          </InfoGroup>
                        )}
                        {userInfo.birthday && (
                          <InfoGroup>
                            <InfoGroup.Label>생년월일</InfoGroup.Label>
                            <InfoGroup.Content>
                              <p>
                                {userInfo.birthday} (
                                {getAge(new Date(userInfo.birthday || ''))}세)
                              </p>
                            </InfoGroup.Content>
                          </InfoGroup>
                        )}
                      </Flex.Col>
                      <Flex.Col>
                        <ButtonGroup justify="end">
                          <Button
                            size="sm"
                            variant="secondary"
                            iconBtn
                            icon={<BiEdit />}
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
                              value={userInfo.name}
                            />
                          </InfoGroup.Content>
                        </InfoGroup>
                        <InfoGroup>
                          <InfoGroup.Label>성별</InfoGroup.Label>
                          <InfoGroup.Content>
                            <RadioGroup
                              name="gender"
                              onChange={onChangeGenderHandler}
                              value={selectedGender as GENDER_TYPE}
                              isSet
                            >
                              {CONST_GENDER_TYPE.map((gender, index) => (
                                <RadioGroup.Item
                                  key={index}
                                  value={gender}
                                  id={`gender_${gender}`}
                                  icon={GenderIcons[gender]}
                                >
                                  {genderTransformer(gender)}
                                </RadioGroup.Item>
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
                              value={userInfo.birthday || ''}
                            />
                          </InfoGroup.Content>
                        </InfoGroup>
                      </Flex.Col>
                      <Flex.Col>
                        <ButtonGroup gap="sm" justify="end">
                          <Button
                            size="sm"
                            variant="secondary"
                            type="button"
                            onClick={onChangeEditBaseInfo}
                          >
                            취소
                          </Button>
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
                    <Flex dir="column" gap="sm">
                      <Flex.Col>
                        <p>{userInfo.introduce}</p>
                      </Flex.Col>
                      <Flex.Col>
                        <ButtonGroup justify="end">
                          <Button
                            size="sm"
                            variant="secondary"
                            iconBtn
                            icon={<BiEdit />}
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
                      <Flex dir="column" gap="sm">
                        <Flex.Col>
                          <TextAreaFeild
                            id="introduce"
                            name="introduce"
                            value={userInfo.introduce}
                          />
                        </Flex.Col>
                        <Flex.Col>
                          <ButtonGroup gap="sm" justify="end">
                            <Button
                              size="sm"
                              variant="secondary"
                              type="button"
                              onClick={onChangeEditIntroduce}
                            >
                              취소
                            </Button>
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
                    {userLanguages &&
                      userLanguages.map((language: LanguageDataType) => (
                        <Flex.Col key={language.nation}>
                          <Label>
                            {langTransformer(language.nation)} Lv.
                            {language.level}
                          </Label>
                        </Flex.Col>
                      ))}
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
                    {userTags &&
                      userTags.map((tag) => (
                        <Flex.Col key={tag.tagId}>
                          <Label>{tag.name}</Label>
                        </Flex.Col>
                      ))}
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
