import React from 'react';
import { TouchableOpacity } from 'react-native';
import Tipografi from "../../src/components/atoms/tipografi";
import { ImageIcon, ItemContainer, PilihFotoDialogContainer } from "./styled";

interface PilihFotoDialogProps {
  disableHapusFoto?: boolean
  onFotoSekarang?(): void
  onPilihDariGaleri?(): void
  onHapusFoto?(): void
}

export default function PilihFotoDialog(props: PilihFotoDialogProps) {
  return (
    <PilihFotoDialogContainer>
      <TouchableOpacity onPress={props.onFotoSekarang}>
        <ItemContainer>
          <ImageIcon source={require('src/assets/images/pilih-foto-kamera.png')} />
          <Tipografi type={'label-regular'}>
            Foto sekarang
          </Tipografi>
        </ItemContainer>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPilihDariGaleri}>
        <ItemContainer>
          <ImageIcon source={require('src/assets/images/pilih-foto-galeri.png')} />
          <Tipografi type={'label-regular'}>
            Pilih dari galeri
          </Tipografi>
        </ItemContainer>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => !props.disableHapusFoto && props.onHapusFoto && props.onHapusFoto()}>
        <ItemContainer style={{ opacity: props.disableHapusFoto ? .5 : 1 }}>
          <ImageIcon source={require('src/assets/images/pilih-foto-hapus.png')} />
          <Tipografi type={'label-regular'}>
            Hapus foto
          </Tipografi>
        </ItemContainer>
      </TouchableOpacity>
    </PilihFotoDialogContainer>
  );
}
