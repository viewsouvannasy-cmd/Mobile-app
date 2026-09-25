import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

import useGroceryStore from "@/store/grocery-store";

const InsightStatusSection = () => {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased).length;
  const competedItems = items.length - pendingItems;

  const competeRate = Math.floor((competedItems * 100) / items.length);

  return (
    <View className="gap-3">
      <View className="flex-1 flex-row gap-2.5">
        <View className="flex-1 p-4 border bg-4 rounded-3xl border-border bg-card">
          <View className="items-center justify-center w-8 h-8 rounded-xl bg-primary">
            <FontAwesome6 name="clock" size={13} color="#fff" />
          </View>
          <Text className="tracking[1px] mt-3 text-xs uppercase text-muted-foreground">
            pending
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">
            {pendingItems}
          </Text>
        </View>

        <View className="flex-1 p-4 border bg-4 rounded-3xl border-border bg-card">
          <View className="items-center justify-center w-8 h-8 rounded-xl bg-primary">
            <FontAwesome6 name="check" size={13} color="#fff" />
          </View>
          <Text className="tracking[1px] mt-3 text-xs uppercase text-muted-foreground">
            completed
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">
            {competedItems}
          </Text>
        </View>

        <View className="flex-1 p-4 border bg-4 rounded-3xl border-border bg-card">
          <View className="items-center justify-center w-8 h-8 rounded-xl bg-primary">
            <FontAwesome6 name="layer-group" size={13} color="#fff" />
          </View>
          <Text className="tracking[1px] mt-3 text-xs uppercase text-muted-foreground">
            total
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">
            {items.length}
          </Text>
        </View>
      </View>

      <View className="gap-3 p-4 border rounded-3xl border-border bg-card ">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-foreground">
            Completion rate
          </Text>
          <Text className="text-sm font-semibold text-primary">
            {competeRate}%
          </Text>
        </View>

        <View className="h-4 overflow-hidden rounded-full bg-secondary ">
          <View
            className="h-full rounded-full  bg-primary"
            style={{ width: `${competeRate}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default InsightStatusSection;
