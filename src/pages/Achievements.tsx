import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award, Star, Calendar, MapPin, X } from 'lucide-react';
import ConfettiBackground from '../components/ConfettiBackground';
import Logo3D from '../components/Logo3D';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: typeof Trophy;
}

interface TrophyItem {
  id: number;
  name: string;
  year: string;
  category: 'National' | 'International' | 'Regional';
}

interface Champion {
  id: number;
  name: string;
  yearsActive: string;
  quote: string;
  avatar: string;
}

interface Award {
  id: number;
  title: string;
  event: string;
  year: string;
}

const Achievements = () => {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const championRef = useRef<HTMLDivElement>(null);

  const timeline: TimelineEvent[] = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'METAPHOR ARENA was founded, bringing together debate enthusiasts worldwide.',
      icon: Star,
    },
    {
      year: '2019',
      title: 'First Championship',
      description: 'Hosted our inaugural global debate championship with 128 contenders.',
      icon: Trophy,
    },
    {
      year: '2020',
      title: 'Virtual Expansion',
      description: 'Pivoted to virtual debates during global events, reaching 50,000+ viewers.',
      icon: Medal,
    },
    {
      year: '2021',
      title: 'International Recognition',
      description: 'Awarded Best Debate Platform by the Global Rhetoric Society.',
      icon: Award,
    },
    {
      year: '2022',
      title: '500 Members Milestone',
      description: 'Celebrated reaching 500 active members across 48 countries.',
      icon: Star,
    },
    {
      year: '2023',
      title: 'Arena Cup Inauguration',
      description: 'Launched the Arena Cup, now the most prestigious debate tournament.',
      icon: Trophy,
    },
    {
      year: '2024',
      title: 'Present Day',
      description: 'Continuing to train the next generation of master orators.',
      icon: Medal,
    },
  ];

  const trophies: TrophyItem[] = [
    { id: 1, name: 'Arena Cup', year: '2024', category: 'International' },
    { id: 2, name: 'Rhetorician\'s Crown', year: '2023', category: 'International' },
    { id: 3, name: 'National Championship', year: '2023', category: 'National' },
    { id: 4, name: 'West Regional Title', year: '2024', category: 'Regional' },
    { id: 5, name: 'Logic Master Award', year: '2022', category: 'International' },
    { id: 6, name: 'Silver Tongue Trophy', year: '2023', category: 'National' },
    { id: 7, name: 'East Regional Title', year: '2022', category: 'Regional' },
    { id: 8, name: 'Debate Excellence', year: '2024', category: 'National' },
  ];

  const champions: Champion[] = [
    { id: 1, name: 'Marcus Aurelius III', yearsActive: '2019-2024', quote: 'Words forge empires.', avatar: 'M' },
    { id: 2, name: 'Serena Kim', yearsActive: '2020-2024', quote: 'Logic cuts deeper than swords.', avatar: 'S' },
    { id: 3, name: 'Elena Veridian', yearsActive: '2019-2023', quote: 'The stage is my battlefield.', avatar: 'E' },
    { id: 4, name: 'Sophia Laurent', yearsActive: '2018-2024', quote: 'Every word a weapon.', avatar: 'S' },
    { id: 5, name: 'Thorin Blackwell', yearsActive: '2019-2024', quote: 'Arguments are my armor.', avatar: 'T' },
    { id: 6, name: 'Aria Chen', yearsActive: '2021-2024', quote: 'Persuasion is power.', avatar: 'A' },
    { id: 7, name: 'Nathan Cross', yearsActive: '2020-2024', quote: 'Eloquence defines victory.', avatar: 'N' },
    { id: 8, name: 'Dante Russo', yearsActive: '2021-2024', quote: 'Words carve legacies.', avatar: 'D' },
  ];

  const stats = [
    { value: 12, label: 'National Titles' },
    { value: 3, label: 'International Championships' },
    { value: 200, suffix: '+', label: 'Trophies' },
    { value: 8, label: 'Years Undefeated' },
    { value: 1, label: 'st in 5 Regions' },
    { value: 50, suffix: '+', label: 'Awards' },
  ];

  const awards: Award[] = [
    { id: 1, title: 'Arena Cup 2024', event: 'International Finals', year: '2024' },
    { id: 2, title: 'Rhetoric Excellence Award', event: 'Global Debate Summit', year: '2024' },
    { id: 3, title: 'Best Orator', event: 'National Championship', year: '2023' },
    { id: 4, title: 'Logic Master Title', event: 'West Regional', year: '2023' },
    { id: 5, title: 'Silver Tongue Award', event: 'International Debate League', year: '2022' },
    { id: 6, title: 'Emerging Debater', event: 'Rising Stars Tournament', year: '2022' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'International':
        return 'text-gold border-gold';
      case 'National':
        return 'text-crimson border-crimson';
      case 'Regional':
        return 'text-white border-white/60';
      default:
        return 'text-white';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline nodes
      gsap.from('.timeline-node', {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -50 : 50),
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        },
      });

      // Trophy cards
      gsap.from('.trophy-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trophyRef.current,
          start: 'top 80%',
        },
      });

      // Stats count up
      const statElements = document.querySelectorAll('.achievement-stat');
      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0');
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: '.stats-grid',
              start: 'top 80%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <ConfettiBackground />
        <div className="relative z-10 text-center px-4 pt-20">
          <div className="flex justify-center mb-6">
            <Logo3D size="xl" className="drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]" />
          </div>
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">
            <span className="text-white">HALL OF </span>
            <span className="text-gold">GLORY</span>
          </h1>
          <p className="font-inter text-white/50 text-lg md:text-xl mt-6 italic">
            Every word. Every battle. Every victory.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="bg-dark-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-bebas text-4xl md:text-5xl text-white text-center mb-16">OUR JOURNEY</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-crimson/30">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-crimson rounded-full animate-pulse" />
            </div>

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`timeline-node relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-dark-200 p-6 rounded border border-crimson/20 hover:border-crimson hover:glow-red transition-all duration-300">
                      <span className="font-bebas text-4xl text-crimson">{event.year}</span>
                      <h3 className="font-bebas text-xl text-white mt-2">{event.title}</h3>
                      <p className="font-inter text-white/60 text-sm mt-2">{event.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-crimson rounded-full flex items-center justify-center z-10 border-4 border-dark-100">
                    <event.icon size={20} className="text-white" />
                  </div>

                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trophy Cabinet */}
      <section ref={trophyRef} className="bg-dark-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-white">TITLES & HONORS</h2>
            <div className="w-24 h-1 bg-crimson mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trophies.map((trophy) => (
              <div
                key={trophy.id}
                className="trophy-card group bg-dark-100 p-6 rounded border border-dark-50 hover:border-gold hover:glow-gold transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 trophy-rotate">
                    <Trophy className="w-full h-full text-gold" />
                  </div>
                </div>
                <h4 className="font-bebas text-lg text-white text-center">{trophy.name}</h4>
                <p className="font-inter text-white/60 text-sm text-center">{trophy.year}</p>
                <span
                  className={`block mt-2 text-xs font-inter text-center border-b pb-1 ${getCategoryColor(
                    trophy.category
                  )}`}
                >
                  {trophy.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Champion Wall */}
      <section ref={championRef} className="bg-dark-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-white">LEGENDS OF THE ARENA</h2>
          </div>

          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max marquee">
              {[...champions, ...champions].map((champion, index) => (
                <div
                  key={`${champion.id}-${index}`}
                  className="flex-shrink-0 w-64 bg-dark-200 p-6 rounded border border-crimson/20 hover:border-crimson transition-all duration-300"
                >
                  <div className="w-20 h-20 mx-auto bg-dark-red rounded-full flex items-center justify-center font-bebas text-2xl text-white border-2 border-gold">
                    {champion.avatar}
                  </div>
                  <h4 className="font-bebas text-lg text-white text-center mt-4">{champion.name}</h4>
                  <p className="font-inter text-gold/60 text-xs text-center">{champion.yearsActive}</p>
                  <p className="font-inter text-white/60 text-sm text-center italic mt-3">"{champion.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <section className="bg-dark-red py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bebas text-5xl md:text-6xl text-white">
                  <span className="achievement-stat" data-value={stat.value}>
                    0
                  </span>
                  {stat.suffix || ''}
                </div>
                <div className="font-inter text-white/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Gallery */}
      <section className="bg-dark-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-white">AWARDS GALLERY</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {awards.map((award) => (
              <button
                key={award.id}
                onClick={() => setSelectedAward(award)}
                className="group relative aspect-video bg-dark-100 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-crimson to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                  <span className="font-bebas text-lg text-white">{award.title}</span>
                  <span className="font-inter text-white/80 text-sm">{award.year}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <Award size={24} className="text-white/20 group-hover:text-gold transition-colors" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy size={40} className="text-crimson/30 group-hover:text-gold group-hover:scale-110 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedAward && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="bg-dark-100 max-w-lg w-full p-8 rounded-lg border border-crimson relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>
            <Trophy className="w-20 h-20 mx-auto text-gold mb-6" />
            <h3 className="font-bebas text-3xl text-white text-center">{selectedAward.title}</h3>
            <p className="font-inter text-white/60 text-center mt-2">{selectedAward.event}</p>
            <p className="font-inter text-crimson text-center mt-4">{selectedAward.year}</p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-dark-100 py-16 border-t border-crimson">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-bebas text-4xl md:text-5xl text-white mb-4">BE PART OF THE LEGACY</h2>
          <p className="font-inter text-white/60 mb-8">
            Step into the Arena and write your own chapter.
          </p>
          <Link
            to="/contacts"
            className="inline-block bg-crimson text-white px-10 py-4 font-bebas text-xl tracking-wider hover:bg-dark-red transition-all duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Achievements;

