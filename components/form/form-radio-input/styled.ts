import styled from "styled-components/native";
import { theme } from "src/utils/const";

export const FormRadioInputContainer = styled.View``;

export const FormRadioOptionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const RadioOnBorder = styled.View`
  border-radius: 999px;
  height: 22px;
  width: 22px;
  border-style: solid;
  border-width: 2px;
  border-color: ${theme.main_color};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RadioOnCenterCircle = styled.View`
  border-radius: 999px;
  height: 7px;
  width: 7px;
  background-color: ${theme.main_color};
`;

export const RadioItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;
