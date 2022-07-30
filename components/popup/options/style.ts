import styled from "styled-components/native";
import { theme } from "src/utils/const";

export const PopupOptionsContainer = styled.View`
  background: #FFF;
  border-radius: 10px;
  width: 85%;
  display: flex;
  flex-direction: column;
  min-height: 65%;
  max-height: 75%;
  overflow: hidden;
`;

export const PopupHeaderContainer = styled.View`
  padding: 12px;
  background-color: ${theme.main_color};
`;

export const OptionsContainer = styled.View`
  height: 100%;
  flex: 1;
`;

