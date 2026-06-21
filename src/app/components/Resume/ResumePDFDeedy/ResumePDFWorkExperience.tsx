import { View } from "@react-pdf/renderer";
import {
  ResumePDFDeedySection,
  ResumePDFDeedyBulletList,
  ResumePDFDeedyText,
} from "components/Resume/ResumePDFDeedy/common";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

export const ResumePDFDeedyWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFDeedySection themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        // Hide company name if it is the same as the previous company
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            {!hideCompanyName && (
              <ResumePDFDeedyText bold={true}>{company}</ResumePDFDeedyText>
            )}
            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: hideCompanyName
                  ? "-" + spacing["1"]
                  : spacing["1.5"],
              }}
            >
              <ResumePDFDeedyText>{jobTitle}</ResumePDFDeedyText>
              <ResumePDFDeedyText>{date}</ResumePDFDeedyText>
            </View>
            <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
              <ResumePDFDeedyBulletList items={descriptions} />
            </View>
          </View>
        );
      })}
    </ResumePDFDeedySection>
  );
};
