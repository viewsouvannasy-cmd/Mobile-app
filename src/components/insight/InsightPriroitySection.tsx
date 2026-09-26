import useGroceryStore from "@/store/grocery-store";
import { Text, View } from "react-native";

const InsightPriroitySection = () => {
  const { items } = useGroceryStore();

  const highPriorityItems = items.filter(
    (item) => item.priority === "high",
  ).length;

  const highPriorityTone =
    highPriorityItems === 0
      ? "Everything critical is coverd."
      : "Handle these first for a smoother trip.";

  return (
    <View className="p-4 border rounded-3xl border-border bg-card">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-foreground">
          High priroity remaining
        </Text>
        <View
          className={`rounded-full px-3 py-1 ${highPriorityItems ? "bg-priority-high" : "bg-priority-low"}`}
        >
          <Text
            className={`text-xs font-bold uppercase ${highPriorityItems ? "text-priority-high-foreground" : "text-priority-low-foreground"}`}
          >
            {highPriorityItems ? "Action" : "Clear"}
          </Text>
        </View>
      </View>
      <Text className="mt-1 text-3xl font-extrabold text-foreground">
        {highPriorityItems}
      </Text>
      <Text className="mt-1 text-sm text-muted-foreground">
        {highPriorityTone}
      </Text>
    </View>
  );
};

export default InsightPriroitySection;
