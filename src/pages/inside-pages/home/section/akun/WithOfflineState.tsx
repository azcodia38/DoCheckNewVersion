import React from 'react';
import { View } from 'react-native';
import { useSelector } from "react-redux";
import StoreData from "../../store/types";
import Button from 'src/components/atoms/button';
import { ImageTidakAdaInternet } from "../icons/Icons";
import Space from '../space/Space';
import Tipografi from '../tipografi/Tipografi';
import { WithOfflineStateContainer } from "./styled";

interface WithOfflineStateProps {
  children?: any
}

export default function WithOfflineState(props: WithOfflineStateProps) {
  const connected = useSelector((_: StoreData) => _.connection.connected);

  if (connected) {
    return props.children;
  }

  return (
    <WithOfflineStateContainer>
      <ImageTidakAdaInternet />
      <Tipografi type={'label'}>
        Oops, Tidak ada koneksi internet
      </Tipografi>
      <Space value={15} />
      <Tipografi type={'small'} center style={{ color: '#818487' }}>
        {'Pastikan wifi atau data seluler\ndihidupkan lalu coba lagi'}
      </Tipografi>
      <Space value={30} />
      <Button 
        textStyle={{ fontSize: 14 }}
        style={{ width: 150, paddingTop: 7, paddingBottom: 8, alignSelf: 'center', backgroundColor: '#FF9999' }} 
        noShadow>
        Coba Lagi
      </Button>
    </WithOfflineStateContainer>
  )
}
