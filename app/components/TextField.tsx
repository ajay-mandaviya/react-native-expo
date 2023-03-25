import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TextInput,
  TextStyle,
  Text,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  placeholder: string;
  forwardedRef?: any;
  inputStyle?: TextStyle;
}

const SELECTED_CONTAINER: ViewStyle = {
  borderColor: "black",
  borderWidth: 1,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowRadius: 10,
};

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  forwardedRef,
  ...rest
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const onFocus = useMemo(() => () => setSelected(true), []);
  const onBlur = useMemo(() => () => setSelected(false), []);

  return (
    <View style={[styles.inputWrapper, selected && SELECTED_CONTAINER]}>
      <TextInput
        placeholder={placeholder}
        ref={forwardedRef}
        onFocus={onFocus}
        onBlur={onBlur}
        style={[styles.textField]}
        {...rest}
      />
    </View>
  );
};

interface InputStyle {
  inputWrapper: ViewStyle;
  textField: TextStyle;
}

const styles = StyleSheet.create<InputStyle>({
  inputWrapper: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    paddingLeft: 12,
  },
  textField: {
    color: "grey",
    flex: 1,
    fontSize: 16,
  },
});

export default TextField;
