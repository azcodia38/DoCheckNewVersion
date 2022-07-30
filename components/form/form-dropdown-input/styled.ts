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
  border-left-color: ${theme.main_color};
  border-right-color: ${theme.main_color};
  border-bottom-color: ${theme.main_color};
  border-top-color: #0000;
  border-style: solid;
  border-width: .5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
  zIndex: 99999;
  left: 0px;
  top: 100%;
  width: 100%;
`;

export const OptionItemContainer = styled.View`
  padding: 12px;
  padding-left: 40px;
  border-style: solid;
  border-color: #F0F0F0;
  overflow: hidden;
  zIndex: 99999;
  borderWidth: .5px;
`;
