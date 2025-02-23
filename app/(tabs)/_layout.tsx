import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => {
            return focused ? (
              <Text className="text-sm text-mainBlue">Home</Text>
            ) : null;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={focused ? 24 : 30}
                color={focused ? "#114EFD" : "gray"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(new)/index"
        options={{
          title: "New",
          tabBarLabel: ({ focused }) => {
            return focused ? (
              <Text className="text-sm text-mainBlue">New</Text>
            ) : null;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={focused ? 24 : 30}
                color={focused ? "#114EFD" : "gray"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => {
            return focused ? (
              <Text className="text-sm text-mainBlue">Profile</Text>
            ) : null;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={focused ? 24 : 30}
                color={focused ? "#114EFD" : "gray"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
