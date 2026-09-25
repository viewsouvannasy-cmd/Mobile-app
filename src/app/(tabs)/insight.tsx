import { ScrollView } from "react-native";

import TabBackground from "@/components/TabBackground";

import InsightCategory from "@/components/insight/InsightCategory";
import InsightStatusSection from "@/components/insight/InsightStatusSection";
import UserProfile from "@/components/insight/UserProfile";

const Insight = () => {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 13, paddingTop: 0, gap: 13 }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <TabBackground />

      <UserProfile />
      <InsightStatusSection />
      <InsightCategory />
    </ScrollView>
  );
};

export default Insight;
