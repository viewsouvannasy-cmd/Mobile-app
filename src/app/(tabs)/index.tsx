import { FlatList, Text, View } from "react-native";

import TabBackground from "@/components/TabBackground";

import CompetedItem from "@/components/list/CompetedItem";
import ListHeroSection from "@/components/list/ListHeroSection";

import useGroceryStore from "@/store/grocery-store";

import ItemGrocery from "@/components/list/ItemGrocery";

export default function MainScreen() {
  const { items } = useGroceryStore();

  const pandingItem = items.filter((item) => !item.purchased);

  return (
    <FlatList
      className="flex-1 bg-background"
      data={pandingItem}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ItemGrocery item={item} />}
      contentContainerStyle={{ gap: 10, padding: 13 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View className="gap-4">
          <TabBackground />
          <ListHeroSection />
          <View className="flex-row justify-between ">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              shopping item
            </Text>
            <Text className="text-sm font-semibold  tracking-[1px] text-muted-foreground">
              {pandingItem.length} active
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompetedItem />}
    />
  );
}
