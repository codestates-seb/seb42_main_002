import { RiAlarmWarningLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user/user';
import { langTransformer } from '../../utils/common';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import InfoGroup from '../Common/InfoGroup/InfoGroup';
import Label from '../Common/Label/Label';
import ProfileCard from '../Common/ProfileCard/ProfileCard.module';
import ProfileImage from '../Common/ProfileImage/ProfileImage';
import styles from './Profile.module.scss';

const Profile = () => {
  const userInfo = useRecoilValue(userState);
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
                        <Button size="sm" variant="secondary" full>
                          친구추가
                        </Button>
                        <Button size="sm" variant="secondary" full>
                          친구삭제
                        </Button>
                        <Button size="sm" variant="danger" full>
                          친구차단
                        </Button>
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
                    <p>{userInfo.gender}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                <InfoGroup>
                  <InfoGroup.Label>생년월일</InfoGroup.Label>
                  <InfoGroup.Content>
                    <p>{userInfo.birthday}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                <div className={styles.btn_accuse}>
                  <Button
                    size="sm"
                    variant="danger"
                    iconBtn
                    icon={<RiAlarmWarningLine />}
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
                    <>
                      {userInfo.language &&
                        userInfo.language.map((language) => (
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
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>태그</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    <>
                      {userInfo.tag &&
                        userInfo.tag.map((tag) => (
                          <>
                            <Flex.Col key={tag.id}>
                              <Label>{tag.name}</Label>
                            </Flex.Col>
                          </>
                        ))}
                    </>
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
