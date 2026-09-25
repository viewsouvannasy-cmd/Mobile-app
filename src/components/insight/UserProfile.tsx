import { useClerk, useUser } from "@clerk/expo";
import { Image, Pressable, Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";

const UserProfile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const email = user?.primaryEmailAddress?.emailAddress;
  const dsiplayName = email?.split("@")[0];

  return (
    <View className="flex-row items-center justify-between p-4 mt-3 border rounded-3xl border-border bg-card">
      <View className="flex-row items-center gap-3">
        <View className="overflow-hidden rounded-full size-12">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View>
          <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
            sign in as
          </Text>
          <Text className="text-lg font-bold text-foreground">
            {dsiplayName}
          </Text>
          <Text className="text-sm text-muted-foreground">{email}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => signOut()}
        className="items-center justify-center h-9 w-9 rounded-xl bg-destructive"
      >
        <FontAwesome6 name="right-from-bracket" size={13} color="#d45f58" />
      </Pressable>
    </View>
  );
};

export default UserProfile;
