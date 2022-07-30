import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DotActive, DotInactive, IntroDotIndicatorContainer } from './styled';

interface IntroDotIndicatorProps {
  style?: StyleProp<ViewStyle>
  totalDots: number
  activeDot: number
  dotSize?: number
  inactiveColor?: string
  activeColor?: string
  fillDotsMode?: boolean
  gapSize?: number
}

export default function IntroDotIndicator(props: IntroDotIndicatorProps) {
  return (
    <IntroDotIndicatorContainer style={props.style}>
      {
        '.'.repeat(props.totalDots).split('').map((_, i) => {
          if (i === props.activeDot || (props.fillDotsMode && i <= props.activeDot)) {
            return <DotActive 
              style={{ 
                backgroundColor: props.activeColor ?? '#FFFFFF',
                marginLeft: i === 0 ? 0 : (props.gapSize ?? 4),
                marginRight: i === props.totalDots - 1 ? 0 : (props.gapSize ?? 4),
                width: props.dotSize ?? 8,
                height: props.dotSize ?? 8
              }} 
              key={i} />;
          }
          return <DotInactive 
            style={{
              backgroundColor: props.inactiveColor ?? '#FFFFFF88',
              marginLeft: i === 0 ? 0 : (props.gapSize ?? 4),
              marginRight: i === props.totalDots - 1 ? 0 : (props.gapSize ?? 4),
              width: props.dotSize ?? 8,
              height: props.dotSize ?? 8
            }}
            key={i} />
        })
      }
    </IntroDotIndicatorContainer>
  );
}
