import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

const Home = () => {
  const [parentBounds, setParentBounds] = useState({ width: 0, height: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const rotateZ = useSharedValue("0deg");
  const scale = useSharedValue(1);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [images, setImages] = useState([
    { name: "red", color: "bg-red-500" },
    { name: "green", color: "bg-green-500" },
    { name: "blue", color: "bg-blue-500" },
  ]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { rotateZ: rotateZ.value },
        { scale: scale.value },
      ],
    };
  });

  const updateList = () => {
    const temp = images.slice();
    const last = temp.pop();
    if (last) temp.unshift(last);
    setImages(temp);
  };

  const handleHardReset = () => {
    offset.value = {
      x: 0,
      y: 0,
    };
    rotateZ.value = rotateZ.value = "0deg";
  };

  const handleReject = () => {
    offset.value = withSpring({
      x: offset.value.x - screenWidth - 100,
      y: offset.value.y,
    });
    rotateZ.value = withSpring(
      rotateZ.value === "0deg" ? "-45deg" : "0deg",
      {},
      (finished) => {
        if (finished) {
          runOnJS(handleHardReset)();
          runOnJS(updateList)();
        }
      }
    );
  };

  const handleSkip = () => {
    offset.value = withSpring(
      {
        x: offset.value.x,
        y: offset.value.y - screenHeight - 100,
      },
      {},
      (finished) => {
        if (finished) {
          runOnJS(handleHardReset)();
          runOnJS(updateList)();
        }
      }
    );
  };

  const handleUnskip = () => {
    offset.value = withSpring(
      {
        x: offset.value.x,
        y: offset.value.y + screenHeight + 100,
      },
      {},
      (finished) => {
        if (finished) {
          runOnJS(handleHardReset)();
          runOnJS(updateList)();
        }
      }
    );
  };

  const handleApprove = () => {
    offset.value = withSpring({
      x: offset.value.x + screenWidth + 100,
      y: offset.value.y,
    });
    rotateZ.value = withSpring(
      rotateZ.value === "0deg" ? "45deg" : "0deg",
      {},
      (finished) => {
        if (finished) {
          runOnJS(handleHardReset)();
          runOnJS(updateList)();
        }
      }
    );
  };

  const handleReset = () => {
    offset.value = withSpring({
      x: 0,
      y: 0,
    });
    rotateZ.value = withSpring((rotateZ.value = "0deg"));
  };

  return (
    <SafeAreaView className="w-screen h-screen px-6 py-4">
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
              gesture={Gesture.Simultaneous(
                Gesture.Pan()
                  .onStart(() => {
                    scale.value = withSpring(1.1);
                  })
                  .onUpdate((e) => {
                    offset.value = {
                      x: e.translationX,
                      y: e.translationY,
                    };

                    const halfWidth = parentBounds.width / 2;
                    const halfHeight = parentBounds.height / 2;

                    if (e.translationY < -halfHeight) {
                      //skip
                      runOnJS(handleSkip)();
                    } else if (e.translationY > halfHeight) {
                      //unskip
                      runOnJS(handleUnskip)();
                    } else if (e.translationX < -halfWidth) {
                      //reject
                      runOnJS(handleReject)();
                    } else if (e.translationX > halfWidth) {
                      //approve
                      runOnJS(handleApprove)();
                    } else {
                      //reset
                      runOnJS(handleReset)();
                    }
                  })
                  .onEnd(() => {
                    scale.value = withSpring(1);
                  }),
                Gesture.Fling()
                  .direction(Directions.UP)
                  .onEnd(() => {
                    runOnJS(handleSkip)();
                  }),
                Gesture.Fling()
                  .direction(Directions.DOWN)
                  .onEnd(() => {
                    runOnJS(handleUnskip)();
                  }),
                Gesture.Fling()
                  .direction(Directions.LEFT)
                  .onEnd(() => {
                    runOnJS(handleReject)();
                  }),
                Gesture.Fling()
                  .direction(Directions.RIGHT)
                  .onEnd(() => {
                    runOnJS(handleApprove)();
                  })
              )}
            >
              <View className="relative h-[350px] w-[270px]">
                {images.map((image, index) => (
                  <Animated.View
                    key={index}
                    className={`absolute h-[350px] w-[270px]`}
                    style={index === images.length - 1 ? animatedStyles : {}}
                  >
                    <View
                      className={`${image?.color} h-[350px] w-[270px] transition-transform duration-700 ease-in-out`}
                    >
                      <Text>{image?.name}</Text>
                      <View className="absolute flex items-center justify-center w-full h-full"></View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </GestureDetector>
          </View>
          <View className="flex flex-row justify-between w-[350px] px-10 my-5">
            <Button
              className="rounded-full bg-secondary z-10"
              onPress={handleReject}
            >
              <Ionicons name="close" size={22} color="red" />
            </Button>
            <Button className="rounded-full bg-secondary" onPress={handleSkip}>
              <Ionicons name="play-forward" size={22} color="blue" />
            </Button>
            <Button
              className="rounded-full bg-secondary"
              onPress={() => {
                handleReset();
                setImages([
                  { name: "red", color: "bg-red-500" },
                  { name: "green", color: "bg-green-500" },
                  { name: "blue", color: "bg-blue-500" },
                ]);
              }}
            >
              <Ionicons name="refresh" size={22} color="blue" />
            </Button>
            <Button
              className="rounded-full bg-secondary"
              onPress={handleApprove}
            >
              <Ionicons name="checkmark" size={22} color="green" />
            </Button>
          </View>
          <View className="flex items-center justify-center w-[350px]"></View>
        </View>
        <View className="">
          <Text className="text-left text-gray-500">Label</Text>
          <Text className="text-left text-foreground text-xl">
            {images[images.length - 1].name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
