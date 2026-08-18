import Grain from "@/components/Grain";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import FloatButtons from "@/components/FloatButtons";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteLayout({ children }) {
  return (
    <>
      <Grain />
      <CustomCursor />
      <Preloader />
      <HeaderNav />
      {children}
      <Footer />
      <FloatButtons />
      <SmoothScroll />
    </>
  );
}
