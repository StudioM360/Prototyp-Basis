import React from 'react';
import { ShieldCheck, Cpu, Sparkles, Mic, FileText, MessageSquare, Image as ImageIcon, Shield, Bot, Database, Code, Languages, Eye, Server, Component, Settings, GitBranch } from 'lucide-react';
import { USP, Language, ServiceCategory, AIModel, TechStackComponent } from '../types';
import { TEXTS, USPs, SERVICE_CATALOG, AI_MODELS, TECH_MOTOR } from '../constants';
import GlassCard from './GlassCard';
import { motion } from 'framer-motion';

interface FeaturesProps {
  language: Language;
}

const Features: React.FC<FeaturesProps> = ({ language }) => {
  const content = TEXTS[language];

  const getIconForUsp = (iconKey: string) => {
    const props = {className: "w-6 h-6"}
    switch(iconKey) {
      case 'Cpu': return <Cpu {...props} color="#00f3ff" />;
      case 'Sparkles': return <Sparkles {...props} color="#a855f7" />;
      case 'ShieldCheck': return <ShieldCheck {...props} color="#39ff14" />;
      default: return <Cpu {...props} />;
    }
  };

  const getIconForService = (iconKey: string) => {
    const props = { className: "w-8 h-8 text-white" };
    switch (iconKey) {
        case 'Mic': return <Mic {...props} />;
        case 'FileText': return <FileText {...props} />;
        case 'MessageSquare': return <MessageSquare {...props} />;
        case 'ImageIcon': return <ImageIcon {...props} />;
        case 'Shield': return <Shield {...props} />;
        default: return <Bot {...props} />;
    }
  };

  const getIconForModelCategory = (category: string) => {
    const props = {className: "w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors"};
    if (category.includes("LLM")) return <MessageSquare {...props} />;
    if (category.includes("Code")) return <Code {...props} />;
    if (category.includes("Bild")) return <ImageIcon {...props} />;
    if (category.includes("Vision")) return <Eye {...props} />;
    if (category.includes("Audio")) return <Mic {...props} />;
    if (category.includes("Suche")) return <Database {...props} />;
    if (category.includes("Übersetzung")) return <Languages {...props} />;
    return <Bot {...props} />;
  }

  const getIconForTechComponent = (component: string) => {
    const props = {className: "w-4 h-4 text-gray-400 group-hover:text-neon-green transition-colors"};
    if (component.includes("Backend")) return <Server {...props} />;
    if (component.includes("Frontend")) return <Component {...props} />;
    if (component.includes("KI-Server")) return <Cpu {...props} />;
    if (component.includes("Datenbank")) return <Database {...props} />;
    if (component.includes("Metadaten")) return <FileText {...props} />;
    if (component.includes("Isolation")) return <Shield {...props} />;
    return <GitBranch {...props} />;
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
      
      {/* USP Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            {content.featuresTitle}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USPs[language].map((usp: USP, idx: number) => (
            <GlassCard key={idx} delay={idx * 0.1} className="hover:-translate-y-2 transition-transform duration-300 p-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                {getIconForUsp(usp.iconKey)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{usp.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{usp.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Detailed Service Catalog Section */}
      <div className="mb-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight">
          {content.servicesTitle}
        </h2>
        <div className="space-y-8">
            {SERVICE_CATALOG[language].map((category, idx) => (
                <GlassCard key={category.id} delay={0.2 + (idx * 0.1)}>
                    <div className="md:flex items-start gap-8">
                        <div className="flex-shrink-0 md:w-1/4 mb-6 md:mb-0">
                           <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-2xl bg-[#050a14] border border-white/10 flex items-center justify-center shadow-lg">
                                 {getIconForService(category.iconKey)}
                              </div>
                              <div>
                                 <span className="text-3xl font-bold text-neon-blue">{category.id}</span>
                                 <h3 className="text-xl font-bold text-white leading-tight">{category.title}</h3>
                                 <p className="text-xs text-gray-500 font-mono">{category.replaces}</p>
                              </div>
                           </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {category.features.map((feature, f_idx) => (
                                <div key={f_idx} className="flex items-start gap-2.5">
                                    <ShieldCheck className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                                    <p className="text-gray-300 text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
      </div>

      {/* Tech Deep Dive Section */}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight">
          {content.techTitle}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Models Table */}
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Bot className="text-neon-blue"/> KI-Modelle (Die Intelligenz)</h3>
                <GlassCard className="p-0 overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                           <tbody>
                                {AI_MODELS.map((item, idx) => (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="p-4 flex items-center gap-3 text-gray-200 w-2/5">
                                           <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                              {getIconForModelCategory(item.category)}
                                           </div>
                                           <div className="flex-col">
                                                <span className="font-bold text-sm text-white">{item.model}</span>
                                                <span className="text-xs text-gray-500 block">{item.category}</span>
                                           </div>
                                        </td>
                                        <td className="p-4 text-gray-400 text-xs w-3/5">
                                            {item.use}
                                        </td>
                                    </tr>
                                ))}
                           </tbody>
                        </table>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Tech Motor Table */}
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Settings className="text-neon-green"/> Tech-Stack (Der Motor)</h3>
                <GlassCard className="p-0 overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                         <table className="w-full text-left border-collapse">
                           <tbody>
                                {TECH_MOTOR.map((item, idx) => (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="p-4 flex items-center gap-3 text-gray-200 w-2/5">
                                           <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                              {getIconForTechComponent(item.component)}
                                           </div>
                                            <div className="flex-col">
                                                <span className="font-bold text-sm text-white">{item.technology}</span>
                                                <span className="text-xs text-gray-500 block">{item.component}</span>
                                           </div>
                                        </td>
                                        <td className="p-4 text-gray-400 text-xs w-3/5">
                                            {item.details}
                                        </td>
                                    </tr>
                                ))}
                           </tbody>
                        </table>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Features;