import { View } from "@react-pdf/renderer";
import {
  ResumePDFDeedyBulletList,
  ResumePDFDeedySection,
  ResumePDFDeedyText,
} from "components/Resume/ResumePDFDeedy/common";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFDeedyEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFDeedySection themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          const showDescriptions = descriptions.join() !== "";
          return (
            <View key={idx} style={{ marginTop: idx > 0 ? spacing["1"] : 0 }}>
              <View style={{ ...styles.flexRow, alignItems: "flex-start" }}>
                <View style={{ width: "20%" }}>
                  <ResumePDFDeedyText>{date}</ResumePDFDeedyText>
                </View>
                <View style={{ width: "60%" }}>
                  <ResumePDFDeedyText>
                    {degree} {school && `at `}
                    {school && <ResumePDFDeedyText bold={true}>{school}</ResumePDFDeedyText>}
                  </ResumePDFDeedyText>
                </View>
                <View style={{ width: "20%", textAlign: "right" }}>
                  {gpa && <ResumePDFDeedyText>(GPA: {gpa})</ResumePDFDeedyText>}
                </View>
              </View>
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1"], paddingLeft: "20%" }}>
                  <ResumePDFDeedyBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFDeedySection>
  );
};
