import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://elventex.tech"),
  title: "Elventex Technology — Web & Software Studio",
  description:
    "Elventex Technology builds websites, handles SEO, and provides web design and development services.",
  openGraph: {
    title: "Elventex Technology",
    description:
      "Web & software studio — websites, SEO, and digital solutions.",
    url: "https://elventex.tech",
    siteName: "Elventex Technology",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Elventex Technology Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}