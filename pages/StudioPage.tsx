import React, { useState } from 'react';
import { Language, View, StudioAction } from '../types';
import ChatWidget from '../components/ChatWidget';
import { TEXTS, SERVICE_CATALOG, STUDIO_ACTIONS } from '../constants';
import { Globe, Shield, LayoutDashboard, LogOut, UserCog, Mic, FileText, MessageSquare, ImageIcon, Search, Keyboard, Mail, Languages, Brush } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudioPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setView: (view: View) => void;
}

const StudioPage: React.FC<StudioPageProps> = ({ lang, setLang, setView }) => {
  const t = TEXTS[lang];
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATALOG[lang][0].id);

  const getIcon = (key: string, className = "w-5 h-5") => {
    switch (key) {
        case 'Mic': return <Mic className={className} />;
        case 'FileText': return <FileText className={className} />;
        case 'MessageSquare': return <MessageSquare className={className} />;
        case 'ImageIcon': return <ImageIcon className={className} />;
        case 'Shield': return <Shield className={className} />;
        case 'Search': return <Search className={className} />;
        case 'Keyboard': return <Keyboard className={className} />;
        case 'Mail': return <Mail className={className} />;
        case 'Languages': return <Languages className={className} />;
        case 'Brush': return <Brush className={className} />;
        default: return <LayoutDashboard className={className} />;
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col p-4">
        <div className="flex items-center gap-2 p-4 border-b border-white/5 mb-4">
           <div className="w-8 h-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-black text-lg">L</div>
           <span className="font-bold text-xl tracking-wide">Lokal AI Studio</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {SERVICE_CATALOG[lang].map(cat => (
             <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-neon-green/10 text-neon-green' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
              {getIcon(cat.iconKey)}
              {cat.title}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
           <button
            onClick={() => setView('admin')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
           >
             <UserCog className="w-5 h-5" />
             {t.adminTitle}
           </button>
           <button
             onClick={() => setView('installer')}
             className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
           >
             <LogOut className="w-5 h-5" />
             {t.backToInstaller}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">{t.studioTitle}</h1>
          <button 
             onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
             className="flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm text-gray-300 hover:text-white"
           >
             <Globe className="w-4 h-4" />
             {lang.toUpperCase()}
           </button>
        </header>

        {/* Chat and Actions */}
        <div className="flex-1 flex flex-col bg-black/20 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex-1 p-4">
             <ChatWidget language={lang} />
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
               Aktions-Buttons
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {STUDIO_ACTIONS[activeCategory]?.[lang]?.map((action: StudioAction) => (
                <motion.button 
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-sm bg-white/5 hover:bg-neon-green/10 border border-white/10 hover:border-neon-green/30 text-gray-300 hover:text-neon-green transition-all"
                >
                  {getIcon(action.iconKey, "w-4 h-4")}
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudioPage;
