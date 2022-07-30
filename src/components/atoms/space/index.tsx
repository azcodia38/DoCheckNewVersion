import React from 'react';
import { View } from 'react-native';

interface SpaceProps {
  value?: number
  width?: number
}

export default function Space(props: SpaceProps) {
  return (
    <View style={{ height: props.value, width: props.width }} />
  );
}
