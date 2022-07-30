import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Goals } from 'src/entity/Goals.entity';
import { Task } from 'src/entity/Task.entity';
import { getBackgroundColor } from 'src/utils';
import CheckLabel from '../check-label/CheckLabel';
import { ContainerAlignItemsCenter, SpaceBetweenContainerCenter } from '../goalCard/styled';
import { RekomendasiCheckIcon, RekomendasiPlusIcon } from '../icons/Icons';
import Space from '../../src/components/atoms/space';
import Tipografi from '../../src/components/atoms/tipografi';
import { GoalSuggestionCardContainer, IconContainer, SeeMoreListContainer, SmallNumberContainer, TasksContainer, TitleCard } from "./styled";

interface TaskListProps {
  data: string[]
}

function TaskList(props: TaskListProps) {
  return (
    <TasksContainer>
      {
        props.data.map((label: string, i: number) => (
          <ContainerAlignItemsCenter style={{ paddingBottom: 3 }} key={i}>
            <CheckLabel />
            <Tipografi type={'small'} style={{ color: '#262D33' }}>
              { label }
            </Tipografi>
          </ContainerAlignItemsCenter>
        ))
      }
    </TasksContainer>
  )
}

interface GoalSuggestionCardProps {
  goal: Goals
  copy?: boolean
  onPress?(): void
}

export default function GoalSuggestionCard(props: GoalSuggestionCardProps) {
  const bg_color: string = getBackgroundColor(props.goal.id);
  return (
    <GoalSuggestionCardContainer 
      style={{
        backgroundColor: `${bg_color}44`
      }}>
      <SpaceBetweenContainerCenter
        style={{
          backgroundColor: bg_color,
          padding: 12
        }}>
        <Tipografi type={'small'} style={{ fontWeight: '500' }}>
          { props.goal.name }
        </Tipografi>
        <TouchableOpacity onPress={props.onPress}>
          <IconContainer>
            { props.copy ? <RekomendasiCheckIcon /> : <RekomendasiPlusIcon /> }
          </IconContainer>
        </TouchableOpacity>
      </SpaceBetweenContainerCenter>
      <TaskList data={props.goal.tasks.slice(0, 3).map((t: Task) => t.title)} />
      { props.goal.tasks.length > 3 && <SeeMoreListContainer>
        <Tipografi type={'small'} style={{ fontWeight: '500' }}>
          {'And more list '}
        </Tipografi>
        <SmallNumberContainer>
          <Tipografi style={{ fontWeight: '500', fontSize: 8 }}>
            { `${props.goal.tasks.length - 3}+` }
          </Tipografi>
        </SmallNumberContainer>
      </SeeMoreListContainer> }
    </GoalSuggestionCardContainer>
  );
}
