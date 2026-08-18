export const metadata = {
  title: "Verenza Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-root">{children}</div>;
}
