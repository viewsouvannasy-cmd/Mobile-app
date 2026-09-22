import type { GroceryItem } from "@/store/grocery-store";
import { Pressable, Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";

import useGroceryStore from "@/store/grocery-store";

const priorityPillBg = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const priorityPillText = {
  low: "text-priority-low-foreground",
  medium: "text-priority-medium-foreground",
  high: "text-priority-high-foreground",
};

const ItemGrocery = ({ item }: { item: GroceryItem }) => {
  const { togglePurchased, updateQuantity, removeItem } = useGroceryStore();

  return (
    <View className="p-4 border rounded-3xl border-border bg-card">
      <View className="flex-row items-start gap-3">
        <Pressable
          onPress={() => togglePurchased(item.id, !item.purchased)}
          className="items-start justify-center mt-1 border rounded-full size-6 border-border bg-card"
        ></Pressable>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-card-foreground">
              {item.name}
            </Text>
            <View
              className={`px-2 py-1 ${priorityPillBg[item.priority]} rounded-full `}
            >
              <Text
                className={`text-xs ${priorityPillText[item.priority]} font-bold uppercase`}
              >
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="self-start px-3 py-1 mt-1 rounded-full bg-secondary">
            <Text className="text-xs font-semibold text-secondary-foreground">
              {item.category}
            </Text>
          </View>

          <View className="flex-row items-center gap-4 mt-3">
            <Pressable
              onPress={() => {
                updateQuantity(item.id, item.quantity - 1);
              }}
              className="items-center justify-center w-8 h-8 border rounded-xl border-border bg-muted"
            >
              <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
            </Pressable>
            <Text className="text-base font-semibold text-foreground">
              {item.quantity}
            </Text>
            <Pressable
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="items-center justify-center w-8 h-8 border rounded-xl border-border bg-muted"
            >
              <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => removeItem(item.id)}
          className="p-2 rounded-lg bg-destructive"
        >
          <FontAwesome6 name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default ItemGrocery;
