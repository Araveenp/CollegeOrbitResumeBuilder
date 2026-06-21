import { View } from "@react-pdf/renderer";
import {
  ResumePDFClassicSection,
  ResumePDFClassicBulletList,
} from "components/Resume/ResumePDFClassic/common";
import { styles } from "components/Resume/ResumePDFClassic/styles";
import type { ResumeCustom } from "lib/redux/types";

export const ResumePDFClassicCustom = ({
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  custom: ResumeCustom;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions } = custom;

  return (
    <ResumePDFClassicSection themeColor={themeColor} heading={heading}>
      <View style={{ ...styles.flexCol }}>
        <ResumePDFClassicBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFClassicSection>
  );
};
