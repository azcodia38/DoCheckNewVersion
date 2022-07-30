import styled from "styled-components/native";

export const PilihFotoDialogContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
  padding-top: 24px;
`;

export const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
`;

export const ImageIcon = styled.Image`
  width: 28px;
  height: 28px;
  resize-mode: contain;
  margin-right: 12px;
`;
