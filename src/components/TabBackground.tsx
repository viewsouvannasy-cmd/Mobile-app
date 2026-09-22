import { View } from "react-native";

const TabBackground = () => {
  return (
    <>
      <View
        pointerEvents="none"
        className="absolute -left-[100px] -top-12 h-64 w-64 rounded-full bg-accent "
      />

      <View
        pointerEvents="none"
        className="absolute -right-[95px] top-20 h-[250px] w-[250px] rounded-full bg-secondary"
      />
    </>
  );
};

export default TabBackground;
