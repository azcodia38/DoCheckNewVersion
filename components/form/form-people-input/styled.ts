import styled from "styled-components/native";
import { theme } from "src/utils/const";

export const DropdownOptionsContainer = styled.View`
  position: absolute;
  width: 100%;
  padding: 12px;
  background: #CCC;
  height: 400px;
  z-index: 3;
  top: 100%;
  border-style: solid;
  border-color: #999;
  border-width: 1px;
`;

export const OptionsContainer = styled.View`
  position: absolute;
  backgroundColor: #FFF;
  borderLeftColor: ${theme.main_color};
  borderRightColor: ${theme.main_color};
  borderBottomColor: ${theme.main_color};
  borderTopColor: #0000;
  borderStyle: solid;
  borderWidth: .5px;
  borderBottomLeftRadius: 8px;
  borderBottomRightRadius: 8px;
  overflow: hidden;
  zIndex: 999;
  left: 0px;
  top: 100%;
  width: 100%;
`;

export const OptionItemContainer = styled.View`
  padding: 12px;
  paddingLeft: 40px;
  borderStyle: solid;
  borderColor: #F0F0F0;
  borderWidth: .5px;
`;
