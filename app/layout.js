import "./globals.css";
import "swiper/css/bundle";
import "glightbox/dist/css/glightbox.min.css";

const SITE_TITLE = "Verenza | Stainless Steel Bathroom Accessories Manufacturer in Rajkot, Gujarat";
const SITE_DESCRIPTION =
  "Verenza is a Rajkot, Gujarat-based manufacturer of premium stainless steel bathroom accessories — towel rings, racks, shelves and kitchen organizers — supplying dealers and homes across Gujarat and India.";

export const metadata = {
  metadataBase: new URL("https://www.verenza.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "bathroom accessories Rajkot",
    "bathroom accessories Gujarat",
    "stainless steel bathroom accessories manufacturer Rajkot",
    "bathroom fittings Gujarat",
    "stainless steel bathroom accessories",
    "towel rod",
    "towel rack",
    "liquid soap dispenser",
    "soap dish",
    "toothbrush holder",
    "bathroom shelf",
    "Verenza",
  ],
  openGraph: {
    siteName: "Verenza",
    type: "website",
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Verenza stainless steel bathroom accessories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  "@type": "LocalBusiness",
  "@id": "https://www.verenza.com/#organization",
  name: "Verenza Enterprise",
  url: "https://www.verenza.com",
  logo: "https://www.verenza.com/images/logo/verenzabath.png",
  image: "https://www.verenza.com/images/logo/verenzabath.png",
  description: SITE_DESCRIPTION,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "220, Aakanksha Complex, Gondal Road",
    addressLocality: "Rajkot",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.3039,
    longitude: 70.8022,
  },
  areaServed: [
    { "@type": "City", name: "Rajkot" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  email: "verenzaenterprise@gmail.com",
  telephone: "+919998405513",
  sameAs: [
    "https://www.facebook.com/share/1EPrY4BtqT/",
    "https://www.instagram.com/verenzaenterprise",
    "https://www.youtube.com/@verenzaenterprise",
  ],
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
