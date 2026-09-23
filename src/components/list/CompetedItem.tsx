import { Pressable, Text, View } from "react-native";

import useGroceryStore from "@/store/grocery-store";

import { FontAwesome6 } from "@expo/vector-icons";

const CompetedItem = () => {
  const { togglePurchased, removeItem, items } = useGroceryStore();

  const completedItem = items.filter((item) => item.purchased);

  return (
    <View className="p-4 border rounded-3xl border-border bg-secondary">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        CompetedItem
      </Text>

      {completedItem.map((item) => {
        return (
          <View
            key={item.id}
            className="flex-row items-center justify-between px-3 py-2 mt-3 border rounded-2xl border-border bg-card"
          >
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => togglePurchased(item.id, !item.purchased)}
                className="items-center justify-center rounded-full h-7 w-7 bg-success"
              >
                <FontAwesome6 name="check" size={12} color="#ffffff" />
              </Pressable>
              <Text className="text-base line-through text-muted-foreground">
                {item.name}
              </Text>
            </View>
            <Pressable
              onPress={() => removeItem(item.id)}
              className="p-2 rounded-lg bg-destructive"
            >
              <FontAwesome6 name="trash" size={13} color="#d45f58" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default CompetedItem;
