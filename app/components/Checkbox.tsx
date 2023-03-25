import React from "react";
import Rract from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface CheckBoxProps {
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}

const SELECTED_STYLE: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 8,
  backgroundColor: "black",
};

const CheckBox: React.FC<Partial<CheckBoxProps>> = ({
  disabled,
  onPress,
  selected,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        onPress && onPress();
      }}
    >
      <View style={[style.button, selected && { borderColor: "black" }]}>
        <View style={[selected && SELECTED_STYLE]}></View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
});

export default CheckBox;
