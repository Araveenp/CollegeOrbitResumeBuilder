import { Text, View, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { styles, spacing } from "components/Resume/ResumePDFClassic/styles";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";

export const ResumePDFClassicSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
}) => (
  <View
    style={{
      ...styles.flexCol,
      gap: spacing["2"],
      marginTop: spacing["5"],
      ...style,
    }}
  >
    {heading && (
      <View style={{ ...styles.flexCol, width: "100%", marginBottom: spacing["2"] }}>
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: "0.3pt", // tracking-wide
            textTransform: "uppercase",
          }}
          debug={DEBUG_RESUME_PDF_FLAG}
        >
          {heading}
        </Text>
        <View
          style={{
            width: "100%",
            height: "1pt",
            backgroundColor: "black",
            marginTop: "3pt",
          }}
          debug={DEBUG_RESUME_PDF_FLAG}
        />
      </View>
    )}
    {children}
  </View>
);

export const ResumePDFClassicText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean;
  themeColor?: string;
  style?: Style;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={{
        color: themeColor || DEFAULT_FONT_COLOR,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
      debug={DEBUG_RESUME_PDF_FLAG}
    >
      {children}
    </Text>
  );
};

export const ResumePDFClassicBulletList = ({
  items,
  showBulletPoints = true,
}: {
  items: string[];
  showBulletPoints?: boolean;
}) => {
  return (
    <>
      {items.map((item, idx) => (
        <View style={{ ...styles.flexRow }} key={idx}>
          {showBulletPoints && (
            <ResumePDFClassicText
              style={{
                paddingLeft: spacing["2"],
                paddingRight: spacing["2"],
                lineHeight: "1.3",
              }}
              bold={true}
            >
              {"•"}
            </ResumePDFClassicText>
          )}
          {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFClassicText
            style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}
          >
            {item}
          </ResumePDFClassicText>
        </View>
      ))}
    </>
  );
};

export const ResumePDFClassicLink = ({
  src,
  isPDF,
  children,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export const ResumeFeaturedSkill = ({
  skill,
  rating,
  themeColor,
  style = {},
}: {
  skill: string;
  rating: number;
  themeColor: string;
  style?: Style;
}) => {
  const numCircles = 5;

  return (
    <View style={{ ...styles.flexRow, alignItems: "center", ...style }}>
      <ResumePDFClassicText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFClassicText>
      {[...Array(numCircles)].map((_, idx) => (
        <View
          key={idx}
          style={{
            height: "9pt",
            width: "9pt",
            marginLeft: "2.25pt",
            backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
            borderRadius: "100%",
          }}
        />
      ))}
    </View>
  );
};
