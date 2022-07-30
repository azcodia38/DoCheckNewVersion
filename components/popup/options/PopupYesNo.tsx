import React from 'react';
import { View } from 'react-native';
import Button from 'src/components/atoms/button';
import { ContainerAlignItemsCenter } from '../../goalCard/styled';
import { ImageBerhasilDiubah } from '../../icons/Icons';
import Space from '../../../src/components/atoms/space';
import Tipografi from '../../../src/components/atoms/tipografi';
import ContainerPopup from '../container/ContainerPopup';
import { PopupYesNoContainer } from './styled';
interface PopupYesNoProps {
  show?: boolean
  setShow?(show: boolean): void
  image: React.ReactNode
  title: string
  text?: string
  cancelable?: boolean
  onCancelRequest?(): void
  onYes?(): void
  onNo?(): void
  labelYes?: string
  labelNo?: string
  onModalHide?(): void
}

export default function PopupYesNo(props: PopupYesNoProps) {
  function onCancel() {
    if (!props.cancelable) {
      props.onCancelRequest && props.onCancelRequest();
      return;
    }

    if (props.setShow) {
      props.setShow(false);
    }
  }

  return (
    <ContainerPopup 
      onModalHide={props.onModalHide}
      width={'78%'} 
      show={props.show} 
      onCancel={onCancel}>
      <PopupYesNoContainer>
        { props.image }
        <Space value={10} />
        <Tipografi type={'title'} center>
          { props.title }
        </Tipografi>
        { props.text &&  <Space value={10} /> }
        <Tipografi center type={'small'} style={{ color: '#818487' }}>
          { props.text ?? '' }
        </Tipografi>
        <Space value={15} />
        <ContainerAlignItemsCenter>
          <Button 
            onPress={props.onNo}
            style={{
              backgroundColor: '#0000'
            }}
            textStyle={{
              color: '#DADADA'
            }}
            containerStyle={{ 
              alignSelf: 'center',
              flex: 1,
              marginRight: 4,
              marginLeft: 18
            }}
            noShadow>
            { props.labelNo ?? 'Batal'}
          </Button>
          <Button 
            onPress={props.onYes}
            containerStyle={{
              alignSelf: 'center',
              flex: 1,
              marginLeft: 4,
              marginRight: 18
            }}
            noShadow>
            { props.labelYes ?? 'Hapus'}
          </Button>
        </ContainerAlignItemsCenter>
        <Space value={25} />
      </PopupYesNoContainer>
    </ContainerPopup>
  );
}
