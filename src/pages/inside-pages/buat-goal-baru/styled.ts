import styled from "styled-components/native";

export const BuatGoalBaruPageContainer = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const PesertaGrupContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  padding-left: 18px;
  padding-right: 18px;
  background-color: #FFF;
  border-radius: 10px;
`;

export const TasksContainer = styled.View`
`;

export const TaskKosong = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AbsoluteFloatingButtonContainer = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 24px;
  width: ${60}%;
  left: ${(100 - 60) / 2}%;
`;
