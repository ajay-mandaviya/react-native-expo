import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Header, Layout, TextField } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchUser,
  resetUser,
  updateCurrentPage,
} from "../../store/info.slice";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

interface ScreenNavigation {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ListScreen = ({ navigation }: ScreenNavigation) => {
  const dispatch = useAppDispatch();
  const { users, currentPage, isLoading } = useAppSelector(
    (state) => state.userReducer
  );
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUser(currentPage));
  }, [currentPage]);

  const renderFooterComponent = () => {
    if (isLoading) {
      return <ActivityIndicator size={30} />;
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(resetUser());
      dispatch(updateCurrentPage(1));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Users" />
      <View style={{ flex: 1 }}>
        <Layout>
          <FlatList
            refreshing={isRefresh}
            onRefresh={() => {
              dispatch(resetUser());
              dispatch(updateCurrentPage(1));
            }}
            data={users}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item?.login?.uuid}
            renderItem={({ item }) => {
              return (
                <Card
                  image={item?.picture?.medium}
                  number={item.cell}
                  subTitle={item?.login?.username}
                  title={`${item?.name?.title} ${item?.name?.first} ${item?.name?.last} `}
                />
              );
            }}
            onEndReached={() => {
              dispatch(updateCurrentPage(currentPage + 1));
            }}
            ListFooterComponent={renderFooterComponent()}
          />
        </Layout>
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;
