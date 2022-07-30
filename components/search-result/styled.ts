import styled from "styled-components/native";
import { theme } from "src/utils/const";

export const UserSearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 9px;
  padding-right: 9px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: #EFEFEF;
`;

export const UserSearch2Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 0px;
  padding-right: 0px;
`;

export const ImageUser = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background-color: #EEE;
  margin-right: 12px;
`;

export const NameUsername = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OwnerBox = styled.View`
  border-style: solid;
  border-width: 1px;
  align-self: flex-start;
  border-color: ${theme.main_color};
  border-radius: 3px;
  padding: .5px 5px;
`;
