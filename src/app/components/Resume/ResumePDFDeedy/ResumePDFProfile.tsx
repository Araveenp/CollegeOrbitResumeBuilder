import { View } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDFDeedy/styles";
import {
  ResumePDFDeedyLink,
  ResumePDFDeedyText,
} from "components/Resume/ResumePDFDeedy/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFDeedyProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, location } = profile;
  const iconProps = { email, phone, location, url };

  const nameParts = name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1] || "";

  return (
    <View style={{ ...styles.flexCol, alignItems: "center", marginBottom: spacing["4"], borderBottom: "1pt solid #ccc", paddingBottom: spacing["2"] }}>
      <View style={{ ...styles.flexRow, alignItems: "baseline", marginBottom: spacing["1"] }}>
        <ResumePDFDeedyText
          bold={false}
          style={{ fontSize: "36pt", fontWeight: "light", color: "#333" }}
        >
          {firstName}{" "}
        </ResumePDFDeedyText>
        <ResumePDFDeedyText
          bold={true}
          style={{ fontSize: "36pt", color: "#333" }}
        >
          {lastName}
        </ResumePDFDeedyText>
      </View>
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
              <ResumePDFDeedyLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFDeedyLink>
            );
          };

          return (
            <View key={key} style={{ ...styles.flexRow, alignItems: "center" }}>
              <Wrapper>
                <ResumePDFDeedyText style={{ fontSize: "9pt", color: "#666" }}>{value}</ResumePDFDeedyText>
              </Wrapper>
              {idx < arr.length - 1 && (
                <ResumePDFDeedyText style={{ marginLeft: spacing["2"], fontSize: "9pt", color: "#666" }}>|</ResumePDFDeedyText>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
