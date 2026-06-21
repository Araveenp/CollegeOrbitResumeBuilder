import { View } from "@react-pdf/renderer";
import {
  ResumePDFClassicBulletList,
  ResumePDFClassicSection,
  ResumePDFClassicText,
} from "components/Resume/ResumePDFClassic/common";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFClassicEducation = ({
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
    <ResumePDFClassicSection themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          const showDescriptions = descriptions.join() !== "";
          return (
            <View key={idx} style={{ marginTop: idx > 0 ? spacing["1"] : 0 }}>
              <View style={{ ...styles.flexRow, alignItems: "flex-start" }}>
                <View style={{ width: "20%" }}>
                  <ResumePDFClassicText>{date}</ResumePDFClassicText>
                </View>
                <View style={{ width: "60%" }}>
                  <ResumePDFClassicText>
                    {degree} {school && `at `}
                    {school && <ResumePDFClassicText bold={true}>{school}</ResumePDFClassicText>}
                  </ResumePDFClassicText>
                </View>
                <View style={{ width: "20%", textAlign: "right" }}>
                  {gpa && <ResumePDFClassicText>(GPA: {gpa})</ResumePDFClassicText>}
                </View>
              </View>
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1"], paddingLeft: "20%" }}>
                  <ResumePDFClassicBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFClassicSection>
  );
};
