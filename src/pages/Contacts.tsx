import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  MapPin,
  Mail,
  Copy,
  Check,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle,
  Map,
  Clock,
  Facebook,
} from 'lucide-react';
import GridFloorBackground from '../components/GridFloorBackground';
import Logo3D from '../components/Logo3D';

// Custom Discord icon component
const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .074-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .083.01 9.8 9.8 0 0 0 .373.292.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface FAQItem {
  question: string;
  answer: string;
}

const Contacts = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [shakeField, setShakeField] = useState<string | null>(null);

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const subjects = [
    'General Inquiry',
    'Join the Arena',
    'Partnership',
    'Media/Press',
    'Challenge a Member',
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How do I join Metaphor Arena?',
      answer:
        'To join METAPHOR ARENA, fill out our registration form under the "Join the Arena" subject, and our team will guide you through the onboarding process. We welcome debaters of all skill levels.',
    },
    {
      question: 'Are competitions open to all ages?',
      answer:
        'Yes! We have multiple divisions based on age groups and experience levels, including Youth (13-17), Adult (18-35), and Veteran (36+) categories to ensure fair and exciting debates.',
    },
    {
      question: 'How are rankings determined?',
      answer:
        'Rankings are calculated based on wins, debate quality scores from judges, and performance in ranked tournaments. Consistency and growth are rewarded alongside pure win counts.',
    },
    {
      question: 'Can I challenge a member directly?',
      answer:
        'Absolutely! Registered members can issue direct challenges through their member portal. The challenged member has 48 hours to accept or propose an alternative time.',
    },
    {
      question: 'Do you host virtual debates?',
      answer:
        'Yes, we host both in-person and virtual debates. Our online platform supports real-time audience engagement, judge scoring, and high-definition streaming for global participation.',
    },
    {
      question: 'How do I become a sponsor?',
      answer:
        'For sponsorship inquiries, select "Partnership" in the contact form subject line. Our partnerships team will reach out to discuss custom packages and brand integration opportunities.',
    },
  ];

  const socialPlatforms = [
    {
      name: 'Discord',
      icon: DiscordIcon,
      url: 'https://discord.gg/tmVWFb9fh',
      color: 'hover:bg-[#5865F2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/metaphorarena',
      color: 'hover:bg-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: 'https://wa.me/8801887912088',
      color: 'hover:bg-[#25D366]',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => !value && key !== 'subject'
    );

    if (emptyFields.length > 0) {
      const field = emptyFields[0][0];
      setShakeField(field);
      setTimeout(() => setShakeField(null), 500);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <GridFloorBackground />
        <div className="relative z-10 text-center px-4 pt-20">
          <div className="flex justify-center mb-6">
            <Logo3D size="xl" className="drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]" />
          </div>
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none">
            GET IN TOUCH
          </h1>
          <p className="font-inter text-white/60 text-lg mt-4">
            Questions, collaborations, or challenges — we answer all.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="py-12 md:py-16" style={{ background: 'linear-gradient(180deg, #050010 0%, #0a0020 50%, #05000a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Contact Form */}
            <div ref={leftColRef}>
              {formSubmitted ? (
                <div className="rounded-lg p-12 text-center border border-green-500/30" style={{ background: 'linear-gradient(180deg, rgba(0, 50, 30, 0.8) 0%, rgba(0, 20, 10, 0.8) 100%)' }}>
                  <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-6" />
                  <h3 className="font-bebas text-3xl text-white mb-2">Message Delivered</h3>
                  <p className="font-inter text-white/60">to the Arena</p>
                  <p className="font-inter text-white/40 text-sm mt-4">
                    We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-lg p-6 md:p-8 border border-cyan-400/20"
                  style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.9) 0%, rgba(5, 0, 15, 0.9) 100%)' }}
                >
                  <h3 className="font-bebas text-2xl text-cyan-400 mb-6 tracking-wider">SEND A MESSAGE</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block font-inter text-white/60 text-sm mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-b-2 border-cyan-400/20 focus:border-cyan-400 focus:outline-none transition-colors rounded-t text-white placeholder-white/40 ${
                          shakeField === 'fullName' ? 'animate-[shake_0.5s_ease-in-out]' : ''
                        }`}
                        style={{ background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)' }}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block font-inter text-white/60 text-sm mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-b-2 border-cyan-400/20 focus:border-cyan-400 focus:outline-none transition-colors rounded-t text-white placeholder-white/40 ${
                          shakeField === 'email' ? 'animate-[shake_0.5s_ease-in-out]' : ''
                        }`}
                        style={{ background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)' }}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block font-inter text-white/60 text-sm mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-b-2 border-cyan-400/20 focus:border-cyan-400 focus:outline-none transition-colors rounded-t appearance-none text-white"
                        style={{ background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)' }}
                      >
                        {subjects.map((subject) => (
                          <option key={subject} value={subject} style={{ background: '#0a0015' }}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-inter text-white/60 text-sm mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full px-4 py-3 border-b-2 border-cyan-400/20 focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-t text-white placeholder-white/40 ${
                          shakeField === 'message' ? 'animate-[shake_0.5s_ease-in-out]' : ''
                        }`}
                        style={{ background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)' }}
                        placeholder="Your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 font-bebas text-lg tracking-wider transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 text-white"
                      style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right - Contact Info */}
            <div ref={rightColRef} className="space-y-6">
              {/* Location Card */}
              <div className="rounded-lg p-6 border border-cyan-400/20" style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.8) 0%, rgba(5, 0, 15, 0.8) 100%)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)' }}>
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bebas text-lg text-cyan-400">ARENA HEADQUARTERS</h4>
                    <p className="font-inter text-white mt-2">METAPHOR ARENA Gaming Hub</p>
                    <p className="font-inter text-white/60">Dhaka, Bangladesh</p>
                    <div className="mt-4 h-32 rounded overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0020 0%, #050010 100%)' }}>
                      <Map size={32} className="text-cyan-400/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="rounded-lg p-6 border border-purple-400/20" style={{ background: 'linear-gradient(180deg, rgba(20, 0, 40, 0.8) 0%, rgba(10, 0, 20, 0.8) 100%)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #8b00ff 0%, #5c00b3 100%)' }}>
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bebas text-lg text-purple-400">EMAIL US</h4>
                    <div className="space-y-2 mt-4">
                      <button
                        onClick={() => copyToClipboard('contact@metaphorarena.com')}
                        className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                      >
                        contact@metaphorarena.com
                        {copiedEmail === 'contact@metaphorarena.com' ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={14} className="opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard('partnerships@metaphorarena.com')}
                        className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                      >
                        partnerships@metaphorarena.com
                        {copiedEmail === 'partnerships@metaphorarena.com' ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={14} className="opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social & Response Card */}
              <div className="rounded-lg p-6 border border-cyan-400/20" style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.8) 0%, rgba(5, 0, 15, 0.8) 100%)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)' }}>
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bebas text-lg text-cyan-400">CONNECT WITH US</h4>
                    <div className="flex gap-4 mt-4">
                      <a
                        href="https://discord.gg/tmVWFb9fh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#5865F2] transition-colors"
                      >
                        <DiscordIcon />
                      </a>
                      <a
                        href="https://www.facebook.com/metaphorarena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#1877F2] transition-colors"
                      >
                        <Facebook size={24} />
                      </a>
                      <a
                        href="https://wa.me/8801887912088"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#25D366] transition-colors"
                      >
                        <WhatsAppIcon />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-inter text-white/60 text-sm">
                        Average response: within 24 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Strip */}
      <section className="py-12" style={{ background: 'linear-gradient(180deg, #0a0020 0%, #050010 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="font-bebas text-2xl text-white text-center mb-8 tracking-wider">CONNECT WITH US</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg p-6 border border-cyan-400/20 group hover:-translate-y-2 transition-all duration-300 ${platform.color} hover:text-white`}
                style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.8) 0%, rgba(5, 0, 15, 0.8) 100%)' }}
              >
                <platform.icon
                  className="text-cyan-400/60 group-hover:text-white transition-colors"
                />
                <h4 className="font-bebas text-xl text-white mt-3 tracking-wider">{platform.name}</h4>
                <p className="font-inter text-white/50 text-sm group-hover:text-white/80">
                  Join our community
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #050010 0%, #0a0020 100%)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-bebas text-4xl text-white text-center mb-12 tracking-wider">FREQUENTLY ASKED</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-lg transition-all duration-300 ${
                  expandedFAQ === index
                    ? 'border-cyan-400'
                    : 'border-cyan-400/20'
                }`}
                style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.8) 0%, rgba(5, 0, 15, 0.8) 100%)' }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-inter font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-cyan-400 transition-transform duration-300 flex-shrink-0 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFAQ === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="font-inter text-white/60 px-6 pb-6">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;

