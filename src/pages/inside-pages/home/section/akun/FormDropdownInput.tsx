import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import InputBox, { InputBoxState } from '../input-box/InputBox';
import Button from 'src/components/atoms/button';
import Tipografi from '../../tipografi/Tipografi';
import { ArrowDownIcon } from '../../icons/Icons';
import { RadioOption } from '../form-radio-input/FormRadioInput';
import { DropdownOptionsContainer } from './styled';
import PopupOptions from '../../popup/options/PopupOptions';

interface FormDropdownInputProps extends TextInputProps {
  label?: string
  labelOptions?: string
  options?: RadioOption<string>[]
  value: string
  onValueChange(value: string): void
  state?: InputBoxState
  errorText?: string
  leftItem?: React.ReactNode
}

export default function FormDropdownInput<T>(props: FormDropdownInputProps) {
  const [options_visible, setOptionsVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity onPress={() => setOptionsVisible(true)}>
        <InputBox 
          label={props.label} 
          state={props.state}
          errorText={props.errorText}
          leftItem={props.leftItem}
          rightItem={props.editable && <ArrowDownIcon onPress={() => setOptionsVisible(true)} />}>
          <Tipografi 
            style={{
              color: props.value ? '#000' : props.placeholderTextColor,
              marginLeft: 4,
              paddingTop: 12,
              paddingBottom: 12
            }}
            type={'normal'}>
            { 
              props.value 
              ? (props.options ?? []).find(x => x.value === props.value)?.label ?? '-'
              : (props.placeholder ?? '') 
            }
          </Tipografi>
        </InputBox>
      </TouchableOpacity>
      <PopupOptions<string>
        title={props.labelOptions ?? 'Pilih salah satu'}
        onSelected={(new_value: string) => {
          setOptionsVisible(false);
          props.onValueChange ? props.onValueChange(new_value) : null;
        }}
        show={options_visible}
        setShow={setOptionsVisible}
        options={props.options ?? []}
        selected={props.value}
        cancelable />
    </>
  );
}
