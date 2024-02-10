import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import PostDetail from "../components/PostDetail";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={Home}
        name="Home"
      />
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: (props) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
                {...props}
              >
                <View style={styles.headerContainer}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </View>
              </TouchableWithoutFeedback>
            );
          },
        }}
        component={PostDetail}
        name="PostDetail"
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default AppNavigator;
