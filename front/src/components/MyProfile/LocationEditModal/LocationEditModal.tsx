import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userLocationState } from '../../../recoil/atoms';
import { LocationIcons, locationTypes } from '../../../utils';
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
import styles from './LocationEditModal.module.scss';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [selectedUserLocation, setSelectedUserLocation] =
    useRecoilState(userLocationState);
  const [locationList, setLocationList] = useState([...CONST_LOCATION_CODE]);
  const [changeLocation, setChangeLocation] = useState(selectedUserLocation);

  const onSelectLocationHandler = (selectedLocation: LOCATION_CODE) => {
    setChangeLocation(() => selectedLocation);
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      setSelectedUserLocation(changeLocation);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit="수정"
    >
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
