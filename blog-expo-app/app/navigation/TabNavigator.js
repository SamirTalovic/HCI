import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigator from "./AppNavigator";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              style={{ color: focused ? color : "#383838" }}
              name="home"
              size={24}
            />
          ),
        }}
        name="AppNavigator"
        component={AppNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="search1"
              size={24}
              style={{ color: focused ? color : "#383838" }}
            />
          ),
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
