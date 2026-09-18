import { Pressable, Text, View } from "react-native";

import { useClerk } from "@clerk/expo";

import "@/global.css";

export default function MainScreen() {
  const { signOut } = useClerk();

  return (
    <View className="items-center justify-center flex-1 ">
      <Text className="text-[2rem] font-bold text-blue-600">Welcome</Text>
      <Pressable className="p-3 bg-white " onPress={() => signOut()}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
