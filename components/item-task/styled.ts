import styled from "styled-components/native";

export const ItemTaskContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const TaskDetailContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PinTaskContainer = styled.View`
  position: absolute;
  top: 12px;
  right: 0px;
`;
