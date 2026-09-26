import { ScrollView } from "react-native";

import TabBackground from "@/components/TabBackground";

import InsightCategory from "@/components/insight/InsightCategory";
import InsightClearButton from "@/components/insight/InsightClearButton";
import InsightPriroitySection from "@/components/insight/InsightPriroitySection";
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

      <InsightPriroitySection />

      <InsightClearButton />
    </ScrollView>
  );
};

export default Insight;
