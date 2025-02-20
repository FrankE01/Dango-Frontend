import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-red-300 w-screen h-screen">
      <View>
        <Text className="text-red-500 text-3xl">Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
