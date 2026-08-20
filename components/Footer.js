import Link from "next/link";
import YearNow from "./YearNow";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cols">
          <div className="footer-brand">
            <Link href="/" className="logo"><img src="/images/logo/verenzabathWhite.png" alt="Verenza" className="logo-footer" /></Link>
            <p>Verenza designs and manufactures premium stainless steel bathroom and kitchen accessories — combining modern aesthetics with industrial-grade durability.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1EPrY4BtqT/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/verenzaenterprise?igsh=d2J3NWhkNzEwaHM0&igsi=d2J3NWhkNzEwaHM0" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.youtube.com/@verenzaenterprise" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Sitemap</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/catalogue">Catalogue</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><Link href="/products#vertex">Vertex</Link></li>
              <li><Link href="/products#oval">Oval</Link></li>
              <li><Link href="/products#orbit">Orbit</Link></li>
              <li><Link href="/products#grace">Grace</Link></li>
              <li><Link href="/products#prime">Prime</Link></li>
              <li><Link href="/products#soap-dispenser">Soap Dispenser</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="mailto:verenzaenterprise@gmail.com">verenzaenterprise@gmail.com</a></li>
              <li><a href="tel:+919998405513">+91 99984 05513</a></li>
              <li><a href="tel:+917490969595">+91 74909 69595</a></li>
              <li><address style={{ color: "rgba(255,255,255,.55)", fontSize: "14px", fontStyle: "normal", display: "block", marginTop: "4px" }}>Verenza Enterprise, 220, Aakanksha Complex, Gondal Road, Rajkot, Gujarat</address></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; <YearNow /> Verenza Enterprise. All Rights Reserved.</p>
          <p><a href="#">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="#">Terms &amp; Conditions</a></p>
        </div>
      </div>
    </footer>
  );
}
