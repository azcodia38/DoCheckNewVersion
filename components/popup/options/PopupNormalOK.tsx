import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RNModalAnimationType } from 'src/utils/const';
import Button from 'src/components/atoms/button';
import { ImageBerhasilDiubah } from '../../icons/Icons';
import Space from '../../../src/components/atoms/space';
import Tipografi from '../../../src/components/atoms/tipografi';
import ContainerPopup from '../container/ContainerPopup';
import { PopupNormalOKContainer } from './style';
interface PopupNormalOKProps {
  show?: boolean
  setShow?(show: boolean): void
  image: React.ReactNode
  title?: string
  text?: string
  cancelable?: boolean
  onCancelRequest?(): void
  onOK?(): void
  noButton?: boolean
  onModalHide?(): void
  animationIn?: RNModalAnimationType
  animationOut?: RNModalAnimationType
  style?: StyleProp<ViewStyle>
}

export default function PopupNormalOK(props: PopupNormalOKProps) {
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
      animationIn={props.animationIn}
      animationOut={props.animationOut}
      onModalHide={props.onModalHide}
      width={'78%'} 
      show={props.show} 
      onCancel={onCancel}>
      <PopupNormalOKContainer style={props.style}>
        { props.image }
        <Space value={10} />
        <Tipografi type={'title'} center>
          { props.title ?? 'Berhasil!' }
        </Tipografi>
        { props.text &&  <Space value={10} /> }
        <Tipografi center type={'small'} style={{ color: '#818487' }}>
          { props.text ?? '' }
        </Tipografi>
          <Space value={25} />
        { !props.noButton && <>
          <Button 
            onPress={() => {
              props.onOK ? props.onOK() : null;
            }}
            style={{ width: '80%', alignSelf: 'center' }}
            noShadow>
            OK, Keren
          </Button>
          <Space value={20} />
        </> }
      </PopupNormalOKContainer>
    </ContainerPopup>
  );
}
