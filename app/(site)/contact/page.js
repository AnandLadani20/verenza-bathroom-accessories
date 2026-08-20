import Masthead from "@/components/Masthead";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import RevealScale from "@/components/motion/RevealScale";

export const metadata = {
  title: "Contact Us | Verenza – Rajkot, Gujarat",
  description:
    "Get in touch with Verenza in Rajkot, Gujarat for product inquiries, bulk orders, and dealership opportunities for premium stainless steel bathroom accessories.",
  alternates: { canonical: "https://www.verenza.com/contact" },
  openGraph: {
    title: "Contact Us | Verenza – Rajkot, Gujarat",
    description:
      "Get in touch with Verenza in Rajkot, Gujarat for product inquiries, bulk orders, and dealership opportunities for premium stainless steel bathroom accessories.",
    images: [{ url: "/images/gallery/gallery17.jpg", width: 1600, height: 1280, alt: "Verenza fitting close-up" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <Masthead
        img="/images/gallery/gallery17.jpg"
        alt="Verenza fitting close-up"
        tag="Let's Talk"
        title="Contact Us"
        breadcrumbLabel="Contact Us"
        breadcrumbPath="/contact"
        sub="Visit our Rajkot, Gujarat facility, or reach out — we reply within 24 hours."
      />

      <section className="section">
        <div className="container">
          <div className="grid-12" style={{ alignItems: "start" }}>
            <div className="g-span-7">
              <span className="tag">Send a Message</span>
              <Reveal as="h2" className="section-title">Get in touch with our team</Reveal>
              <Reveal as="p" className="body-sub" style={{ marginBottom: "36px" }}>Have a question about our products, pricing or dealership opportunities? Fill out the form and our team will get back to you within 24 hours.</Reveal>
              <ContactForm />
            </div>

            <div className="g-span-5">
              <RevealScale className="map-frame-editorial" style={{ aspectRatio: "4/3", marginBottom: "10px" }}>
                <iframe
                  src="https://www.google.com/maps?q=Verenza+Enterprise,+220+Aakanksha+Complex,+Gondal+Road,+Rajkot,+Gujarat,+India&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Verenza Location Map"
                ></iframe>
              </RevealScale>
              <div className="info-row">
                <div className="info-item"><span className="ico"><i className="fa-solid fa-location-dot"></i></span><div><h4>Visit Us</h4><p>Verenza Enterprise, 220, Aakanksha Complex, Gondal Road, Rajkot, Gujarat</p></div></div>
                <div className="info-item"><span className="ico"><i className="fa-solid fa-phone"></i></span><div><h4>Call Us</h4><p>+91 99984 05513<br />+91 74909 69595</p></div></div>
                <div className="info-item"><span className="ico"><i className="fa-solid fa-envelope"></i></span><div><h4>Email Us</h4><p>verenzaenterprise@gmail.com</p></div></div>
                <div className="info-item"><span className="ico"><i className="fa-brands fa-whatsapp"></i></span><div><h4>WhatsApp</h4><p>+91 99984 05513</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-editorial bg-deep">
        <span className="ghost-num">&#9993;</span>
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Follow Us</span>
          <Reveal as="h2" className="display-2">Stay connected with Verenza</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>Follow us on social media for new launches, design inspiration and exclusive offers.</Reveal>
          <div className="footer-social" style={{ justifyContent: "center", display: "flex" }}>
            <a href="https://www.facebook.com/share/1EPrY4BtqT/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/verenzaenterprise?igsh=d2J3NWhkNzEwaHM0&igsi=d2J3NWhkNzEwaHM0" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@verenzaenterprise" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </section>
    </>
  );
}
