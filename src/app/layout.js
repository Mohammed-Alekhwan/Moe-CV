import "../style.css";
import "../projects.css";

export const metadata = {
  metadataBase: new URL("https://mohammed-alekhwan.github.io/Moe-CV/"),
  title: "Mohammed Alekhwan | Software Engineer",
  description:
    "Mohammed Alekhwan — software engineer with an eye for design. Explore thoughtful interfaces, application projects, and an interactive creative playground.",
  alternates: { canonical: "https://mohammed-alekhwan.github.io/Moe-CV/" },
  icons: { icon: "/Moe-CV/favicon.svg" },
  openGraph: {
    title: "Mohammed Alekhwan | Software Engineer",
    description:
      "The portfolio of Mohammed Alekhwan. Software engineering, thoughtful interfaces, and a little creative curiosity.",
    type: "website",
    url: "https://mohammed-alekhwan.github.io/Moe-CV/",
  },
};

export const viewport = { themeColor: "#11120f" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
