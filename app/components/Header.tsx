import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StatusBar,
  TextStyle,
} from "react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerView}>
      <StatusBar backgroundColor={"lightgrey"} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};




interface HeaderStyleProps {
  headerView: ViewStyle;
  headerText: TextStyle;
}

const styles = StyleSheet.create<HeaderStyleProps>({
  headerView: {
    backgroundColor: "lightgrey",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "600",
  },
});
export default Header;
