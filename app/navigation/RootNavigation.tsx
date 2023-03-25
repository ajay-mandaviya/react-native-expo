import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
const Stack = createNativeStackNavigator<{
  Tab: undefined;
}>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Tab"
          component={BottomTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
