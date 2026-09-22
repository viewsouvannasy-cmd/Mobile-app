import { ScrollView, Text, View } from "react-native";

import TabBackground from "@/components/TabBackground";

import ListHeroSection from "@/components/list/ListHeroSection";

import useGroceryStore from "@/store/grocery-store";

import "@/global.css";

import ItemGrocery from "@/components/list/ItemGrocery";

export default function MainScreen() {
  const { items } = useGroceryStore();

  const isPandingItem = items.filter((item) => !item.purchased);

  return (
    <ScrollView
      className="gap-4 p-5 bg-background"

      showsVerticalScrollIndicator={false}
    >
      <TabBackground />

      <ListHeroSection />

      <View className="flex-row justify-between mt-3 ">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          shopping item
        </Text>
        <Text className="text-sm font-semibold  tracking-[1px] text-muted-foreground">
          {isPandingItem.length} active
        </Text>
      </View>

      <View className="gap-2 mt-1">
        {isPandingItem.map((item) => {
          return <ItemGrocery key={item.id} item={item} />;
        })}
      </View>
    </ScrollView>
  );
}
