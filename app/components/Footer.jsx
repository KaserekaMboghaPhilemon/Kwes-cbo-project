import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../src/contexts/LanguageContext";
import whatsappIcon from "../../src/Images/whatsapp.png";
import facebookIcon from "../../src/Images/facebook.png";
import twitterIcon from "../../src/Images/twitter.png";
import instagramIcon from "../../src/Images/instagram.png";
import linkedinIcon from "../../src/Images/linkedin (1).png";
import tiktokIcon from "../../src/Images/tiktok.png";
import "./Footer.css";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="col-span-1 md:col-span-2 min-h-[8rem]">
            <h3 className="text-xl font-bold mb-4">{t("header.brand")}</h3>
            <p className="text-gray-300 mb-4">{t("footer.about")}</p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} KWES. {t("footer.rights")}
            </p>
            {/* Social Links */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="https://wa.me/254140401128" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="footer-social-link" aria-label="WhatsApp">
                <img src={whatsappIcon} alt="WhatsApp" className="footer-social-icon" />
              </a>
              <a href="https://facebook.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Facebook" className="footer-social-link" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="footer-social-icon" />
              </a>
              <a href="https://twitter.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Twitter" className="footer-social-link" aria-label="Twitter">
                <img src={twitterIcon} alt="Twitter" className="footer-social-icon" />
              </a>
              <a href="https://instagram.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Instagram" className="footer-social-link" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className="footer-social-icon" />
              </a>
              <a href="https://linkedin.com/company/kwescbo" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="footer-social-link" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="footer-social-icon" />
              </a>
              <a href="https://tiktok.com/@kwescbo" target="_blank" rel="noopener noreferrer" title="TikTok" className="footer-social-link" aria-label="TikTok">
                <img src={tiktokIcon} alt="TikTok" className="footer-social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-h-[8rem]">
            <h4 className="QuickLink">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="whitespace-nowrap text-gray-300 hover:text-white transition">{t("nav.home")}</Link></li>
              <li><Link to="/about" className="whitespace-nowrap text-gray-300 hover:text-white transition">{t("nav.about")}</Link></li>
              <li><Link to="/programs" className="whitespace-nowrap text-gray-300 hover:text-white transition">{t("nav.programs")}</Link></li>
              <li><Link to="/impact" className="whitespace-nowrap text-gray-300 hover:text-white transition">{t("nav.impact")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-h-[8rem]">
            <h4 className="text-lg font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <a href="mailto:empowerwomen77@gmail.com" className="hover:text-white transition">
                  empowerwomen77@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <a href="tel:+254140401128" className="hover:text-white transition">
                  +254140401128
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">💳</span>
                <span>M-Pesa: +254140401128</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span>{t("footer.address")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;