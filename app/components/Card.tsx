import React, { useState } from "react";
import { View, Image, StyleSheet, Text, ViewStyle } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
interface CardProps {
  title: string;
  subTitle: string;
  number: string | number;
  image: string;
}

const Card: React.FC<CardProps> = ({ image, title, subTitle, number }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  return (
    <View style={styles.productCard}>
      <View>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 8,
          }}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text style={{ textTransform: "capitalize" }}>{subTitle}</Text>
        <Text>{number} $</Text>
      </View>
      <View
        style={{
          position: "absolute",
          right: 20,
          top: 10,
        }}
      >
        <FontAwesome
          name={isLike ? "heart" : "heart-o"}
          color="lightgrey"
          size={20}
          onPress={() => setIsLike((prev) => !prev)}
        />
      </View>
    </View>
  );
};

interface CardStyle {
  productCard: ViewStyle;
}

const styles = StyleSheet.create<CardStyle>({
  productCard: {
    flexDirection: "row",
    shadowColor: "black",
    borderWidth: 1,
    marginBottom: 24,
    padding: 8,
    borderColor: "lightgrey",
    borderRadius: 12,
  },
});

export default Card;
