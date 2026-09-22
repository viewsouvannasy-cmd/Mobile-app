import { Text, View } from "react-native";

import useGroceryStore from "@/store/grocery-store";

const ListHeroSection = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const isPandingCount = items.length - completedCount;

  const completeRate = (completedCount / isPandingCount) * 100;

  return (
    <View className="p-5 rounded-3xl bg-primary">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
        Today
      </Text>
      <Text className="text-3xl font-bold text-primary-foreground">
        Your Grocery Board
      </Text>
      <Text className="text-sm font-semibold  tracking-[1px] text-primary-foreground/70">
        {isPandingCount} panding &#183; {completedCount} completed
      </Text>

      <View className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/50">
        <View
          className="h-full rounded-full bg-secondary"
          style={{ width: `${completeRate}%` }}
        />
      </View>
    </View>
  );
};

export default ListHeroSection;
