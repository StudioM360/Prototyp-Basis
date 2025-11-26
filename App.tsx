import React, { useState } from 'react';
import { Language, View } from './types';
import InstallerPage from './pages/InstallerPage';
import StudioPage from './pages/StudioPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [lang, setLang] = useState<Language>('de');
  const [view, setView] = useState<View>('installer');

  const renderView = () => {
    switch (view) {
      case 'studio':
        return <StudioPage lang={lang} setLang={setLang} setView={setView} />;
      case 'admin':
        return <AdminPage lang={lang} setLang={setLang} setView={setView} />;
      case 'installer':
      default:
        return <InstallerPage lang={lang} setLang={setLang} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-neon-green/30 bg-deepSpace">
      {/* Background Elements - Consistent across all views */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#050a14]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
      
      <div className="relative z-10">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
