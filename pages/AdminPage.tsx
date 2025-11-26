import React from 'react';
import { Language, View } from '../types';
import { TEXTS } from '../constants';
import { Globe, ArrowLeft, User, Cpu, BarChart } from 'lucide-react';

interface AdminPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setView: (view: View) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ lang, setLang, setView }) => {
  const t = TEXTS[lang];
  const toggleLang = () => setLang(lang === 'de' ? 'en' : 'de');

  const StatCard = ({ icon, label, value, colorClass }: { icon: React.ReactNode, label: string, value: string, colorClass: string }) => (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{label}</p>
        <div className={`text-${colorClass}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );


  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">{t.adminTitle}</h1>
          <p className="text-gray-400">Systemübersicht und Verwaltung</p>
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
             className="flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm text-gray-300 hover:text-white"
           >
             <ArrowLeft className="w-4 h-4" />
             {t.backToStudio}
           </button>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatCard icon={<User size={24} />} label="Aktive Benutzer" value="1" colorClass="neon-blue" />
           <StatCard icon={<Cpu size={24} />} label="GPU Auslastung" value="N/A" colorClass="neon-green" />
           <StatCard icon={<BarChart size={24} />} label="API Anfragen" value="N/A" colorClass="purple-400" />
        </div>

        <div className="mt-12 glass-panel p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Weitere Funktionen in Kürze</h2>
            <p className="text-gray-400">Hier werden Sie bald Benutzer verwalten, Lizenzen einsehen und System-Logs analysieren können.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
