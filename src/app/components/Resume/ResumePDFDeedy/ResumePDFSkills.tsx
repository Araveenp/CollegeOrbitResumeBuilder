import { View } from "@react-pdf/renderer";
import {
  ResumePDFDeedySection,
  ResumePDFDeedyBulletList,
  ResumeFeaturedSkill,
  ResumePDFDeedyText,
} from "components/Resume/ResumePDFDeedy/common";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import type { ResumeSkills } from "lib/redux/types";

export const ResumePDFDeedySkills = ({
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
    <ResumePDFDeedySection themeColor={themeColor} heading={heading}>
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
                <ResumePDFDeedyText bold={true}>{category}</ResumePDFDeedyText>
              </View>
              <View style={{ width: "80%" }}>
                <ResumePDFDeedyText>{list}</ResumePDFDeedyText>
              </View>
            </View>
          );
        }
        return (
          <View key={idx} style={{ marginTop: idx > 0 ? spacing["0.5"] : 0 }}>
            <ResumePDFDeedyText>{desc}</ResumePDFDeedyText>
          </View>
        );
      })}
    </ResumePDFDeedySection>
  );
};
