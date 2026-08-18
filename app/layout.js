import "./globals.css";
import "swiper/css/bundle";
import "glightbox/dist/css/glightbox.min.css";

export const metadata = {
  metadataBase: new URL("https://www.verenza.com"),
  title: "Verenza | Premium Stainless Steel Bathroom Accessories",
  description:
    "Verenza designs and manufactures premium stainless steel bathroom accessories — towel rings, racks, shelves and kitchen organizers crafted for modern homes.",
  keywords: [
    "stainless steel bathroom accessories",
    "towel ring",
    "towel hanger",
    "bathroom shelf",
    "Verenza",
  ],
  openGraph: {
    siteName: "Verenza",
    type: "website",
    locale: "en_IN",
    title: "Verenza | Premium Stainless Steel Bathroom Accessories",
    description:
      "Verenza designs and manufactures premium stainless steel bathroom accessories — towel rings, racks, shelves and kitchen organizers crafted for modern homes.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Verenza stainless steel bathroom accessories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verenza | Premium Stainless Steel Bathroom Accessories",
    description:
      "Verenza designs and manufactures premium stainless steel bathroom accessories — towel rings, racks, shelves and kitchen organizers crafted for modern homes.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "mWVMQgyYwzkdcbksTyujw_iKQC3xv-7sWeTYDgUewiY",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Verenza Enterprise",
  url: "https://www.verenza.com",
  logo: "https://www.verenza.com/images/logo/verenzabath.png",
  description:
    "Verenza designs and manufactures premium stainless steel bathroom and kitchen accessories.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "220, Aakanksha Complex, Gondal Road",
    addressLocality: "Rajkot",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  email: "verenzaenterprise@gmail.com",
  telephone: "+919998405513",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
