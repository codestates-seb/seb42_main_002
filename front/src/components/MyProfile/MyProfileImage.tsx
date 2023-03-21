import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLocationState } from '../../recoil/atoms';
import { userState } from '../../recoil/atoms/user/user';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import ProfileImage from '../Common/ProfileImage/ProfileImage';

type MyProfileImageProps = {
  onChangeLocation: () => void;
};

const MyProfileImage = ({ onChangeLocation }: MyProfileImageProps) => {
  const userInfo = useRecoilValue(userState);
  const [userLcation, setUserLocation] = useRecoilState(userLocationState);
  const [photoURL, setPhotoURL] = useState<string | null>();

  useEffect(() => {
    setUserLocation(userInfo?.location);
  }, [location]);

  useEffect(() => {
    setPhotoURL(userInfo?.profile);
  }, [userInfo?.profile]);

  // 이미지 변경
  const onChangeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files && event.target.files[0];

    reader.onload = () => {
      setPhotoURL(() => reader.result as string);
    };

    file && reader.readAsDataURL(file);
  };

  // 이미지 제거
  const onRemoveImageHandler = () => {
    setPhotoURL(userInfo?.profile);
  };

  return (
    <Flex dir="column" gap="sm">
      <Flex.Col>
        <ProfileImage
          profile={photoURL}
          location={userLcation}
          onChangeLocation={onChangeLocation}
        />
      </Flex.Col>
      <Flex.Col>
        <ButtonGroup>
          <Flex dir="column" gap="sm">
            {!photoURL ? (
              <>
                <Button size="sm" variant="primary">
                  <label htmlFor="profile">
                    <input
                      type="file"
                      id="profile"
                      className="blind"
                      accept="image/*"
                      onChange={onChangeImageHandler}
                    />
                    사진 수정
                  </label>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onClick={onRemoveImageHandler}
              >
                사진 제거
              </Button>
            )}
          </Flex>
        </ButtonGroup>
      </Flex.Col>
    </Flex>
  );
};

export default MyProfileImage;
