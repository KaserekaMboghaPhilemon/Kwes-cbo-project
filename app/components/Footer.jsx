import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "../../src/contexts/LanguageContext";
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
            <div className="mt-6 flex items-center gap-4">
              <a href="https://wa.me/254140401128" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-2xl text-gray-400 hover:text-green-400 transition duration-300">
                <MessageCircle size={24} />
              </a>
              <a href="https://facebook.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-2xl text-gray-400 hover:text-sky-400 transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com/kwescbo" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-2xl text-gray-400 hover:text-pink-400 transition duration-300">
                <Instagram size={24} />
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