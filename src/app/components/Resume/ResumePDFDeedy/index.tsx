import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import { ResumePDFDeedyProfile } from "components/Resume/ResumePDFDeedy/ResumePDFProfile";
import { ResumePDFDeedyWorkExperience } from "components/Resume/ResumePDFDeedy/ResumePDFWorkExperience";
import { ResumePDFDeedyEducation } from "components/Resume/ResumePDFDeedy/ResumePDFEducation";
import { ResumePDFDeedyProject } from "components/Resume/ResumePDFDeedy/ResumePDFProject";
import { ResumePDFDeedySkills } from "components/Resume/ResumePDFDeedy/ResumePDFSkills";
import { ResumePDFDeedyCustom } from "components/Resume/ResumePDFDeedy/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFDeedyErrorMessage } from "components/Resume/ResumePDFDeedy/common/SuppressResumePDFErrorMessage";
import { ResumePDFDeedySection, ResumePDFDeedyText } from "components/Resume/ResumePDFDeedy/common";

export const ResumePDFDeedy = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = resume;
  const { name } = profile;
  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    formToShow,
    formsOrder,
    showBulletPoints,
  } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFDeedyWorkExperience heading={formToHeading["workExperiences"]} workExperiences={workExperiences} themeColor={themeColor} />
    ),
    educations: () => (
      <ResumePDFDeedyEducation heading={formToHeading["educations"]} educations={educations} themeColor={themeColor} showBulletPoints={showBulletPoints["educations"]} />
    ),
    projects: () => (
      <ResumePDFDeedyProject heading={formToHeading["projects"]} projects={projects} themeColor={themeColor} />
    ),
    skills: () => (
      <ResumePDFDeedySkills heading={formToHeading["skills"]} skills={skills} themeColor={themeColor} showBulletPoints={showBulletPoints["skills"]} />
    ),
    custom: () => (
      <ResumePDFDeedyCustom heading={formToHeading["custom"]} custom={custom} themeColor={themeColor} showBulletPoints={showBulletPoints["custom"]} />
    ),
  };

  return (
    <>
      <Document title={`${name} Resume`} author={name} producer={"College Orbit Resume"}>
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
            height: isPDF ? undefined : "max-content",
          }}
        >
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[20]}`,
              paddingTop: spacing[10],
            }}
          >
            <ResumePDFDeedyProfile
              profile={profile}
              themeColor={themeColor}
              isPDF={isPDF}
            />
            {profile.summary && (
              <ResumePDFDeedySection heading="SUMMARY">
                <ResumePDFDeedyText>{profile.summary}</ResumePDFDeedyText>
              </ResumePDFDeedySection>
            )}
            
            <View style={{ ...styles.flexRow, marginTop: spacing[4], gap: spacing[4] }}>
              {/* Left Column */}
              <View style={{ ...styles.flexCol, width: "35%", gap: spacing[4] }}>
                {formToShow.educations && formTypeToComponent.educations()}
                {formToShow.skills && formTypeToComponent.skills()}
              </View>

              {/* Right Column */}
              <View style={{ ...styles.flexCol, width: "65%", gap: spacing[4] }}>
                {formToShow.workExperiences && formTypeToComponent.workExperiences()}
                {formToShow.projects && formTypeToComponent.projects()}
                {formToShow.custom && formTypeToComponent.custom()}
              </View>
            </View>
          </View>
        </Page>
      </Document>
      <SuppressResumePDFDeedyErrorMessage />
    </>
  );
};
