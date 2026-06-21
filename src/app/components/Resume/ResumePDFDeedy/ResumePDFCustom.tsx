import { View } from "@react-pdf/renderer";
import {
  ResumePDFDeedySection,
  ResumePDFDeedyBulletList,
} from "components/Resume/ResumePDFDeedy/common";
import { styles } from "components/Resume/ResumePDFDeedy/styles";
import type { ResumeCustom } from "lib/redux/types";

export const ResumePDFDeedyCustom = ({
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
    <ResumePDFDeedySection themeColor={themeColor} heading={heading}>
      <View style={{ ...styles.flexCol }}>
        <ResumePDFDeedyBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFDeedySection>
  );
};
