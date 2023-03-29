import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLocationState } from '../../recoil/atoms';
import { userState } from '../../recoil/atoms/user/user';
import { PATCH, POST_IMG } from '../../utils/axios';
import AlertModal from '../Common/Modal/AlertModal';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import ProfileImage from '../Common/ProfileImage/ProfileImage';
import { validateUploadImage, toast } from '../../utils';

type MyProfileImageProps = {
  onChangeLocation: () => void;
};

const MyProfileImage = ({ onChangeLocation }: MyProfileImageProps) => {
  const userInfo = useRecoilValue(userState);
  const [userLcation, setUserLocation] = useRecoilState(userLocationState);
  const [photoURL, setPhotoURL] = useState<string | null>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setUserLocation(userInfo?.location);
  }, [location]);

  useEffect(() => {
    setPhotoURL(userInfo?.profile);
  }, [userInfo?.profile]);

  // 이미지 변경
  const onChangeImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 확장자 체크 & 파일 용량 체크
    const checkedFile = await validateUploadImage(event);
    if (!checkedFile.isValid) {
      setPhotoURL(null);
    }
    if (checkedFile.isValid) {
      const formData = new FormData();
      formData.append('type', 'profiles');
      checkedFile.file && formData.append('image', checkedFile.file);

      try {
        // 이미지를 URL로 변환
        const { data } = await POST_IMG('/users/me/profiles/upload', formData, {
          headers: {
            'Contest-Type': 'multipart/form-data',
          },
        });
        // 프로필 수정
        const response = await PATCH('/users/me', {
          profile: data.uploadUrl,
        });
        if (response) {
          setPhotoURL(data.uploadUrl);
          toast.success('사진 수정이 완료되었습니다');
        }
      } catch (error) {
        console.log('error');
      }
    }
  };

  // 이미지 제거
  const onRemoveImageHandler = async () => {
    try {
      const response = await PATCH('/users/me', {
        profile: '',
      });

      if (response) {
        setPhotoURL(null);
        setIsOpenModal(false);
        toast.success('사진이 삭제되었습니다');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <>
      {isOpenModal && (
        <AlertModal
          labelClose="닫기"
          labelSubmit="삭제"
          onClose={() => {
            setIsOpenModal(false);
          }}
          onSubmit={onRemoveImageHandler}
        >
          프로필 이미지를 삭제하시겠습니까?
        </AlertModal>
      )}
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
              {photoURL && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  사진 제거
                </Button>
              )}
            </Flex>
          </ButtonGroup>
        </Flex.Col>
      </Flex>
    </>
  );
};

export default MyProfileImage;
