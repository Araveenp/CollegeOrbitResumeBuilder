import { View } from "@react-pdf/renderer";
import {
  ResumePDFClassicSection,
  ResumePDFClassicBulletList,
  ResumePDFClassicText,
} from "components/Resume/ResumePDFClassic/common";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFClassicProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFClassicSection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, descriptions }, idx) => (
        <View key={idx}>
          <View
            style={{
              ...styles.flexRowBetween,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFClassicText bold={true}>{project}</ResumePDFClassicText>
            <ResumePDFClassicText>{date}</ResumePDFClassicText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
            <ResumePDFClassicBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFClassicSection>
  );
};
