import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, Sparkles, RefreshCcw, Settings, Key, X, Check, Eye, EyeOff, AlertCircle, Info, 
  Cpu, Shield, Zap, Activity, Database, Server,
  Mail, Calendar, LayoutGrid, Network, ShieldCheck, Video, FileText, Image as ImageIcon, Mic, MessageSquare
} from 'lucide-react';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { SUGGESTED_QUESTIONS, TEXTS, SERVICE_CATALOG } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Chat } from '@google/genai';

interface ChatWidgetProps {
  language: Language;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the persistent chat session
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    } else if (process.env.API_KEY) {
      // Fallback to env var if available (e.g. for demo purposes)
      setApiKey(process.env.API_KEY);
    }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    if (apiError) setApiError(null); // Clear error when user types
  };

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      setApiError(language === 'de' ? "Der Schlüssel darf nicht leer sein." : "Key cannot be empty.");
      return;
    }
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    // Reset chat session when key changes
    chatSessionRef.current = null;
    setApiError(null);
    setShowSettings(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Setup & Language Switch
  useEffect(() => {
    // Reset session on language change
    chatSessionRef.current = null;
    
    const welcomeMsg = language === 'de' 
        ? "Hallo! Ich bin Lumos AI, Ihr persönlicher Assistent für das Local AI Studio.\n\nIch helfe Ihnen, den vollen Leistungsumfang zu verstehen und führe Sie durch die Installation. Womit möchten Sie beginnen?"
        : "Hi! I'm Lumos AI, your personal assistant for the Local AI Studio.\n\nI can help you understand the full range of features and guide you through the installation. What would you like to start with?";

    setMessages([{
        id: 'welcome',
        role: 'model',
        text: welcomeMsg
    }]);
  }, [language]);


  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    const currentText = text; // Capture text
    setInput(''); // Clear input immediately
    setIsLoading(true);

    // 1. Add User Message
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: currentText };
    setMessages(prev => [...prev, userMsg]);

    try {
      // Ensure session exists
      if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession(language, apiKey);
      }

      // 2. Add Placeholder for Bot Response
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', isStreaming: true }]);

      // 3. Stream Response
      const stream = await sendMessageToChat(chatSessionRef.current, currentText);
      
      let fullResponse = "";
      
      for await (const chunk of stream) {
          const chunkText = chunk.text || "";
          fullResponse += chunkText;
          
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: fullResponse } : msg
          ));
      }
      
      // 4. Finalize
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error: any) {
      console.error("Chat Error:", error);
      let errorText = language === 'de' 
        ? "Entschuldigung, ich konnte die Verbindung nicht herstellen." 
        : "I apologize, I couldn't establish a connection.";
      
      // Handle Specific API Key Errors
      const isAuthError = error.message?.includes('API Key') || error.toString().includes('403') || error.toString().includes('400');
      
      if (isAuthError) {
         const specificError = language === 'de'
           ? "Der API-Schlüssel wurde abgelehnt (403/400). Bitte prüfen Sie die Eingabe."
           : "API Key rejected (403/400). Please check your input.";
           
         errorText = specificError;
         setApiError(specificError);
         setShowSettings(true);
      }

      setMessages(prev => prev.map(msg => 
        msg.isStreaming ? { ...msg, text: errorText, isStreaming: false } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (!apiKey) return;
    try {
        chatSessionRef.current = createChatSession(language, apiKey);
        
        const welcomeMsg = language === 'de' 
            ? "Gerne. Haben Sie weitere Fragen zu unserem Angebot oder den Preisen?"
            : "Certainly. Do you have any further questions about our offer or pricing?";

        setMessages([{
            id: Date.now().toString(),
            role: 'model',
            text: welcomeMsg
        }]);
    } catch(e) {
        console.error("Reset failed", e);
    }
  };
  
  const getServiceIcon = (key: string) => {
    const className = "w-4 h-4 text-neon-blue";
    switch (key) {
        case 'Mic': return <Mic className={className} />;
        case 'FileText': return <FileText className={className} />;
        case 'MessageSquare': return <MessageSquare className={className} />;
        case 'ImageIcon': return <ImageIcon className={className} />;
        case 'Shield': return <Shield className={className} />;
        default: return <Server className={className} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-neon-green/10 border border-white/10 relative z-10 transition-all duration-300 hover:shadow-neon-green/20 group">
      
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0a0f1c] border border-white/20 rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-6 text-neon-green">
                <Key className="w-6 h-6" />
                <h3 className="text-xl font-bold">API Configuration</h3>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                {language === 'de' 
                  ? "Bitte geben Sie Ihren Google Gemini API Key ein, um den Chat zu aktivieren. Der Schlüssel wird lokal in Ihrem Browser gespeichert."
                  : "Please enter your Google Gemini API Key to enable the chat. The key is stored locally in your browser."}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Gemini API Key</label>
                  <div className="relative">
                    <input 
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={handleApiKeyChange}
                        placeholder="AIzaSy..."
                        className={`w-full bg-white/5 border ${apiError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon-green/50'} rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:bg-white/10 transition-all font-mono text-sm`}
                    />
                    <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        type="button"
                    >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Error Message Display */}
                  <AnimatePresence>
                    {apiError && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 flex items-center gap-2 text-red-400 text-xs font-medium"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{apiError}</span>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  onClick={() => saveApiKey(apiKey)}
                  className="w-full py-3 bg-neon-green text-black font-bold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {language === 'de' ? "Speichern" : "Save Key"}
                </button>
                
                <p className="text-xs text-center text-gray-600 mt-4">
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline hover:text-gray-400">
                    Get API Key here
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info / Bandwidth Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full h-full max-h-[500px] bg-[#0a0f1c] border border-neon-green/30 rounded-2xl shadow-[0_0_50px_rgba(57,255,20,0.1)] relative flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                 <div className="flex items-center gap-3">
                   <Activity className="text-neon-green w-5 h-5" />
                   <h3 className="font-bold text-white text-lg tracking-wide">
                     {language === 'de' ? "System-Bandbreite & Status" : "System Bandwidth & Status"}
                   </h3>
                 </div>
                 <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white transition-colors">
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                
                {/* 1. Technical Bandwidth Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                   <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-400 text-xs uppercase tracking-wider">Privacy Level</span>
                        <Shield className="w-4 h-4 text-neon-blue" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">100%</div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-neon-blue" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">Local Execution / Offline First</p>
                   </div>

                   <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-400 text-xs uppercase tracking-wider">Latency</span>
                        <Zap className="w-4 h-4 text-neon-green" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">&lt; 20ms</div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-neon-green" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">Native GPU Acceleration</p>
                   </div>

                   <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-400 text-xs uppercase tracking-wider">Knowledge Base</span>
                        <Database className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">RAG V2</div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-purple-400" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">Vector Search + Local Embeddings</p>
                   </div>
                </div>

                {/* 2. Functional Scope Overview */}
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {language === 'de' ? "Leistungskatalog" : "Service Catalog"}
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                   {SERVICE_CATALOG[language].map((service, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-green/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center shrink-0">
                           {getServiceIcon(service.iconKey)}
                        </div>
                        <span className="text-xs md:text-sm text-gray-300 font-medium leading-tight">{service.title}</span>
                      </div>
                   ))}
                </div>

                {/* Footer Note inside modal */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-neon-green/10 to-transparent border-l-2 border-neon-green">
                   <p className="text-xs text-gray-300">
                     {language === 'de' 
                       ? "Alle Dienste werden lokal orchestriert. Keine Daten verlassen Ihr Netzwerk ohne explizite Autorisierung (OAuth2)." 
                       : "All services are orchestrated locally. No data leaves your network without explicit authorization (OAuth2)."}
                   </p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/50 to-transparent opacity-50" />
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-md relative z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-[#050a14] border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.15)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-shadow duration-500">
              <Bot className="text-neon-green w-7 h-7 drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg tracking-wide">Lumos AI</h3>
            <p className="text-xs text-blue-300 font-mono flex items-center gap-2">
              <span className="opacity-70">STATUS:</span> 
              <span className="text-neon-green font-bold">ONLINE</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => { setShowSettings(true); setApiError(null); }}
            className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${!apiKey ? 'text-neon-green animate-pulse' : 'text-gray-400 hover:text-white'}`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title={language === 'de' ? "Neu starten" : "Reset"}
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar relative">
        <AnimatePresence mode='popLayout'>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-5 shadow-lg backdrop-blur-md border ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-600/30 to-blue-900/30 text-white border-blue-400/30 rounded-tr-sm' 
                  : 'bg-[#0a0f1c]/80 text-gray-100 border-white/10 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
              }`}>
                 <div className="flex items-start gap-3">
                    {msg.role === 'model' && <Sparkles className="w-5 h-5 text-neon-green shrink-0 mt-1 opacity-70" />}
                    <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">{msg.text}</p>
                    </div>
                 </div>
                 {msg.isStreaming && (
                    <div className="mt-2 flex gap-1 h-1 pl-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce"></div>
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions / Suggested Questions */}
      <div className="px-6 pb-2 pt-2 bg-gradient-to-t from-[#050a14] to-transparent">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 mask-linear">
          {SUGGESTED_QUESTIONS[language].map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="whitespace-nowrap px-4 py-2 text-xs font-medium rounded-xl bg-white/5 border border-white/10 hover:bg-neon-green/10 hover:border-neon-green/50 hover:text-neon-green transition-all text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-[#050a14]/90 backdrop-blur-xl relative z-20">
        <div className="relative flex items-center gap-3">
          
          {/* NEW: Info / Bandwidth Button */}
          <button
             onClick={() => setShowInfo(true)}
             className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all shadow-lg hover:shadow-neon-blue/20"
             title="System Overview"
          >
             <Info className="w-5 h-5" />
          </button>

          <div className="relative flex-1 group/input">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder={apiKey ? TEXTS[language].chatPlaceholder : (language === 'de' ? "Bitte API Key eingeben..." : "Please set API Key first...")}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-5 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all font-light disabled:opacity-50"
                disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isLoading && <div className="w-5 h-5 border-2 border-white/20 border-t-neon-green rounded-full animate-spin"/>}
            </div>
          </div>
          
          <button
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className="p-4 rounded-xl bg-gradient-to-br from-neon-green to-emerald-700 text-black font-bold shadow-lg shadow-green-900/20 hover:shadow-neon-green/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatWidget;