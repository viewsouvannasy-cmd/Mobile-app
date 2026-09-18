import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useSocialAuth from "@/hook/useSocialAuth";

import { FontAwesome } from "@expo/vector-icons";

const SignIn = () => {
  const { loadingStrategy, handdleSocialAuth } = useSocialAuth();

  const isGoogleClick = loadingStrategy === "oauth_google";
  const isGitHubClick = loadingStrategy === "oauth_github";
  const isAppleClick = loadingStrategy === "oauth_apple";

  const isLoading =
    isAppleClick || isGitHubClick || isGoogleClick ? true : false;

  return (
    <SafeAreaView
      className="flex-1 bg-primary dark:bg-secondary"
      edges={["top"]}
    >
      <View className="absolute left-[-50px] top-[50px]  h-[180px] w-[180px] rounded-full bg-primary/80 dark:bg-background/40 "></View>
      <View className="absolute right-[-50px] top-[150px] h-[210px] w-[210px] rounded-full bg-primary/80 dark:bg-background/40 "></View>

      <View className="px-6 pt-4">
        <Text className="font-mono text-5xl font-bold tracking-tighter text-center text-primary-foreground dark:text-foreground ">
          GROCIFY
        </Text>
        <Text className="text-center text-primary-foreground/80 dark:text-foreground/75">
          Plan smarter. Shop happier
        </Text>

        <View className="mt-8 h-[300px] rounded-3xl border border-white/20 bg-white/10 p-2">
          <Image
            source={require("../../../assets/images/auth.png")}
            contentFit="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      <View className="mt-8 flex-1 rounded-t-[36px] bg-card p-5">
        <View className="self-center px-3 py-1 rounded-full bg-secondary">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
            Welcome Back
          </Text>
        </View>

        <Text className="mt-2 text-sm leading-5 text-center text-muted-foreground">
          Choose a social provider and jump right into your personlized grocery
          experience.
        </Text>

        <View className="items-center gap-3 mt-5">
          <Pressable
            className="flex-row items-center w-full gap-2 p-3 border rounded-2xl border-border"
            onPress={() => handdleSocialAuth("oauth_google")}
            disabled={isLoading}
          >
            <View className=" h-[22px] w-[22px] items-center justify-center rounded-full bg-white p-0.5 ">
              <Image
                source={require("../../../assets/images/google.png")}
                contentFit="contain"
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <Text className="flex-1 text-lg font-semibold text-card-foreground">
              {isGoogleClick ? "Connect Google..." : "Continue with Google"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e56" />
          </Pressable>

          <Pressable
            className="flex-row items-center w-full gap-2 p-3 border rounded-2xl border-border"
            onPress={() => handdleSocialAuth("oauth_github")}
            disabled={isLoading}
          >
            <View className=" h-[22px] w-[22px] items-center justify-center  rounded-full bg-white ">
              <FontAwesome name="github" size={22} color="#111" />
            </View>
            <Text className="flex-1 text-lg font-semibold text-card-foreground">
              {isGitHubClick ? "Connect GitHub..." : "Continue with GitHub"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e56" />
          </Pressable>

          <Pressable
            className="flex-row items-center w-full gap-2 p-3 bg-white border rounded-2xl border-border"
            onPress={() => handdleSocialAuth("oauth_apple")}
            disabled={isLoading}
          >
            <View className=" h-[22px] w-[22px] items-center justify-center  rounded-full bg-white ">
              <FontAwesome name="apple" size={18} color="#111" />
            </View>
            <Text className="flex-1 text-lg font-semibold text-black">
              {isAppleClick ? "Connect Apple..." : "Continue with Apple"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e56" />
          </Pressable>

          <Text className="mt-3 text-sm leading-5 text-center text-muted-foreground">
            By continuing, you argree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
