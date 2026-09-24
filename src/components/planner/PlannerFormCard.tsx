import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import useGroceryStore from "@/store/grocery-store";

import type { GroceryCategory, GroceryPriority } from "@/store/grocery-store";

const categories: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Bakery",
  "Pantry",
  "Snacks",
];
const priorities: GroceryPriority[] = ["low", "medium", "high"];

const categroiesIcon = {
  Produce: "leaf",
  Dairy: "cow",
  Bakery: "bread-slice",
  Pantry: "box-open",
  Snacks: "cookie-bite",
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();

  const [inputNameItem, setInputNameItem] = useState<string>("");

  const [inputQuantity, setInputQuantity] = useState<string>("1");

  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");

  const canCreate = inputNameItem.trim().length > 0;

  function handlerCreateItem() {
    addItem({
      name: inputNameItem.trim(),
      category,
      quantity: Number(inputQuantity),
      priority,
    });

    setInputNameItem("");
    setInputQuantity("1");
    setCategory("Produce");
    setPriority("medium");
  }

  function handlerQuantityChange(value: string) {
    setInputQuantity(value.replace(/[^0-9]/g, ""));
  }

  return (
    <View className="gap-3 p-4 border rounded-3xl border-border bg-card">
      <View>
        <Text className="text-sm font-semibold text-foreground">Item name</Text>
        <View className="flex-row items-center gap-2 pl-3 mt-2 text-base border rounded-2xl border-border bg-muted">
          <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />

          <TextInput
            value={inputNameItem}
            onChangeText={setInputNameItem}
            placeholder="Ex: Blurberriesd"
            className="flex-1 py-3 pr-3 text-base text-foreground"
          />
        </View>
      </View>

      <View>
        <Text className="text-sm font-semibold text-foreground">Quantity</Text>
        <View className="flex-row items-center gap-2 px-4 py-3 mt-2 text-base border rounded-2xl border-border bg-muted">
          <FontAwesome6 name="hashtag" size={13} color="#5b7567" />

          <TextInput
            value={inputQuantity}
            keyboardType="number-pad"
            onChangeText={handlerQuantityChange}
            placeholder="1"
            className="flex-1 text-base text-foreground"
          />
        </View>
      </View>

      <View>
        <Text className="text-sm font-semibold text-foreground">
          Categories
        </Text>
        <View className="flex-row flex-wrap gap-2 mt-2">
          {categories.map((item) => {
            const active = category === item;
            return (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                className={`flex-row items-center gap-2 rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-secondary"}`}
              >
                <FontAwesome6
                  name={categroiesIcon[item]}
                  size={12}
                  color={active ? "#fff" : "#486856"}
                />
                <Text
                  className={`text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View>
        <Text className="text-sm font-semibold text-foreground">
          Proroities
        </Text>
        <View className="flex-row flex-wrap gap-2 mt-2">
          {priorities.map((item) => {
            const active = priority === item;
            const icon =
              item === "high"
                ? "bolt"
                : item === "medium"
                  ? "compass"
                  : "seedling";
            return (
              <Pressable
                key={item}
                onPress={() => setPriority(item)}
                className={`flex-1 flex-row items-center justify-center gap-2 rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-secondary"}`}
              >
                <FontAwesome6
                  name={icon}
                  size={12}
                  color={active ? "#fff" : "#486856"}
                />
                <Text
                  className={`text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        className={` mt-5 flex-row items-center justify-center gap-2.5 rounded-2xl py-3 ${canCreate ? "bg-primary" : "bg-muted"}`}
        onPress={handlerCreateItem}
        disabled={!canCreate}
      >
        <FontAwesome6
          name="plus"
          size={14}
          color={canCreate ? "#fff" : "#7a9386"}
        />
        <Text
          className={`text-bas font-semibold ${canCreate ? "text-primary-foreground" : "text-secondary-foreground"}`}
        >
          Add to Grocery List
        </Text>
      </Pressable>

      {error && (
        <View className="px-3 py-2 mt-3 border rounded-2xl border-destructive bg-destructive">
          <Text className="text-sm text-center text-white uppercase">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PlannerFormCard;
