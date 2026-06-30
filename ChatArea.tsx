import React, { useRef, useEffect } from "react";
import { 
  Send, 
  Sparkles, 
  ArrowDownCircle, 
  HelpCircle,
  Clock,
  ChevronRight,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  MessageSquareOff,
  Copy,
  Check,
  Download
} from "lucide-react";
import { Message, ChatSession, SystemPreset } from "./types";
import { AppLanguage, TRANSLATIONS } from "./translations";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatAreaProps {
  session: ChatSession;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  activePreset: SystemPreset;
  language: AppLanguage;
}

const getLocalizedSuggestions = (language: AppLanguage) => {
  if (language === "si") {
    return [
      { label: "වර්ගජ සමීකරණ විසඳීම", text: "වර්ගජ සමීකරණ සූත්‍රය $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$ පැහැදිලි කර $x^2 - 5x + 6 = 0$ සමීකරණය විසඳන්න." },
      { label: "Rust සහ Go සැසඳීම", text: "ඉතා වේගවත් backend microservice එකක් සඳහා මා තෝරාගත යුත්තේ Rust ද Go ද? මතක ආරක්ෂාව (memory safety), වේගය සහ ඉගෙනීමේ අපහසුතාව සැසඳීමක් කරන්න." },
      { label: "React State Hook නිවැරදි කිරීම", text: "මෙම කේතය පරීක්ෂා කරන්න. මම React state එක කෙලින්ම component body එක තුල වෙනස් කරමින් සිටින නිසා infinite re-renders වෙනවා." },
      { label: "නව SaaS අදහස්", text: "AI ආධාරයෙන් පළාත් පාලන සැලසුම්කරණය සඳහා සුවිශේෂී SaaS නිෂ්පාදන අදහස් තුනක් ලබා දෙන්න." }
    ];
  } else if (language === "ta") {
    return [
      { label: "இருபடிச் சமன்பாடு தீர்வு", text: "இருபடிச் சமன்பாடு சூத்திரத்தை $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$ விளக்கி $x^2 - 5x + 6 = 0$ ஐ தீர்க்கவும்." },
      { label: "Rust மற்றும் Go ஒப்பீடு", text: "உயர் செயல்திறன் கொண்ட பின்தளத்திற்கு (backend) நான் Rust அல்லது Go தேர்ந்தெடுக்க வேண்டுமா? நினைவக பாதுகாப்பு, வேகம் மற்றும் கற்றல் வளைவு ஆகியவற்றை ஒப்பிடுக." },
      { label: "React State Hook திருத்தம்", text: "இந்த குறியீட்டை மதிப்பாய்வு செய்ய முடியுமா? நான் React ஸ்டேட்டை நேரடியாக காம்போனென்ட் பாடியில் அப்டேட் செய்வதால் அதிக ரீ-ரெண்டர்கள் கிடைக்கின்றன." },
      { label: "SaaS யோசனைகள்", text: "AI-உதவியுடன் கூடிய உள்ளூர் அரசாங்க திட்டமிடலை மையமாகக் கொண்ட மூன்று தனித்துவமான SaaS தயாரிப்பு யோசனைகளை எனக்கு வழங்கவும்." }
    ];
  }
  return [
    { label: "Solve Quadratic Formula", text: "Explain the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$ and solve $x^2 - 5x + 6 = 0$." },
    { label: "Compare Rust & Go", text: "Should I choose Rust or Go for a high-performance backend microservice? Compare them across memory safety, speed, and learning curve." },
    { label: "Refine React State Hook", text: "Can you review this code? I'm updating React state in the component body directly and getting too many re-renders." },
    { label: "Brainstorm SaaS Ideas", text: "Help me brainstorm three unique SaaS product ideas centered around AI-assisted local government planning." }
  ];
};

export default function ChatArea({
  session,
  onSendMessage,
  isLoading,
  activePreset,
  language,
}: ChatAreaProps) {
  const [inputText, setInputText] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [copiedMessageId, setCopiedMessageId] = React.useState<string | null>(null);
  const [exported, setExported] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  const handleCopyMessage = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const exportChatSession = () => {
    const markdown = session.messages
      .map(m => `### ${m.role === "user" ? "User" : `AI Collaborator (${m.metrics?.ruleApplied || "Assistant"})`}\n*Date: ${new Date(m.timestamp).toLocaleString()}*\n\n${m.content}\n\n---`)
      .join("\n\n");
    
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const formattedTitle = (session.title || "Collaboration-Canvas")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    link.href = url;
    link.setAttribute("download", `synapse-chat-${formattedTitle || "session"}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const getLocalizedPresetName = (presetId: string, defaultName: string) => {
    if (presetId === "helpful_generalist") {
      return language === "en" ? "Generalist" : language === "si" ? "පොදු සහකරු" : "பொது உதவியாளர்";
    } else if (presetId === "technical_sandbox") {
      return language === "en" ? "Tech Sandbox" : language === "si" ? "තාක්ෂණික සෑන්ඩ්බොක්ස්" : "தொழில்நுட்ப தளம்";
    } else if (presetId === "strategic_blueprint") {
      return language === "en" ? "Strategic Blueprint" : language === "si" ? "උපායමාර්ගික සැලසුම්" : "மூலோபாய திட்டம்";
    } else if (presetId === "candid_auditor") {
      return language === "en" ? "Candid Auditor" : language === "si" ? "විවේචනාත්මක සහකරු" : "விமர்சகர்";
    }
    return defaultName;
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const copySessionToMarkdown = () => {
    const markdown = session.messages
      .map(m => `### ${m.role === "user" ? "User" : "AI Collaborator"}\n\n${m.content}\n\n---`)
      .join("\n\n");
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden" id="chat-area">
      {/* Upper Status Ribbon */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between bg-slate-50/20 dark:bg-slate-950/20">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm font-sans">
              {session.title || t.canvasTitle}
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider font-mono">
              {getLocalizedPresetName(activePreset.id, activePreset.name)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-lg font-sans">
            {t.calibratedAt} {session.candorLevel}/5
          </p>
        </div>

        {session.messages.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportChatSession}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer shadow-sm"
              id="export-canvas-btn"
            >
              {exported ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.exported}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportChat}</span>
                </>
              )}
            </button>

            <button
              onClick={copySessionToMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              id="copy-canvas-btn"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <ClipboardCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.copyMarkdown}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Message Ledger / Interactive Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef} id="chat-messages-container">
        {session.messages.length === 0 ? (
          <div className="max-w-2xl mx-auto my-12 space-y-8 animate-fadeIn" id="empty-state-intro">
            {/* Elegant Splash introduction */}
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
                {t.meetPartner}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
                {t.introDesc}
              </p>
            </div>

            {/* Quick Suggestions Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans px-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.testRules}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="suggestions-box">
                {getLocalizedSuggestions(language).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(suggestion.text)}
                    className="flex flex-col text-left p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-all cursor-pointer group"
                    id={`suggestion-card-${idx}`}
                  >
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 font-sans flex items-center justify-between w-full">
                      {suggestion.label}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal font-sans">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6" id="messages-list">
            {session.messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
                  id={`message-row-${msg.id}`}
                >
                  {/* Left Avatar for Collaborator */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs shadow-md shrink-0 font-sans">
                      AI
                    </div>
                  )}

                  {/* Bubble content */}
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                    isUser
                      ? "bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-950 font-sans shadow-sm"
                      : "bg-slate-50/80 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 text-slate-800 dark:text-slate-200 shadow-xs"
                    }`}
                  >
                    {isUser ? (
                      <p className="text-sm font-sans leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="text-sm font-sans">
                        <MarkdownRenderer content={msg.content} language={language} />
                      </div>
                    )}
                    
                    {/* Timestamp & metadata */}
                    <div className="flex items-center justify-between gap-4 mt-2.5 pt-1.5 border-t border-slate-200/10 text-[10px] text-slate-400 font-mono">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(msg.timestamp)}
                        </span>
                        
                        {!isUser && (
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-slate-200/20 dark:hover:bg-slate-800/40"
                            title={t.copy}
                            id={`copy-msg-btn-${msg.id}`}
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">{t.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{t.copy}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      
                      {/* Active metric constraints tag */}
                      {!isUser && msg.metrics && (
                        <span className={`px-1.5 py-0.5 rounded font-semibold text-[9px] ${
                          msg.metrics.ruleApplied.includes("Rule 1") 
                            ? "bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400"
                            : "bg-amber-50/50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                        }`}>
                          {msg.metrics.ruleApplied}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Avatar for User */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold flex items-center justify-center text-xs shrink-0 font-sans">
                      ME
                    </div>
                  )}
                </div>
              );
            })}

            {/* Simulated Live Loading with progress descriptors */}
            {isLoading && (
              <div className="flex gap-4 justify-start animate-pulse" id="loading-card">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/30 text-indigo-400 font-semibold flex items-center justify-center text-xs shrink-0 font-sans">
                  AI
                </div>
                <div className="max-w-[70%] bg-slate-50/40 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-900/40 rounded-2xl px-5 py-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">
                      {t.thinking}
                    </span>
                  </div>
                  <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-3 w-32 bg-slate-100 dark:bg-slate-850 rounded-md" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Message Input Box */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/40 dark:bg-slate-950/40">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={
              language === "en" 
                ? `Ask ${getLocalizedPresetName(activePreset.id, activePreset.name).toLowerCase()} a question...` 
                : language === "si" 
                ? `${getLocalizedPresetName(activePreset.id, activePreset.name)} වෙතින් ප්‍රශ්නයක් විමසන්න...` 
                : `${getLocalizedPresetName(activePreset.id, activePreset.name)} இடம் கேள்வி கேட்கவும்...`
            }
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600/50 focus:border-indigo-600/50 disabled:bg-slate-50 dark:disabled:bg-slate-950/40 disabled:text-slate-400 pr-12 font-sans shadow-xs"
            id="chat-message-input"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 cursor-pointer"
            title="Send message"
            id="send-message-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="max-w-3xl mx-auto flex items-center justify-between mt-2.5 px-1 text-[10px] text-slate-400 font-mono">
          <span>
            {language === "en"
              ? "Active Rules: Rule 1 (Complete) vs Rule 2 (Expert Guidance)"
              : language === "si"
              ? "සක්‍රීය රීති: රීති 1 (සම්පූර්ණ) සහ රීති 2 (විශේෂඥ මගපෙන්වීම)"
              : "செயலில் உள்ள விதிகள்: விதி 1 (முழுமையானது) மற்றும் விதி 2 (நிபுணர் வழிகாட்டுதல்)"}
          </span>
          <span>AI can make mistakes!</span>
        </div>
      </div>
    </div>
  );
}
