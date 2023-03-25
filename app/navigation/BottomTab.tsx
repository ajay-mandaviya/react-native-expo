import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FilterList, ListScreen } from "../Screens";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
const Tabs = createBottomTabNavigator<{
  FilterList: undefined;
  ListScreen: undefined;
}>();

const TabScreens = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
        name="ListScreen"
        component={ListScreen}
      />
      <Tabs.Screen
        name="FilterList"
        component={FilterList}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="th-list" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabScreens;
