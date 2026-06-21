import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import { ResumePDFClassicProfile } from "components/Resume/ResumePDFClassic/ResumePDFProfile";
import { ResumePDFClassicWorkExperience } from "components/Resume/ResumePDFClassic/ResumePDFWorkExperience";
import { ResumePDFClassicEducation } from "components/Resume/ResumePDFClassic/ResumePDFEducation";
import { ResumePDFClassicProject } from "components/Resume/ResumePDFClassic/ResumePDFProject";
import { ResumePDFClassicSkills } from "components/Resume/ResumePDFClassic/ResumePDFSkills";
import { ResumePDFClassicCustom } from "components/Resume/ResumePDFClassic/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFClassicErrorMessage } from "components/Resume/ResumePDFClassic/common/SuppressResumePDFErrorMessage";
import { ResumePDFClassicSection, ResumePDFClassicText } from "components/Resume/ResumePDFClassic/common";

export const ResumePDFClassic = ({
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
      <ResumePDFClassicWorkExperience heading={formToHeading["workExperiences"]} workExperiences={workExperiences} themeColor={themeColor} />
    ),
    educations: () => (
      <ResumePDFClassicEducation heading={formToHeading["educations"]} educations={educations} themeColor={themeColor} showBulletPoints={showBulletPoints["educations"]} />
    ),
    projects: () => (
      <ResumePDFClassicProject heading={formToHeading["projects"]} projects={projects} themeColor={themeColor} />
    ),
    skills: () => (
      <ResumePDFClassicSkills heading={formToHeading["skills"]} skills={skills} themeColor={themeColor} showBulletPoints={showBulletPoints["skills"]} />
    ),
    custom: () => (
      <ResumePDFClassicCustom heading={formToHeading["custom"]} custom={custom} themeColor={themeColor} showBulletPoints={showBulletPoints["custom"]} />
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
            <ResumePDFClassicProfile
              profile={profile}
              themeColor={themeColor}
              isPDF={isPDF}
            />
            {profile.summary && (
              <ResumePDFClassicSection heading="SUMMARY">
                <ResumePDFClassicText>{profile.summary}</ResumePDFClassicText>
              </ResumePDFClassicSection>
            )}
            {showFormsOrder.map((form) => {
              const Component = formTypeToComponent[form];
              return <Component key={form} />;
            })}
          </View>
        </Page>
      </Document>
      <SuppressResumePDFClassicErrorMessage />
    </>
  );
};
