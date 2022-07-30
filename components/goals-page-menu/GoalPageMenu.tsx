import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ContainerAlignItemsCenter } from '../goalCard/styled';
import { MenuGoalJadikanTempalateIcon, MenuGoalsPilihIcon, MenuGoalTambahTaskIcon, MenuGoalTambahTemanIcon, MenuTaskDeleteIcon, MenuTaskEditIcon, MenuTaskPinIcon } from '../icons/Icons';
import Tipografi from '../../src/components/atoms/tipografi';
import { GoalsPageMenuContainer } from './styled';

interface GoalsPageMenuProps {
  onGoalsBaru?(): void
  onPilih?(): void
  onHapusSemua?(): void
  enableMenu?: boolean
}

export default function GoalsPageMenu(props: GoalsPageMenuProps) {
  return (
    <GoalsPageMenuContainer>
      <TouchableOpacity onPress={props.onGoalsBaru}>
        <ContainerAlignItemsCenter style={{ padding: 10, paddingLeft: 15, paddingRight: 15, borderStyle: 'solid', borderBottomWidth: .5, borderBottomColor: '#F0F0F0' }}>
          <MenuGoalTambahTaskIcon style={{ width: 15, height: 15 }} />
          <Tipografi type={'small'} style={{ marginLeft: 12 }}>
            Goals Baru
          </Tipografi>
        </ContainerAlignItemsCenter>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.enableMenu && props.onPilih && props.onPilih()}>
        <ContainerAlignItemsCenter style={{ opacity: props.enableMenu ? 1 : .5, padding: 10, paddingLeft: 15, paddingRight: 15, borderStyle: 'solid', borderBottomWidth: .5, borderBottomColor: '#F0F0F0' }}>
          <MenuGoalsPilihIcon />
          <Tipografi type={'small'} style={{ marginLeft: 12 }}>
            Pilih
          </Tipografi>
        </ContainerAlignItemsCenter>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.enableMenu && props.onHapusSemua && props.onHapusSemua()}>
        <ContainerAlignItemsCenter style={{ opacity: props.enableMenu ? 1 : .5, padding: 10, paddingLeft: 15, paddingRight: 15, borderStyle: 'solid', borderBottomWidth: .5, borderBottomColor: '#F0F0F0' }}>
          <MenuTaskDeleteIcon />
          <Tipografi type={'small'} style={{ marginLeft: 12 }}>
            Hapus Semua
          </Tipografi>
        </ContainerAlignItemsCenter>
      </TouchableOpacity>
    </GoalsPageMenuContainer>
  );
}
