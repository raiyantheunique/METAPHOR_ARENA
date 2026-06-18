import { Link } from 'react-router-dom';
import { MessageCircle, Facebook } from 'lucide-react';
import Logo3D from './Logo3D';

// Custom Discord icon component
const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .074-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .083.01 9.8 9.8 0 0 0 .373.292.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rosters', path: '/rosters' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contacts', path: '/contacts' },
  ];

  const socialLinks = [
    { name: 'Discord', icon: DiscordIcon, url: 'https://discord.gg/tmVWFb9fh' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/metaphorarena' },
    { name: 'WhatsApp', icon: WhatsAppIcon, url: 'https://wa.me/8801887912088' },
  ];

  return (
    <footer
      className="border-t border-cyan-400/20"
      style={{ background: 'linear-gradient(180deg, #05000a 0%, #0a0015 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <Logo3D size="lg" />
              <div className="flex flex-col">
                <span className="font-bebas text-2xl tracking-wider text-white leading-tight">
                  METAPHOR
                </span>
                <span className="font-bebas text-xl tracking-wider text-cyan-400 leading-tight -mt-1">
                  ARENA
                </span>
              </div>
            </Link>
            <p className="mt-4 text-white/50 font-inter text-sm max-w-md">
              Where Gaming Meets Glory. Join elite teams, dominate the competition, and forge your legacy in the arena.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bebas text-xl text-cyan-400 tracking-wider mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-cyan-400 transition-colors font-inter text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bebas text-xl text-cyan-400 tracking-wider mb-4">CONNECT</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all p-2 rounded border border-cyan-400/10 hover:border-cyan-400/30"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              <a
                href="https://wa.me/8801887912088"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-cyan-400 transition-colors font-inter text-sm flex items-center gap-2"
              >
                <WhatsAppIcon />
                +8801887912088
              </a>
              <p className="text-white/50 font-inter text-sm">contact@metaphorarena.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cyan-400/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 font-inter text-sm">
              METAPHOR ARENA &copy; {currentYear} — Where Legends Are Made
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/30 hover:text-cyan-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 hover:text-cyan-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
