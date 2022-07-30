import styled from "styled-components/native";

export const CheckItemContainerContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ChildrenContainer = styled.View`
  flex: 1;
`;

export const AbsoluteCheckContainer = styled.View`
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

export const CoverPressContainer = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
