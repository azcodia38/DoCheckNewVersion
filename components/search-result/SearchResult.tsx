import React from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchResultData } from 'src/api/mock-api';
import { getPlaceholderImage } from 'src/utils/const';
import { GENDER, User } from 'src/entity/User.entity';
import { getUsername } from 'src/utils';
import Tipografi from '../../src/components/atoms/tipografi';
import WithPadding from 'src/components/atoms/withPadding';
import { ImageUser, NameUsername, UserSearchContainer } from './styled';

interface SearchItemProps {
  onPress?(): void
  firstItem?: boolean
  lastItem?: boolean
  imageUrl?: string
  name?: string
  username?: string
  gender: GENDER
  noPadding?: boolean
}

export function SearchItem(props: SearchItemProps) {
  return (
    <TouchableOpacity 
      activeOpacity={.8}
      onPress={props.onPress}>
      <WithPadding style={props.noPadding ? { paddingLeft: 0, paddingRight: 0 } : {}}>
        <UserSearchContainer style={{
          marginTop: props.firstItem? 14 : 0,
          borderTopColor: props.firstItem? '#0000' : '#EFEFEF',
          marginBottom: props.lastItem ? 14 : 0,
          paddingLeft: props.noPadding ? 0 : 9,
          paddingRight: props.noPadding ? 0 : 9
        }}>
          <ImageUser source={props.imageUrl ? { uri: props.imageUrl } : getPlaceholderImage(props.gender)} />
          <NameUsername>
            <Tipografi type={'label'} style={{ color: '#262D33' }}>
              { props.name ?? ''}
            </Tipografi>
            <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
              { props.username ?? '' }
            </Tipografi>
          </NameUsername>
        </UserSearchContainer>
      </WithPadding>
    </TouchableOpacity>
  );
}

interface SearchResultProps {
  data: User[]
  onUserPress?(data: User): void
}

export default function SearchResult(props: SearchResultProps) {
  function renderItem(x: { item: User, index: number }) {
    return (
      <SearchItem
        firstItem={x.index === 0}
        lastItem={x.index === (props.data.length - 1)}
        imageUrl={x.item.profilePicture}
        name={x.item.fullname}
        username={getUsername(x.item)}
        gender={x.item.gender}
        onPress={() => props.onUserPress && props.onUserPress(x.item)} />
    );
  }
  
  return (
    <FlatList
      style={{ height: '100%', width: '100%' }}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={c => c.id} />
  );
}
