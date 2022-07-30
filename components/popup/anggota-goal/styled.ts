import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { theme } from "src/utils/const";
import { isIOS } from "src/utils";

export const PopupAnggotaContainer = styled.View`
  border-radius: 10px;
  width: 100%;
`;

export const InnnerContainer = styled.View`
  border-radius: 10px;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: ${Dimensions.get('screen').height * .5}px;
`;

export const UndangEmailContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.main_color};
  border-radius: 10px;
  padding: 18px;
  padding-left: ${theme.left_right_padding}px;
  padding-right: ${theme.left_right_padding}px;
  margin-top: -15px;
`;
