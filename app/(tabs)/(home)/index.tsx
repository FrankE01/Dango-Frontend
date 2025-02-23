import React, { useState, useRef } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const Home = () => {
  const [parentBounds, setParentBounds] = useState({ width: 0, height: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const rotateZ = useSharedValue("0deg");
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [images, setImages] = useState(["red", "green", "blue"]);
  const [activeIndex, setActiveIndex] = useState(images.length - 1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { rotateZ: rotateZ.value },
      ],
    };
  });

  return (
    <SafeAreaView className="w-screen h-screen px-6 py-4 z-0">
      <View className="flex">
        <Text className="text-3xl text-foreground">Review Annotations</Text>
      </View>
      <View className="h-full flex justify-center">
        <View className="flex items-center py-6">
          <View
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setParentBounds({ width, height });
            }}
            className="border-2 border-gray-300 rounded-lg border-dashed p-3"
          >
            <GestureDetector
              gesture={Gesture.Pan().onUpdate((e) => {
                offset.value = {
                  x: e.translationX,
                  y: e.translationY,
                };

                const halfWidth = parentBounds.width / 2;
                const halfHeight = parentBounds.height / 2;

                if (e.translationY < -halfHeight) {
                  //skip
                  offset.value = withSpring({
                    x: offset.value.x,
                    y: offset.value.y - screenHeight - 100,
                  });
                } else if (e.translationY > halfHeight) {
                  //unskip
                  offset.value = withSpring({
                    x: offset.value.x,
                    y: offset.value.y + screenHeight + 100,
                  });
                } else if (e.translationX < -halfWidth) {
                  //reject
                  offset.value = withSpring({
                    x: offset.value.x - screenWidth - 100,
                    y: offset.value.y,
                  });
                  rotateZ.value = withSpring(
                    rotateZ.value === "0deg" ? "-45deg" : "0deg"
                  );
                } else if (e.translationX > halfWidth) {
                  //accept
                  offset.value = withSpring({
                    x: offset.value.x + screenWidth + 100,
                    y: offset.value.y,
                  });
                  rotateZ.value = withSpring(
                    rotateZ.value === "0deg" ? "45deg" : "0deg"
                  );
                } else {
                  offset.value = withSpring({
                    x: 0,
                    y: 0,
                  });
                  rotateZ.value = withSpring((rotateZ.value = "0deg"));
                }
              })}
            >
              <View className="relative h-[350px] w-[270px]">
                {images.map((image, index) => (
                  <Animated.View
                    key={index}
                    className={`absolute h-[350px] w-[270px] z-${index}`}
                    style={index === activeIndex ? animatedStyles : {}}
                  >
                    <View
                      className={`bg-${image}-500 h-[350px] w-[270px] transition-transform duration-700 ease-in-out`}
                    >
                      <Text>Image</Text>
                    </View>
                  </Animated.View>
                ))}
                {/* <Animated.View
                  className="absolute h-[350px] w-[270px]"
                  style={animatedStyles}
                >
                  <View className="bg-red-500 h-[350px] w-[270px] transition-transform duration-700 ease-in-out">
                    <Text>Image</Text>
                  </View>
                </Animated.View>
                <Animated.View
                  className="absolute h-[350px] w-[270px]"
                  style={animatedStyles}
                >
                  <View className="bg-green-500 h-[350px] w-[270px] transition-transform duration-700 ease-in-out">
                    <Text>Image</Text>
                  </View>
                </Animated.View>
                <Animated.View
                  className="absolute h-[350px] w-[270px]"
                  style={animatedStyles}
                >
                  <View className="bg-blue-500 h-[350px] w-[270px] transition-transform duration-700 ease-in-out">
                    <Text>Image</Text>
                  </View>
                </Animated.View> */}
              </View>
            </GestureDetector>
          </View>
          <View className="flex flex-row justify-between w-[350px] px-10 my-5">
            <Button
              className="rounded-full"
              onPress={() => {
                offset.value = withSpring({
                  x: offset.value.x - screenWidth - 100,
                  y: offset.value.y,
                });
                rotateZ.value = withSpring(
                  rotateZ.value === "0deg" ? "-45deg" : "0deg",
                  {},
                  (finished) => {
                    if (finished) {
                      runOnJS(setImages)(["red", "green", "blue"]);
                    }
                  }
                );
                setTimeout(() => {
                  setActiveIndex((prev) => {
                    if (prev < images.length - 1) {
                      return prev + 1;
                    }
                    return 0;
                  });
                  offset.value = {
                    x: 0,
                    y: 0,
                  };
                  rotateZ.value = rotateZ.value = "0deg";
                }, 500);
              }}
            >
              <Ionicons name="close" size={22} color="red" />
            </Button>
            <Button
              className="rounded-full"
              onPress={() => {
                offset.value = withSpring({
                  x: offset.value.x,
                  y: offset.value.y - screenHeight - 100,
                });
              }}
            >
              <Ionicons name="play-forward" size={22} color="blue" />
            </Button>
            <Button
              className="rounded-full"
              onPress={() => {
                offset.value = withSpring({
                  x: 0,
                  y: 0,
                });
                rotateZ.value = withSpring((rotateZ.value = "0deg"));
                setImages(["red", "green", "blue"]);
              }}
            >
              <Ionicons name="refresh" size={22} color="blue" />
            </Button>
            <Button
              className="rounded-full"
              onPress={() => {
                offset.value = withSpring({
                  x: offset.value.x + screenWidth + 100,
                  y: offset.value.y,
                });
                rotateZ.value = withSpring(
                  rotateZ.value === "0deg" ? "45deg" : "0deg"
                );
              }}
            >
              <Ionicons name="checkmark" size={22} color="green" />
            </Button>
          </View>
          <View className="flex items-center justify-center w-[350px]">
            {/* <Alert icon={Terminal} className="max-w-xl">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can use a terminal to run commands on your computer.
            </AlertDescription>
          </Alert> */}
          </View>
        </View>
        <View className="">
          <Text className="text-left text-gray-500">Label</Text>
          <Text className="text-left text-foreground text-xl">Item Label</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
