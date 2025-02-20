import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-green-300 w-screen h-screen">
      <View>
        <Text className="text-green-500 text-3xl">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
