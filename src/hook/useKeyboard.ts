import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = (): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight((e as any).endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow as any);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return [keyboardHeight];
};
