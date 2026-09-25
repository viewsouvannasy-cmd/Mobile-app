import TabBackground from "@/components/TabBackground";
import { Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";

import useGroceryStore from "@/store/grocery-store";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import PlannerFormCard from "@/components/planner/PlannerFormCard";
import PlannerImageHero from "@/components/planner/PlannerImageHero";

const Planner = () => {
  const { items, addItem } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased).length;
  const hightPriorityItems = items.filter(
    (item) => item.priority === "high",
  ).length;
  const units = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 13, paddingTop: 0, gap: 13 }}
      keyboardShouldPersistTaps="handled"
    >
      <TabBackground />

      <View className="gap-4 p-5 border rounded-3xl border-border bg-card/70">
        <View className="flex-row gap-1">
          <View className="flex-1">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-muted-foreground">
              Grocery planner
            </Text>
            <Text className="mt-1 text-3xl font-bold leading-9 text-foreground">
              Plan smarter, shop calmer
            </Text>
            <Text className="mt-2 text-sm leanding-5 text-muted-foreground">
              Organize your next grocery run with categories, quantities, and
              priority in one place
            </Text>
          </View>
          <View className="items-center self-start justify-center w-12 h-12 rounded-2xl bg-primary">
            <FontAwesome6
              name="wand-magic-sparkles"
              size={18}
              color="#ffffff"
            />
          </View>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 p-3 border rounded-2xl border-border bg-background/80">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Pending
            </Text>
            <Text className="text-xl font-bold mt-t text-foreground">
              {pendingItems}
            </Text>
          </View>

          <View className="p-3 border rounded-2xl border-border bg-background/80">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              hight priority
            </Text>
            <Text className="text-xl font-bold mt-t text-foreground">
              {hightPriorityItems}
            </Text>
          </View>

          <View className="flex-1 p-3 border rounded-2xl border-border bg-background/80">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              units
            </Text>
            <Text className="text-xl font-bold mt-t text-foreground">
              {units}
            </Text>
          </View>
        </View>
      </View>

      <PlannerImageHero />

      <View className="gap-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          build your list
        </Text>
        <Text className="text-sm text-muted-foreground">
          Add items with the right quantity, category, and urgency
        </Text>
      </View>

      <PlannerFormCard />
    </KeyboardAwareScrollView>
  );
};

export default Planner;
