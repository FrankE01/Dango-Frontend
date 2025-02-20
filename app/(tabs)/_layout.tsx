import React from "react";
import { Tabs } from "expo-router";
import { Home, CircleUser, PlusSquare } from "lucide-react-native";
import Icon from "@react-native-vector-icons/ionicons";

import { Text } from "react-native";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return <Icon name="home" size={24} color="#4F8EF7" />;
            // return <Text>Home</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="(new)/index"
        options={{
          title: "New",
          tabBarIcon: ({ focused }) => {
            return <PlusSquare stroke={focused ? "black" : "gray"} />;
          },
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return <CircleUser stroke={focused ? "black" : "gray"} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
