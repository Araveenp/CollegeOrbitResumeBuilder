import { View } from "@react-pdf/renderer";
import {
  ResumePDFClassicSection,
  ResumePDFClassicBulletList,
  ResumeFeaturedSkill,
} from "components/Resume/ResumePDFClassic/common";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import type { ResumeSkills } from "lib/redux/types";

export const ResumePDFClassicSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);
  const featuredSkillsPair = [
    [featuredSkillsWithText[0], featuredSkillsWithText[3]],
    [featuredSkillsWithText[1], featuredSkillsWithText[4]],
    [featuredSkillsWithText[2], featuredSkillsWithText[5]],
  ];

  return (
    <ResumePDFClassicSection themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <View style={{ ...styles.flexRowBetween, marginTop: spacing["0.5"] }}>
          {featuredSkillsPair.map((pair, idx) => (
            <View
              key={idx}
              style={{
                ...styles.flexCol,
              }}
            >
              {pair.map((featuredSkill, idx) => {
                if (!featuredSkill) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredSkill.skill}
                    rating={featuredSkill.rating}
                    themeColor={themeColor}
                    style={{
                      justifyContent: "flex-end",
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      )}
      {descriptions.map((desc, idx) => {
        const colonIndex = desc.indexOf(':');
        if (colonIndex !== -1) {
          const category = desc.slice(0, colonIndex).trim();
          const list = desc.slice(colonIndex + 1).trim();
          return (
            <View key={idx} style={{ ...styles.flexRow, alignItems: "flex-start", marginTop: idx > 0 ? spacing["0.5"] : 0 }}>
              <View style={{ width: "20%" }}>
                <ResumePDFClassicText bold={true}>{category}</ResumePDFClassicText>
              </View>
              <View style={{ width: "80%" }}>
                <ResumePDFClassicText>{list}</ResumePDFClassicText>
              </View>
            </View>
          );
        }
        return (
          <View key={idx} style={{ marginTop: idx > 0 ? spacing["0.5"] : 0 }}>
            <ResumePDFClassicText>{desc}</ResumePDFClassicText>
          </View>
        );
      })}
    </ResumePDFClassicSection>
  );
};
