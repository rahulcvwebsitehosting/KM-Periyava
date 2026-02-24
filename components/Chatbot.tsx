
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  lang: Language;
  navigate: (path: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ lang, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (text: string) => {
    // Handle navigation buttons [[NAV:page_id|Label]]
    const navRegex = /\[\[NAV:(\w+)\|(.*?)\]\]/g;
    
    // First, split by navigation buttons
    const parts = text.split(/(\[\[NAV:\w+\|.*?\]\])/g);
    
    return parts.map((part, i) => {
      const navMatch = navRegex.exec(part);
      if (navMatch) {
        const [, pageId, label] = navMatch;
        navRegex.lastIndex = 0; // Reset regex state
        return (
          <button 
            key={i}
            onClick={() => {
              navigate(pageId);
              setIsOpen(false);
            }}
            className="mt-3 block w-full py-2 px-4 bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center"
          >
            {label} →
          </button>
        );
      }

      // Then handle bolding for the remaining text
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((boldPart, j) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-extrabold text-secondary decoration-accent/30 decoration-2 underline-offset-4">{boldPart.slice(2, -2)}</strong>;
        }
        return boldPart;
      });
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are a divine, holy, and respectful assistant for the KM Periyava Sannadhi temple in Kandhamangalam. 
        Your tone is peaceful, brief, and deeply respectful (Satvic). You serve the devotees of Sri Kanchi Mahaperiyava.
        
        WEBSITE STRUCTURE & NAVIGATION:
        You MUST guide users to different parts of our website. When a user asks about a topic, provide information and then offer a navigation button using this EXACT format: [[NAV:page_id|Button Label]]
        Available pages:
        - home: General overview and daily wisdom.
        - about: History of the temple and Sri Kanchi Mahaperiyava.
        - events: Upcoming poojas, festivals, and Anusham dates.
        - gallery: Visual darshan of the temple and events.
        - experience: Read and share devotee experiences.
        - wisdom: Daily quotes and teachings of Periyava.
        - donate: Support Annadhanam and Pidi Arisi Thittam.
        - contact: Location, directions, and contact details.

        TOPICS & CONTENT:
        - Temple: Located in Kandhamangalam, Kuttalam Taluk. It's a sacred place dedicated to Sri Kanchi Mahaperiyava.
        - Pidi Arisi Thittam: A unique initiative where devotees set aside a handful of rice daily for Annadhanam.
        - Anusham Pooja: Special pooja performed on the Anusham star day every month.
        - Annadhanam: Daily feeding of devotees and the needy.

        FORMATTING RULES:
        - Use **bold** for ALL sacred terms and key nouns.
        - Use bullet points (using -) for all lists.
        - Keep responses concise (max 3-4 sentences).
        - ALWAYS include a relevant navigation button if applicable to the user's query.
        
        Rules:
        - Always start or end with a holy greeting like 'Pranam' or 'Jaya Jaya Shankara'.
        - If the user speaks Tamil, respond in Tamil but keep the [[NAV:page_id|Label]] format in English for the page_id part.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.slice(-6).map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      const modelText = response.text || (lang === 'ta' ? 'மன்னிக்கவும், என்னால் பதிலளிக்க முடியவில்லை.' : 'I apologize, I could not process your request.');
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: lang === 'ta' ? 'புனித தொடர்பில் ஒரு சிறு தடங்கல். மீண்டும் முயற்சிக்கவும்.' : 'A small disturbance in the divine connection. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-inter">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-orange-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">ॐ</span>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest heading-font">Divine Assistant</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-tighter">KM Periyava Sannadhi</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition">✕</button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFCF7]">
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-orange-50 text-primary rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-orange-100">🙏</div>
                <p className="text-text-dark italic text-base font-bold px-4">
                  {lang === 'ta' 
                    ? 'பிரணாம். தங்களுக்கு நான் எவ்வாறு உதவ முடியும்?' 
                    : 'Pranam. How may I assist you in your spiritual journey today?'}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none font-bold' 
                    : 'bg-white text-text-dark border border-orange-100 rounded-tl-none font-medium'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {formatMessage(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none border border-orange-100 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-orange-50">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'ta' ? 'உங்கள் கேள்வியை கேட்கவும்...' : 'Ask your question...'}
                className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-full text-sm md:text-base focus:outline-none focus:border-primary transition-all font-bold text-text-dark"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                <span className="font-bold">↑</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl group relative ${isOpen ? 'bg-bg-dark text-white' : 'bg-primary text-white'}`}
        title="Divine Assistant"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></span>
        )}
        <span className="text-2xl relative z-10">{isOpen ? '✕' : 'ॐ'}</span>
        {!isOpen && (
           <span className="absolute -top-14 right-0 bg-white text-primary text-[10px] font-bold py-2 px-4 rounded-full shadow-lg border border-orange-100 whitespace-nowrap opacity-100 animate-bounce">
             Divine Help 🙏
           </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
