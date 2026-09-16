import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { Text, View } from "react-native";

import "@/global.css";

export default function MainScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  if (!isLoaded) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!isSignedIn) {
    router.push("/(auth)/sign-in");
  }

  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-[2rem] font-bold text-blue-600">Welcome</Text>
    </View>
  );
}
