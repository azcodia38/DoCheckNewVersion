import styled from "styled-components/native";
import { theme } from "src/utils/const";

export const AudioBarContainer = styled.View`
  background-color: #ECECEC;
  height: 48px;
  border-radius: 999px;
  padding: 0 18px;
  display: flex;
  justify-content: center;
`;

export const HSpaceBetween = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HFlexStart = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const HFlexEnd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const CircleButtonContainer = styled.View`
  background-color: ${theme.main_color};
  border-radius: 999px;
  padding: 14px;
  width: 48px;
  height: 48px;
`;

export const RandomFrequencyContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const FrequencyItem = styled.View`
  width: 4px;
  height: 12px;
  border-radius: 999px;
  background-color: ${theme.main_color};
  margin-right: 3px;
`;
