import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { theme } from "src/utils/const";
import { isIOS } from "src/utils";

export const PopupAnggotaTaskContainer = styled.View`
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

