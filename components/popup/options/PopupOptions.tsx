import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Button from 'src/components/atoms/button';
import { RadioOption } from '../../form/form-radio-input/FormRadioInput';
import { ImageBerhasilDiubah } from '../../icons/Icons';
import ScrollView from '../../../src/components/atoms/scrollView';
import Space from '../../../src/components/atoms/space';
import Tipografi from '../../../src/components/atoms/tipografi';
import ContainerPopup from '../container/ContainerPopup';
import { OptionsContainer, PopupHeaderContainer, PopupOptionsContainer } from './style';

interface PopupOptionsProps<T> {
  show?: boolean
  setShow?(show: boolean): void
  options: RadioOption<T>[]
  selected: T
  title: string
  cancelable?: boolean
  onCancelRequest?(): void
  onSelected(selected: T): void
}

export default function PopupOptions<T>(props: PopupOptionsProps<T>) {
  function onCancel() {
    if (!props.cancelable) {
      props.onCancelRequest && props.onCancelRequest();
      return;
    }

    if (props.setShow) {
      props.setShow(false);
    }
  }

  return (
    <ContainerPopup width={'100%'} show={props.show} onCancel={onCancel}>
      <PopupOptionsContainer>
        <PopupHeaderContainer>
          <Tipografi style={{ color: 'white' }} type={'label'} center>
            { props.title }
          </Tipografi>
        </PopupHeaderContainer>
        <OptionsContainer>
          <ScrollView>
            {
              props.options.map((item: RadioOption<T>, i: number) => (
                <TouchableOpacity key={i} onPress={() => {
                  props.onSelected ? props.onSelected(item.value) : null
                }}>
                  <View style={{ padding: 12, backgroundColor: i % 2 === 0 ? '#F5F5F5' : '#FFF' }}>
                    <Tipografi type={'normal'}>
                      { item.label }
                    </Tipografi>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </OptionsContainer>
      </PopupOptionsContainer>
    </ContainerPopup>
  );
}
