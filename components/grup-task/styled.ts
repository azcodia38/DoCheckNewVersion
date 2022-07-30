import styled from "styled-components/native";

export const NotifikasiContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #EEFFF5;
  border-radius: 12px;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ImageAndDetailContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const UserNotifikasiImage = styled.Image`
  width: 48px;
  height: 48px;
  resize-mode: cover;
  border-radius: 999px;
  margin-right: 12px;
`;

export const NotifikasiDetail = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SmallButtonNotifikasi = styled.View`
  padding-left: 10px;
  padding-right: 9px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-style: solid;
  border-color: #2FCC71;
  border-width: 0.5px;
  border-radius: 999px;
  margin-left: 3px;
`;

