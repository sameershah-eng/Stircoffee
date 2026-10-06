import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Bot, User, Coffee, X, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { CoffeeBean } from '../types';
import { FEATURED_BEANS } from '../data/coffeeData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedBean?: CoffeeBean;
  actionPrompt?: string;
}

interface BaristaAIAssistantProps {
  onSelectBean: (bean: CoffeeBean) => void;
}

export const BaristaAIAssistant: React.FC<BaristaAIAssistantProps> = ({ onSelectBean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: "Morning from Brixton Hill! I'm your Stir Barista AI. Looking for a bright floral filter, a rich flat white roast, or want to know what's pouring at Friday Lates?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Recommend a fruity, vibrant bean for V60',
    'Best roast for a creamy flat white with oat milk',
    'What is Thermal Shock processing?',
    'What’s pouring at Stir Lates this Friday?',
  ];

  const handleSendPrompt = (promptText: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic intelligent response logic grounded in Stir Coffee data
    setTimeout(() => {
      let replyText = '';
      let matchedBean: CoffeeBean | undefined;

      const lower = promptText.toLowerCase();

      if (lower.includes('fruity') || lower.includes('v60') || lower.includes('filter')) {
        matchedBean = FEATURED_BEANS.find((b) => b.id === 'friedhats-fiesole');
        replyText =
          "For high-clarity V60 filter brewing, you can't beat Friedhats Fiesole Pink Bourbon from Colombia. It's anaerobic thermal shock processed, delivering radiant notes of pink guava, blood orange, and raw cacao nibs with electrifying sweetness.";
      } else if (lower.includes('oat') || lower.includes('flat white') || lower.includes('milk') || lower.includes('creamy')) {
        matchedBean = FEATURED_BEANS.find((b) => b.id === 'dak-milky-cake');
        replyText =
          "Hands down, DAK Milky Cake Thermal from Amsterdam! Sourced from Quindio, Colombia, it legitimately tastes like freshly baked Scandinavian cardamom buns and sweet vanilla cream. It cuts through oat milk with incredible pastry-like indulgence.";
      } else if (lower.includes('thermal') || lower.includes('process') || lower.includes('anaerobic')) {
        matchedBean = FEATURED_BEANS.find((b) => b.id === 'manhattan-letty-bermudez');
        replyText =
          "Thermal Shock is a cutting-edge processing technique pioneered by Diego Bermudez in Cauca. The coffee cherries undergo temperature-controlled anaerobic fermentation before a sudden warm-to-cold thermal shock wash. This captures intense floral aromatics (jasmine, white peach, yuzu) that traditional washing misses!";
      } else if (lower.includes('lates') || lower.includes('friday') || lower.includes('beer') || lower.includes('wine')) {
        replyText =
          "Stir Lates runs this Friday from 17:00 to 22:00 at 111 Brixton Hill! We'll have skin-contact orange pet-nats, cold cans of Bandit Pale Ale and Outlooker, and grilled Salt Beef Reubens on sourdough while local vinyl selectors spin rare soul & dub.";
      } else {
        matchedBean = FEATURED_BEANS[0];
        replyText =
          `We have fresh drops rested on our wooden ladder shelves from Friedhats, DAK, Manhattan, and La Cabra. If you enjoy clean and balanced, try ${matchedBean.name} (£${matchedBean.price.toFixed(2)})!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: 'Just now',
          recommendedBean: matchedBean,
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setInput('');
    handleSendPrompt(currentInput);
  };

  return (
    <>
      {/* Floating Executive Pill Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 text-stone-900 shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight font-display">
              Stir Barista AI
            </div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1">
              <span>Bean Sommelier</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Online</span>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Assistant Flyout Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-22 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden max-h-[580px]"
          >
            {/* Header */}
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display leading-none">
                    Brixton Bean Sommelier
                  </h4>
                  <span className="text-[10px] text-stone-400">
                    Live Coffee & Roast Copilot
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs bg-stone-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-stone-900 text-white rounded-br-xs'
                        : 'bg-white text-stone-800 border border-stone-200/80 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Recommendation Card attached to assistant message */}
                  {m.recommendedBean && (
                    <div className="mt-2 w-[85%] bg-white rounded-xl p-3 border border-amber-200/80 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                          {m.recommendedBean.roaster}
                        </span>
                        <span className="font-mono font-bold text-stone-900">
                          £{m.recommendedBean.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-stone-900">
                        {m.recommendedBean.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {m.recommendedBean.tastingNotes.join(' · ')}
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onSelectBean(m.recommendedBean!);
                        }}
                        className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-stone-900 text-white text-[11px] font-semibold hover:bg-stone-800 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Reserve This Bag</span>
                      </button>
                    </div>
                  )}

                  <span className="text-[9px] text-stone-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-stone-200 text-stone-400 text-xs w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-3 py-2 bg-stone-100/60 border-t border-stone-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(p)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-[10px] text-stone-700 whitespace-nowrap hover:bg-stone-50 font-medium transition-colors shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about roasts, notes, or brewing..."
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-40 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
