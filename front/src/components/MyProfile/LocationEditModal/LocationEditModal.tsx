import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useModals from '../../../hooks/useModals';
import {
  userLocationValueState,
  userLocationState,
  userState,
} from '../../../recoil/atoms';
import { LocationIcons, locationTypes, toast } from '../../../utils';
import { PATCH } from '../../../utils/axios';
import { locationTransformer } from '../../../utils/common';
import {
  CONST_LOCATION_CODE,
  LOCATION_CODE,
} from '../../../utils/enums/common/common.enum';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SummaryTitle from '../../Common/SummaryTitle/SummaryTitle';
import LanguageEditModal from '../LanguageEditModal/LanguageEditModal';
import styles from './LocationEditModal.module.scss';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const { openModal } = useModals();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [selectedUserLocation, setSelectedUserLocation] =
    useRecoilState(userLocationState);
  const setselectedUserLocationValueState = useSetRecoilState<any>(
    userLocationValueState
  );
  const [locationList] = useState([...CONST_LOCATION_CODE]);
  const [changeLocation, setChangeLocation] = useState(selectedUserLocation);

  const onSelectLocationHandler = (selectedLocation: LOCATION_CODE) => {
    setChangeLocation(() => selectedLocation);
  };

  const updateLocation = async () => {
    try {
      const response = await PATCH('/users/me', {
        location: changeLocation,
      });
      if (response) {
        setSelectedUserLocation(changeLocation);
        toast.success('수정 완료되었습니다!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      if (userInfo?.location === null) {
        // 첫 설정일 때
        setselectedUserLocationValueState(changeLocation);
        openModal(LanguageEditModal);
      } else {
        // 수정일 때
        updateLocation();
        // TODO: 타입에러
        setUserInfo((prev: any) => ({
          ...prev,
          location: changeLocation,
        }));
        onClose && onClose();
      }
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit={userInfo?.location === null ? '다음' : '수정'}
    >
      {userInfo?.location === null && (
        <SummaryTitle>
          국적 혹은 <br />
          현재 사는 곳을 선택하세요
        </SummaryTitle>
      )}
      <Flex gap="sm" wrap="wrap">
        {locationList &&
          locationList.map((location) => (
            <Flex.Col key={location} cols={6}>
              <LabelButton
                full
                onClick={() => onSelectLocationHandler(location)}
                isActive={changeLocation === location}
              >
                <LabelButton.Content>
                  <Flex gap="sm" align="center" justify="start">
                    <span className={styles.icon_flags}>
                      <img
                        src={LocationIcons[location as keyof locationTypes]}
                        alt={`${locationTransformer(
                          location as LOCATION_CODE
                        )} 국기`}
                      />
                    </span>
                    <span className={styles.location_title}>
                      {locationTransformer(location)}
                    </span>
                  </Flex>
                </LabelButton.Content>
              </LabelButton>
            </Flex.Col>
          ))}
      </Flex>
    </FullPageModal>
  );
};

export default LocationEditModal;
