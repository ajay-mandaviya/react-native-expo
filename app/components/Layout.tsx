import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

interface Layout {
  children: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return <View style={style.marginView}>{children}</View>;
};

const style = StyleSheet.create({
  marginView: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
});

export default memo(Layout);
