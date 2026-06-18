import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Shield, Trophy, Globe, Play } from 'lucide-react';
import ParticleSphereBackground from '../components/ParticleSphere';
import Logo3D from '../components/Logo3D';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [underlineAnimated, setUnderlineAnimated] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setUnderlineAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About section animation
      gsap.from(aboutRef.current?.querySelector('.line-expand') || '', {
        width: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
      });

      // Features cards stagger
      gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
      });

      // Stats count up
      const stats = statsRef.current?.querySelectorAll('.stat-number');
      stats?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-value') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );
      });

      // Highlights cards stagger
      gsap.from('.highlight-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: highlightsRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Elite Debates',
      description: 'Challenge the sharpest minds in structured debates that push rhetoric to its limits.',
    },
    {
      icon: Trophy,
      title: 'Ranked Competitions',
      description: 'Climb the leaderboard through intense head-to-head battles and prove your mastery.',
    },
    {
      icon: Globe,
      title: 'Global Contenders',
      description: 'Compete against debaters from every corner of the world in our international arena.',
    },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Members' },
    { value: 1200, suffix: '+', label: 'Debates' },
    { value: 48, suffix: '', label: 'Countries' },
    { value: 98, suffix: '%', label: 'Intensity' },
  ];

  const highlights = [
    { title: 'The Logic War', date: 'Dec 15, 2024', category: 'Championship' },
    { title: 'Rhetoric Rising', date: 'Dec 8, 2024', category: 'Featured' },
    { title: 'Word Warriors', date: 'Dec 1, 2024', category: 'Featured' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleSphereBackground />

        <div className="relative z-10 text-center px-4">
          <div className="flex justify-center mb-6">
            <Logo3D size="xl" className="drop-shadow-[0_0_30px_rgba(220,20,60,0.5)]" />
          </div>
          <h1 className="font-bebas text-7xl sm:text-8xl md:text-[120px] leading-none text-white mb-4">
            METAPHOR
            <br />
            <span className={`inline-block underline-animated ${underlineAnimated ? 'animate' : ''}`}>
              ARENA
            </span>
          </h1>
          <p className="font-inter text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            The Stage Where Rhetoric Becomes Power
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacts"
              className="bg-crimson text-white px-8 py-3 font-bebas text-lg tracking-wider hover:bg-dark-red transition-all duration-300 transform hover:scale-105"
            >
              Join the Arena
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 font-bebas text-lg tracking-wider hover:bg-white hover:text-dark-200 transition-all duration-300">
              Watch Highlights
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bounce-arrow">
          <ChevronDown size={32} className="text-white/60" />
        </div>
      </section>

      {/* About Strip */}
      <section ref={aboutRef} className="bg-dark-100 py-12 md:py-16 border-l-4 border-crimson">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-inter text-white text-lg md:text-xl text-center">
            <span className="text-crimson font-semibold">METAPHOR ARENA</span> is where the sharpest minds
            clash, ideas collide, and words forge champions.
          </p>
          <div className="h-1 bg-crimson mt-6 line-expand mx-auto w-full max-w-md" />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-bebas text-4xl md:text-5xl text-dark-200 text-center mb-12">WHY JOIN US</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-white border-t-4 border-crimson p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-dark-200 rounded-full flex items-center justify-center group-hover:bg-crimson transition-colors duration-300">
                    <feature.icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bebas text-2xl text-dark-200 mb-3">{feature.title}</h3>
                <p className="font-inter text-dark-200/70">{feature.description}</p>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section ref={statsRef} className="bg-dark-red py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="font-bebas text-5xl md:text-6xl text-white">
                  <span className="stat-number" data-value={stat.value}>
                    0
                  </span>
                  {stat.suffix}
                </div>
                <div className="font-inter text-white/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section ref={highlightsRef} className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-bebas text-4xl md:text-5xl text-dark-200 text-center mb-12">RECENT BATTLES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="highlight-card group relative overflow-hidden cursor-pointer"
              >
                <div className="aspect-video bg-dark-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-crimson/80 rounded-full flex items-center justify-center group-hover:bg-crimson group-hover:scale-110 transition-all duration-300">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/20 transition-colors duration-300" />
                </div>
                <div className="p-4 bg-white group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-crimson font-inter text-sm">{item.category}</span>
                  <h3 className="font-bebas text-xl text-dark-200">{item.title}</h3>
                  <p className="font-inter text-dark-200/60 text-sm">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-crimson/10 to-transparent transform skew-x-12" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-bebas text-4xl md:text-6xl text-dark-200 mb-6">
            READY TO STEP INTO THE ARENA?
          </h2>
          <p className="font-inter text-dark-200/70 mb-8 text-lg">
            Join the elite community of debaters and prove your worth.
          </p>
          <Link
            to="/contacts"
            className="inline-block bg-crimson text-white px-12 py-4 font-bebas text-xl tracking-wider hover:bg-dark-red transition-all duration-300 transform hover:scale-105"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

