import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>();
  const { startSSOFlow } = useSSO();

  const handdleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {
    if (loadingStrategy) {
      return;
    }

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert("Sign-up did not complete. Please trt again");
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth", error);
      Alert.alert("Error to sign up. Please try again");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { loadingStrategy, handdleSocialAuth };
};

export default useSocialAuth;
