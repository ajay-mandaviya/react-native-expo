import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Header, Layout, TextField, CheckBox, Card } from "../../components";
import data from "../../constant/data.json";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type SortFilter = {
  lowToHigh: "lowToHigh";
  hightToLow: "hightToLow";
};

interface ScreenNavigation {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const FilterList = ({ navigation }: ScreenNavigation) => {
  const flatRef = useRef<FlatList>(null);
  const [products, setProducts] = useState(data);
  const [serchText, setSearchText] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<keyof SortFilter | null>(null);

  const filterProduct = () => {
    let productItems = products;
    if (priceFilter) {
      if (priceFilter === "hightToLow") {
        productItems = productItems.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (priceFilter === "lowToHigh") {
        productItems = productItems.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }

    if (serchText) {
      productItems = productItems.filter((item) => {
        return item.title.toLowerCase().indexOf(serchText.toLowerCase()) !== -1;
      });
    }

    return productItems;
  };

  const handleResetFilter = () => {
    setSearchText("");
  };

  useEffect(() => {
    flatRef?.current?.scrollToIndex({ animated: true, index: 0 });
  }, [priceFilter, serchText]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title="Products" />
      <Layout>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextField
              placeholder="Search Product.."
              keyboardType="web-search"
              value={serchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              returnKeyType="search"
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={serchText === ""}
              style={styles.resetButton}
              onPress={handleResetFilter}
            >
              <Text>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
      <Layout>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={{ fontWeight: "700" }}>Sort By Price :</Text>
          <View style={[styles.filterBox]}>
            <CheckBox
              disabled={priceFilter === "lowToHigh"}
              selected={priceFilter === "lowToHigh"}
              onPress={() => {
                setPriceFilter("lowToHigh");
              }}
            />
            <Text>Low to Hight</Text>
          </View>
          <View style={[styles.filterBox]}>
            <CheckBox
              disabled={priceFilter === "hightToLow"}
              selected={priceFilter === "hightToLow"}
              onPress={() => {
                setPriceFilter("hightToLow");
              }}
            />
            <Text style={{ textAlign: "center" }}>High to Low</Text>
          </View>
        </View>
      </Layout>
      <View style={{ flex: 1 }}>
        <Layout>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterProduct()}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item }) => {
              return (
                <Card
                  image={item.image}
                  number={item.price}
                  subTitle={item.category}
                  title={item.title}
                />
              );
            }}
          />
        </Layout>
      </View>
    </SafeAreaView>
  );
};

interface Style {
  filterBox: ViewStyle;
  resetButton: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  filterBox: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  resetButton: {
    padding: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 40,
  },
});

export default FilterList;
