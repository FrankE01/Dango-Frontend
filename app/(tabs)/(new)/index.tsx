import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView className="w-screen h-screen flex items-center justify-center gap-4">
        <Text className="text-foreground">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Button>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <SafeAreaView className="w-screen h-screen py-4 z-0">
      <View>
        <View>
          <CameraView facing={facing}>
            <View className="flex h-full w-screen justify-end pb-20">
              <View className="flex flex-row justify-around items-center p-4">
                <Button
                  onPress={toggleCameraFacing}
                  size="icon"
                  className="bg-background rounded-[50%] w-12 h-12 opacity-0"
                >
                  <Ionicons name="sync" size={24} color="white" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-[50%] w-20 h-20 bg-transparent border-white border-4"
                >
                  <View className="bg-white rounded-[50%] w-16 h-16 flex items-center justify-center"></View>
                </Button>
                <Button
                  onPress={toggleCameraFacing}
                  size="icon"
                  className="bg-background rounded-[50%] w-12 h-12"
                >
                  <Ionicons name="sync" size={24} color="white" />
                </Button>
              </View>
            </View>
          </CameraView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
