import { View } from "@react-pdf/renderer";
import {
  ResumePDFClassicIcon,
  type IconType,
} from "components/Resume/ResumePDFClassic/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import {
  ResumePDFClassicLink,
  ResumePDFClassicSection,
  ResumePDFClassicText,
} from "components/Resume/ResumePDFClassic/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFClassicProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };

  return (
    <View style={{ ...styles.flexCol, alignItems: "center", marginBottom: spacing["2"] }}>
      <ResumePDFClassicText
        bold={true}
        style={{ fontSize: "28pt", marginBottom: spacing["2"] }}
      >
        {name}
      </ResumePDFClassicText>
      <View
        style={{
          ...styles.flexRow,
          flexWrap: "wrap",
          justifyContent: "center",
          gap: spacing["2"],
        }}
      >
        {Object.entries(iconProps).map(([key, value], idx, arr) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`;
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFClassicLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFClassicLink>
            );
          };

          return (
            <View key={key} style={{ ...styles.flexRow, alignItems: "center" }}>
              <View
                style={{
                  ...styles.flexRow,
                  alignItems: "center",
                  gap: spacing["1"],
                }}
              >
                <ResumePDFClassicIcon type={iconType} isPDF={isPDF} />
                <Wrapper>
                  <ResumePDFClassicText themeColor={themeColor}>{value}</ResumePDFClassicText>
                </Wrapper>
              </View>
              {idx < arr.length - 1 && (
                <ResumePDFClassicText style={{ marginLeft: spacing["2"], color: "black" }}>|</ResumePDFClassicText>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
