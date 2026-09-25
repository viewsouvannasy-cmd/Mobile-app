import { Text, View } from "react-native";

import useGroceryStore from "@/store/grocery-store";

const categoryColors: Record<string, string> = {
  Produce: "#74c49a",
  Dairy: "#8ec5ff",
  Bakery: "#f3bc84",
  Pantry: "#b69cff",
  Snacks: "#f3a1bd",
};

const InsightCategory = () => {
  const { items } = useGroceryStore();

  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryEntire = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  return (
    <View className="gap-3 p-4 border rounded-3xl border-border bg-card">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-foreground">
          Items by category
        </Text>
        <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
          {categoryEntire.length} groups
        </Text>
      </View>
      {categoryEntire.map(([category, count]) => {
        const percent = Math.max(
          10,
          Math.floor((count * 100) / items?.length || 1),
        );
        return (
          <View key={category} className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-foreground">
                {category}
              </Text>
              <Text className="text-sm text-muted-foreground">{count}</Text>
            </View>
            <View className="h-3 overflow-hidden rounded-full bg-secondary">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: `${categoryColors[category]}`,
                }}
              ></View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default InsightCategory;
