import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "components/Resume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage";

export const ResumePDF = ({
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
    template,
  } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience heading={formToHeading["workExperiences"]} workExperiences={workExperiences} themeColor={themeColor} />
    ),
    educations: () => (
      <ResumePDFEducation heading={formToHeading["educations"]} educations={educations} themeColor={themeColor} showBulletPoints={showBulletPoints["educations"]} />
    ),
    projects: () => (
      <ResumePDFProject heading={formToHeading["projects"]} projects={projects} themeColor={themeColor} />
    ),
    skills: () => (
      <ResumePDFSkills heading={formToHeading["skills"]} skills={skills} themeColor={themeColor} showBulletPoints={showBulletPoints["skills"]} />
    ),
    custom: () => (
      <ResumePDFCustom heading={formToHeading["custom"]} custom={custom} themeColor={themeColor} showBulletPoints={showBulletPoints["custom"]} />
    ),
  };

  const renderSections = (forms: ShowForm[]) => {
    return forms.map((form) => {
      const Component = formTypeToComponent[form];
      return <Component key={form} />;
    });
  };

  const baseStyle = {
    color: DEFAULT_FONT_COLOR,
    fontSize: fontSize + "pt",
    fontFamily,
  };

  const getLayout = () => {
    switch (template) {
      case "modern":
        // Two column layout
        const leftColForms = showFormsOrder.filter((f) => f === "skills" || f === "custom");
        const rightColForms = showFormsOrder.filter((f) => f !== "skills" && f !== "custom");
        return (
          <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={{ ...baseStyle, flexDirection: "row", backgroundColor: "#ffffff" }}>
            <View style={{ width: "35%", backgroundColor: "#f3f4f6", padding: spacing[6], borderRight: `1px solid ${themeColor}` }}>
              <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF} />
              <View style={{ marginTop: spacing[6] }}>
                {renderSections(leftColForms)}
              </View>
            </View>
            <View style={{ width: "65%", padding: spacing[6] }}>
              {renderSections(rightColForms)}
            </View>
          </Page>
        );

      case "professional":
        // Professional layout with serif font and clear dividers
        return (
          <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={{ ...baseStyle, fontFamily: "Merriweather", padding: `${spacing[8]} ${spacing[12]}` }}>
            <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF} />
            <View style={{ width: "100%", height: 2, backgroundColor: themeColor, marginVertical: spacing[4] }} />
            {renderSections(showFormsOrder)}
          </Page>
        );

      case "compact":
        // Dense layout to fit more content
        return (
          <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={{ ...baseStyle, fontSize: (Number(fontSize) - 1) + "pt", padding: `${spacing[4]} ${spacing[8]}` }}>
            <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF} />
            <View style={{ width: "100%", height: 1, backgroundColor: "#e5e7eb", marginVertical: spacing[2] }} />
            {renderSections(showFormsOrder)}
          </Page>
        );

      case "creative":
        // Creative layout with a colored header
        return (
          <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={{ ...baseStyle }}>
            <View style={{ backgroundColor: themeColor, padding: `${spacing[8]} ${spacing[12]}`, color: "#ffffff" }}>
              <ResumePDFProfile profile={profile} themeColor="#ffffff" isPDF={isPDF} />
            </View>
            <View style={{ padding: `${spacing[4]} ${spacing[12]}` }}>
              {renderSections(showFormsOrder)}
            </View>
          </Page>
        );

      case "standard":
      default:
        // Default standard layout
        return (
          <Page size={documentSize === "A4" ? "A4" : "LETTER"} style={{ ...baseStyle, ...styles.flexCol }}>
            {Boolean(settings.themeColor) && (
              <View style={{ width: spacing["full"], height: spacing[3.5], backgroundColor: themeColor }} />
            )}
            <View style={{ ...styles.flexCol, padding: `${spacing[0]} ${spacing[20]}` }}>
              <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF} />
              {renderSections(showFormsOrder)}
            </View>
          </Page>
        );
    }
  };

  return (
    <>
      <Document title={`${name} Resume`} author={name} producer={"College Orbit Resume"}>
        {getLayout()}
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};
