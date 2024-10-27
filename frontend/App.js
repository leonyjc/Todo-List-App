import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EditTaskPage from "./pages/EditTaskPage";
import HomePage from "./pages/HomePage";


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home" }}
        ></Stack.Screen>
        <Stack.Screen
          name="EditTask"
          component={EditTaskPage}
          options={{ title: "Edit Task" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
