import React from 'react';
import { Language, View } from '../types';
import ChatWidget from '../components/ChatWidget';
import Features from '../components/Features';
import { TEXTS } from '../constants';
import { Globe, PlayCircle } from 'lucide-react';

interface InstallerPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setView: (view: View) => void;
}

const InstallerPage: React.FC<InstallerPageProps> = ({ lang, setLang, setView }) => {
  const toggleLang = () => setLang(lang === 'de' ? 'en' : 'de');
  const t = TEXTS[lang];

  return (
    <>
      {/* Navigation */}
      <nav className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-black text-lg">L</div>
           <span className="font-bold text-xl tracking-wide">Lokal AI Studio</span>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
             onClick={toggleLang}
             className="flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm text-gray-300 hover:text-white"
           >
             <Globe className="w-4 h-4" />
             {lang.toUpperCase()}
           </button>
           <button 
              onClick={() => setView('studio')}
              className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-neon-green transition-colors shadow-lg shadow-neon-green/20"
            >
             <PlayCircle className="w-4 h-4" />
             {t.installButton}
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t.heroBadge}
           </div>
           
           <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
             {t.heroTitle.split(' ')[0]} <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-gradient-x">
               {t.heroTitle.split(' ').slice(1).join(' ')}
             </span>
           </h1>
           
           <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
             {t.heroSubtitle}
           </p>
        </div>

        {/* Chatbot Area - Center Stage */}
        <div className="relative mb-32">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-[60px] -z-10 rounded-full" />
           <ChatWidget language={lang} />
        </div>

        {/* Detailed Sections */}
        <Features language={lang} />

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
           <p>{t.footer}</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-neon-green transition-colors">Privacy</a>
             <a href="#" className="hover:text-neon-green transition-colors">Imprint</a>
             <a href="#" className="hover:text-neon-green transition-colors">Github</a>
           </div>
        </div>
      </footer>
    </>
  );
};

export default InstallerPage;
