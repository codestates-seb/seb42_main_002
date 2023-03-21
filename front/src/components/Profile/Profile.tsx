import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineAlert } from 'react-icons/ai';
import { HiOutlineBan } from 'react-icons/hi';
import { DELETE, GET, POST } from '../../utils/axios';
import { genderTransformer, langTransformer } from '../../utils/common';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import InfoGroup from '../Common/InfoGroup/InfoGroup';
import Label from '../Common/Label/Label';
import ProfileCard from '../Common/ProfileCard/ProfileCard.module';
import ProfileImage from '../Common/ProfileImage/ProfileImage';
import styles from './Profile.module.scss';
import { UserData } from '../../utils';
import useModals from '../../hooks/useModals';
import AlertModal, { AlertModalProps } from '../Common/Modal/AlertModal';
import { userState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

const Profile = () => {
  const { openModal } = useModals();
  const { memberId } = useParams();
  // const userInfo = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [changeFollowing, setChangeFollowing] = useState(userInfo?.friend);

  // const { friend }: any = userInfo;

  /**
   * 유저 상세 조회
   */
  const getUser = async () => {
    try {
      const response = await GET(`/members/${memberId}`);
      if (response.data) {
        setUserInfo(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [changeFollowing]);

  /**
   * 친구 추가
   * @param followingId
   */
  const postFollowing = async (followingId: number) => {
    try {
      const request = await POST(`follows`, {
        followingId: followingId,
      });
      if (request) {
        console.log(request);
        setChangeFollowing((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구삭제
   * @param followingId
   */
  const deleteFollowing = async (followingId: number) => {
    try {
      const request = await DELETE(`/follows/${followingId}`);
      if (request) {
        setChangeFollowing((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구차단
   * @param taregetId
   */
  const postBlockUser = async (taregetId: number) => {
    try {
      const request = await POST(`/blocks`, {
        taregetId: taregetId,
      });
      if (request) {
        console.log(request);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구차단해제
   * @param taregetId
   */
  const deleteBlockUser = async (taregetId: number) => {
    try {
      const request = await DELETE(`/blocks/${taregetId}`);
      if (request) {
        console.log(request);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmBlockUserModal = ({ onSubmit, onClose }: AlertModalProps) => {
    return (
      <AlertModal title="친구 차단" onSubmit={onSubmit} onClose={onClose}>
        <p className="text_center">
          <span className="text_active">{userInfo?.name}</span>
          &nbsp;님을 차단하시겠습니까?
        </p>
      </AlertModal>
    );
  };

  const onAddBlackUser = (targetId: number) => {
    openModal(confirmBlockUserModal, {
      onSubmit: () => {
        postBlockUser(targetId);
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
                        {/** TODO: 친구 여부에 따른 조건 걸어주기 */}
                        {!userInfo.friend ? (
                          <Button
                            size="sm"
                            variant="primary"
                            full
                            onClick={() => postFollowing(userInfo.memberId)}
                          >
                            친구추가
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            full
                            onClick={() => deleteFollowing(userInfo.memberId)}
                          >
                            친구삭제
                          </Button>
                        )}
                      </Flex>
                    </ButtonGroup>
                  </Flex.Col>
                </Flex>
              </ProfileCard.BaseInfo.ImageArea>
              <ProfileCard.BaseInfo.InfoArea>
                <InfoGroup>
                  <InfoGroup.Label>별명</InfoGroup.Label>
                  <InfoGroup.Content>
                    <p>{userInfo.name}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                <InfoGroup>
                  <InfoGroup.Label>성별</InfoGroup.Label>
                  <InfoGroup.Content>
                    <p>{genderTransformer(userInfo.gender)}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                <InfoGroup>
                  <InfoGroup.Label>생년월일</InfoGroup.Label>
                  <InfoGroup.Content>
                    <p>{userInfo.birthday}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                <div className={styles.btn_accuse}>
                  {true && (
                    <Button
                      size="sm"
                      variant="default"
                      iconBtn
                      color="secondary"
                      icon={<HiOutlineBan />}
                      full
                      onClick={() => {
                        onAddBlackUser(userInfo.memberId);
                      }}
                    >
                      친구차단
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="default"
                    iconBtn
                    color="danger"
                    icon={<AiOutlineAlert />}
                  >
                    신고
                  </Button>
                </div>
              </ProfileCard.BaseInfo.InfoArea>
            </ProfileCard.BaseInfo>
            <ProfileCard.ExtraInfo>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>자기소개</InfoGroup.Label>
                <InfoGroup.Content>
                  <p>{userInfo.introduce}</p>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>언어</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    {userInfo.language &&
                      userInfo.language.map((language) => (
                        <Flex.Col key={language.nation}>
                          <Label>
                            {langTransformer(language.nation)} Lv.
                            {language.level}
                          </Label>
                        </Flex.Col>
                      ))}
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>태그</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    {userInfo.tag &&
                      userInfo.tag.map((tag) => (
                        <Flex.Col key={tag.tagId}>
                          <Label>{tag.name}</Label>
                        </Flex.Col>
                      ))}
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
            </ProfileCard.ExtraInfo>
          </>
        )}
      </ProfileCard>
    </>
  );
};

export default Profile;
