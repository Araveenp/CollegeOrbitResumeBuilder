import { View } from "@react-pdf/renderer";
import {
  ResumePDFDeedySection,
  ResumePDFDeedyBulletList,
  ResumePDFDeedyText,
} from "components/Resume/ResumePDFDeedy/common";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFDeedyProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFDeedySection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, descriptions }, idx) => (
        <View key={idx}>
          <View
            style={{
              ...styles.flexRowBetween,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFDeedyText bold={true}>{project}</ResumePDFDeedyText>
            <ResumePDFDeedyText>{date}</ResumePDFDeedyText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
            <ResumePDFDeedyBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFDeedySection>
  );
};
