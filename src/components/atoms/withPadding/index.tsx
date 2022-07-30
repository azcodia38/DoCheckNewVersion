import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WithPaddingContainer } from './styled';

interface WithPaddingProps {
  children?: any
  style?: StyleProp<ViewStyle>
  withPadding?: boolean
}

export default function WithPadding(props: WithPaddingProps) {
  return (
    <WithPaddingContainer style={props.style}>
      { props.children }
    </WithPaddingContainer>
  );
}
