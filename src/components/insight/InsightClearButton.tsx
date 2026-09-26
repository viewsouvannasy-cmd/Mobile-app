import useGroceryStore from "@/store/grocery-store";
import { Pressable, Text } from "react-native";

const InsightClearButton = () => {
  const { clearPurchased } = useGroceryStore();
  return (
    <Pressable onPress={clearPurchased} className="py-3 rounded-2xl bg-primary">
      <Text className="text-base font-semibold text-center text-primary-foreground">
        Clear competed items
      </Text>
    </Pressable>
  );
};

export default InsightClearButton;
