import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Crown, Briefcase, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import StreakLinesBackground from '../components/StreakLines';
import Logo3D from '../components/Logo3D';

gsap.registerPlugin(ScrollTrigger);

interface Player {
  id: number;
  name: string;
  role: string;
  photo?: string;
  wins: number;
  losses: number;
}

interface Team {
  id: number;
  name: string;
  logo?: string;
  players: Player[];
  winRate: number;
  championships: number;
}

interface Management {
  id: number;
  name: string;
  role: string;
  photo?: string;
}

interface Sponsor {
  id: number;
  name: string;
  logo?: string;
  tier: 'Platinum' | 'Gold';
}

const Rosters = () => {
  const [activeTeam, setActiveTeam] = useState<'all' | 'meta-arena' | 'meta-elite'>('all');
  const teamsRef = useRef<HTMLDivElement>(null);
  const managementRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);

  const teams: Team[] = [
    {
      id: 1,
      name: 'META ARENA',
      winRate: 87,
      championships: 12,
      players: [
        { id: 1, name: 'MT4.ICEHELL', role: 'SUPPORTER', wins: 156, losses: 12, photo: '/player-cards/icehell.png' },
        { id: 2, name: 'MT4.1DEKU', role: 'SNIPER', wins: 98, losses: 15, photo: '/player-cards/1DEKU.png' },
        { id: 3, name: 'MT4.NXDO', role: 'PRIMARY RUSHER - IGL ', wins: 112, losses: 18, photo: '/player-cards/nxdo_.png' },
        { id: 4, name: 'MT4.ORYX', role: 'SUPPORTER ', wins: 75, losses: 20, photo: '/player-cards/oryx_ned_.png' },
        { id: 5, name: 'MT4.FLIX', role: ' NADER ', wins: 68, losses: 22, photo: '/player-cards/flix_png_.png' },
      ],
    },
    {
      id: 2,
      name: 'META ELITE',
      winRate: 82,
      championships: 8,
      players: [
        { id: 1, name: 'MET4.SNOW', role: 'SNIPER ', wins: 89, losses: 14, photo: '/SNOW.png' },
        { id: 2, name: 'MET4.MATRIX', role: 'RUSHER - IGL', wins: 134, losses: 25, photo: '/MATRIX_(_IGL_)_.png' },
        { id: 3, name: 'MET4.SAYEM', role: 'Entry Fragger', wins: 82, losses: 30, photo: '/SAYEM.png' },
        { id: 4, name: 'MET4.METALEX', role: 'Support', wins: 55, losses: 14, photo: '/METALEX.png' },
        { id: 5, name: 'MET4.HAPPY1', role: 'NADER ', wins: 48, losses: 16, photo: '/HAPPY.png' },
      ],
    },
  ];

  const management: Management[] = [
    { id: 1, name: 'AL RAIYAN', role: 'Founder', photo: '/management/AL_RAIYAN_(_MANGEMENT_)_.jpg' },
    { id: 2, name: 'AL MUBIN', role: 'Manager', photo: '/management/MUBIN_MANAGEMENT_.png' },
    { id: 3, name: 'SIAM', role: 'Advisor', photo: '/management/SIAM_.png' },
  ];

  const sponsors: Sponsor[] = [
    { id: 1, name: 'MD SAHRIAR NAFIS', tier: 'Platinum', logo: '/sponsors/NAFIS_(_SPONSOR_)_.jpeg' },
    { id: 2, name: 'MD JEHAD', tier: 'Gold', logo: '/sponsors/JEHAD_SPONSOR.jpeg' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-section', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teamsRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.management-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: managementRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.sponsor-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sponsorsRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredTeams = activeTeam === 'all'
    ? teams
    : teams.filter(t => t.name.toLowerCase().replace(' ', '-') === activeTeam);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <StreakLinesBackground />
        <div className="relative z-10 text-center px-4 pt-20">
          <div className="mb-4 font-inter text-cyan-400/60 text-sm">
            <Link to="/" className="hover:text-cyan-400">Home</Link>
            <span className="mx-2">/</span>
            <span>Rosters</span>
          </div>
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none">
            THE CONTENDERS
          </h1>
          <p className="font-inter text-white/60 text-lg mt-4">
            Meet the minds that shape the Arena
          </p>
        </div>
      </section>

      {/* Team Filter */}
      <section className="py-6 border-b border-cyan-400/20" style={{ background: 'linear-gradient(180deg, #0a0015 0%, #050010 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTeam('all')}
              className={`px-6 py-2 font-bebas text-lg tracking-wider transition-all duration-300 ${
                activeTeam === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'bg-dark-50 text-white/70 hover:bg-dark-50/80 border border-cyan-400/20'
              }`}
            >
              ALL TEAMS
            </button>
            <button
              onClick={() => setActiveTeam('meta-arena')}
              className={`px-6 py-2 font-bebas text-lg tracking-wider transition-all duration-300 ${
                activeTeam === 'meta-arena'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'bg-dark-50 text-white/70 hover:bg-dark-50/80 border border-cyan-400/20'
              }`}
            >
              META ARENA
            </button>
            <button
              onClick={() => setActiveTeam('meta-elite')}
              className={`px-6 py-2 font-bebas text-lg tracking-wider transition-all duration-300 ${
                activeTeam === 'meta-elite'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_20px_rgba(255,0,85,0.4)]'
                  : 'bg-dark-50 text-white/70 hover:bg-dark-50/80 border border-cyan-400/20'
              }`}
            >
              META ELITE
            </button>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section ref={teamsRef} className="py-12" style={{ background: 'linear-gradient(180deg, #050010 0%, #0a0015 50%, #05000a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {filteredTeams.map((team) => (
            <div key={team.id} className="team-section mb-16">
              {/* Team Header */}
              <div className="relative rounded-t-lg p-6 border-b-2 border-cyan-400/50 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0020 0%, #150030 50%, #080018 100%)' }}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0,212,255,0.1) 100px, rgba(0,212,255,0.1) 101px)' }} />
                </div>
                <div className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-4">
                    <Logo3D size="xl" />
                    <div>
                      <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-wider">{team.name}</h2>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-inter text-white/60 text-sm">
                          Win Rate: <span className="text-cyan-400 font-bold">{team.winRate}%</span>
                        </span>
                        <span className="text-cyan-400/30">|</span>
                        <span className="font-inter text-white/60 text-sm">
                          Championships: <span className="text-yellow-400 font-bold">{team.championships}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <Crown className="text-yellow-400" size={24} />
                    <span className="font-bebas text-lg text-yellow-400 tracking-widest">ELITE TEAM</span>
                  </div>
                </div>
              </div>

              {/* Players Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 rounded-b-lg" style={{ background: 'rgba(10, 0, 20, 0.8)' }}>
                {team.players.map((player) => {
                  const winRate = Math.round((player.wins / (player.wins + player.losses)) * 100);
                  return (
                    <div
                      key={player.id}
                      className="player-card group rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                      style={{ background: 'linear-gradient(180deg, rgba(10, 0, 30, 0.9) 0%, rgba(5, 0, 15, 0.9) 100%)' }}
                    >
                      {/* Player Photo Placeholder */}
                      <div className="w-28 h-28 mx-auto rounded-lg flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-all relative" style={{ border: '2px solid rgba(0, 212, 255, 0.3)', background: 'linear-gradient(135deg, #0a0020 0%, #050010 100%)' }}>
                        {player.photo ? (
                          <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="relative">
                            <User size={48} className="text-cyan-500/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Team Captain Badge */}
                      {player.role.includes('Captain') && (
                        <div className="flex justify-center mt-2">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-dark-200 px-2 py-0.5 font-bebas text-xs tracking-wider">
                            CAPTAIN
                          </span>
                        </div>
                      )}

                      <div className="text-center mt-3">
                        <h4 className="font-bebas text-xl text-white tracking-wide">{player.name}</h4>
                        <p className="font-inter text-cyan-400 text-xs mt-1 uppercase tracking-wider">{player.role}</p>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-inter text-white/50 text-xs">
                            {player.wins}W - {player.losses}L
                          </span>
                          <span className="font-inter text-cyan-400 text-xs font-bold">{winRate}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${winRate}%`, background: 'linear-gradient(90deg, #00d4ff 0%, #ff0055 100%)' }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Management Section */}
      <section ref={managementRef} className="py-16" style={{ background: 'linear-gradient(180deg, #05000a 0%, #080015 50%, #0a0020 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="text-purple-400" size={32} />
              <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wider">MANAGEMENT</h2>
            </div>
            <p className="font-inter text-white/60">The leadership behind the Arena</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {management.map((member) => (
              <div key={member.id} className="management-card group flex flex-col items-center text-center">
                <div className="relative w-36 h-36">
                  <div
                    className="absolute inset-0 rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105"
                    style={{ background: 'conic-gradient(from 0deg, #a855f7, #6366f1, #00d4ff, #a855f7)' }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ background: '#0a0015' }}>
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={56} className="text-purple-400/50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 32px rgba(168,85,247,0.55)' }} />
                  {member.role === 'Founder' && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-0.5 rounded-full whitespace-nowrap">
                      <Crown size={10} className="text-black" />
                      <span className="font-bebas text-xs text-black tracking-wider">FOUNDER</span>
                    </div>
                  )}
                </div>
                <h4 className="font-bebas text-xl text-white mt-7 tracking-wide">{member.name}</h4>
                <p className="font-inter text-purple-400 text-xs uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section ref={sponsorsRef} className="py-16" style={{ background: 'linear-gradient(180deg, #0a0020 0%, #050010 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Handshake className="text-yellow-400" size={32} />
              <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wider">OUR SPONSORS</h2>
            </div>
            <p className="font-inter text-white/60">Proud partners of METAPHOR ARENA</p>
          </div>

          <div className="flex flex-wrap justify-center gap-16 md:gap-28">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="sponsor-card group flex flex-col items-center text-center">
                <div className="relative w-44 h-44">
                  <div
                    className="absolute inset-0 rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: sponsor.tier === 'Platinum'
                        ? 'conic-gradient(from 0deg, #fbbf24, #f59e0b, #fcd34d, #fbbf24)'
                        : 'conic-gradient(from 0deg, #00d4ff, #0080ff, #38bdf8, #00d4ff)',
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ background: '#080010' }}>
                      {sponsor.logo ? (
                        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className={`font-bebas text-4xl ${
                            sponsor.tier === 'Platinum' ? 'text-yellow-400' : 'text-cyan-400'
                          }`}>
                            {sponsor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: sponsor.tier === 'Platinum' ? '0 0 44px rgba(251,191,36,0.55)' : '0 0 44px rgba(0,212,255,0.55)' }}
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`font-bebas text-xs tracking-wider px-4 py-1 rounded-full ${
                      sponsor.tier === 'Platinum'
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                    }`}>
                      {sponsor.tier.toUpperCase()} SPONSOR
                    </span>
                  </div>
                </div>
                <h4 className="font-bebas text-2xl text-white mt-10 tracking-wide">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0020 0%, #150030 50%, #0a0015 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,212,255,0.1) 50px, rgba(0,212,255,0.1) 51px)', backgroundSize: '100% 100px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-bebas text-3xl md:text-4xl text-white mb-4 tracking-wider">
            WANT TO JOIN OUR RANKS?
          </h2>
          <p className="font-inter text-white/80 mb-8">
            Auditions for our teams are held quarterly. Apply now to become part of the Arena.
          </p>
          <Link
            to="/contacts"
            className="inline-block px-8 py-3 font-bebas text-lg tracking-wider text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)', boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
          >
            APPLY NOW
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Rosters;
