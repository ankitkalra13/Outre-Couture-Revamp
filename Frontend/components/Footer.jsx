import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Business Setup', href: '/services#business-setup' },
    { name: 'Golden Visa', href: '/golden-visa' },
    { name: 'PRO Services', href: '/services#pro-services' },
    { name: 'Banking Solutions', href: '/services#banking' },
    { name: 'Legal Services', href: '/services#legal' },
  ];

  return (
    <footer className="bg-[#252525] text-brand">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold">Dubiz</span>
            </div>
            <p className="text-brand text-sm leading-relaxed">
              Your trusted partner for business setup, PRO services, and golden visa solutions in the UAE. 
              We provide comprehensive business support services to help you succeed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand hover:text-bg-brand text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-brand hover:text-bg-brand text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-bg-brand mt-0.5 flex-shrink-0" />
                <p className="text-brand text-sm">
                  Office 123, Business Bay,<br />
                  Dubai, UAE
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-bg-brand flex-shrink-0" />
                <p className="text-brand text-sm">+971 4 123 4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-bg-brand flex-shrink-0" />
                <p className="text-brand text-sm">info@dubiz.co</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-400 text-sm">
              © 2024 Dubiz. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-brand hover:text-bg-brand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-brand hover:text-bg-brand transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;