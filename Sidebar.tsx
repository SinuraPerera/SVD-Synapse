import React from "react";
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Sliders, 
  Sparkles, 
  Cpu, 
  Layers, 
  HeartHandshake, 
  Undo,
  Info,
  Compass,
  Sun,
  Moon,
  Languages
} from "lucide-react";
import { ChatSession, SystemPreset } from "./types";
import { AppLanguage, TRANSLATIONS } from "./translations";

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onCreateSession: (preset?: SystemPreset, candor?: number) => void;
  onDeleteSession: (id: string) => void;
  candorLevel: number;
  onUpdateCandor: (level: number) => void;
  presetStyle: "balanced" | "technical" | "strategic" | "creative";
  onUpdateStyle: (style: "balanced" | "technical" | "strategic" | "creative") => void;
  presets: SystemPreset[];
  activePreset: SystemPreset;
  onSelectPreset: (preset: SystemPreset) => void;
  systemInstruction: string;
  onUpdateInstruction: (instruction: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  language: AppLanguage;
  onToggleLanguage: (lang: AppLanguage) => void;
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  candorLevel,
  onUpdateCandor,
  presetStyle,
  onUpdateStyle,
  presets,
  activePreset,
  onSelectPreset,
  systemInstruction,
  onUpdateInstruction,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}: SidebarProps) {
  const [showConfig, setShowConfig] = React.useState(false);

  // Candor descriptions
  const getCandorLabel = (level: number) => {
    const t = TRANSLATIONS[language];
    switch (level) {
      case 1: return { label: language === "en" ? "High Empathy" : language === "si" ? "ඉතා සංවේදී" : "அதிக இரக்கம்", desc: t.candorLevelDesc1, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" };
      case 2: return { label: language === "en" ? "Balanced" : language === "si" ? "සමබර" : "சமநிலை", desc: t.candorLevelDesc2, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" };
      case 3: return { label: language === "en" ? "Socratic Debugger" : language === "si" ? "සොක්‍රටීස් විලාසය" : "சாக்ரடீஸ் விவாதம்", desc: t.candorLevelDesc3, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" };
      case 4: return { label: language === "en" ? "Direct Candor" : language === "si" ? "සෘජු සහ අවංක" : "நேரடி நேர்மை", desc: t.candorLevelDesc4, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/20" };
      case 5: return { label: language === "en" ? "Radical Truth" : language === "si" ? "පරම සත්‍යවාදී" : "உண்மையான பதில்", desc: t.candorLevelDesc5, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20" };
      default: return { label: language === "en" ? "Balanced" : language === "si" ? "සමබර" : "சமநிலை", desc: "", color: "" };
    }
  };

  const getLocalizedPresetInfo = (presetId: string, defaultName: string, defaultDesc: string) => {
    if (presetId === "helpful_generalist") {
      return {
        name: language === "en" ? "Generalist" : language === "si" ? "පොදු සහකරු" : "பொது உதவியாளர்",
        desc: language === "en" ? "Balanced, responsive general-purpose buddy" : language === "si" ? "පොදු වැඩ සඳහා සමබර සහකරු" : "சமநிலையான பொது உதவியாளர்"
      };
    } else if (presetId === "technical_sandbox") {
      return {
        name: language === "en" ? "Tech Sandbox" : language === "si" ? "තාක්ෂණික සෑන්ඩ්බොක්ස්" : "தொழில்நுட்ப தளம்",
        desc: language === "en" ? "Deep dive into code, math formulas, and tables" : language === "si" ? "කේත, සූත්‍ර සහ වගු සඳහා" : "குறியீடு மற்றும் கணிதம்"
      };
    } else if (presetId === "strategic_blueprint") {
      return {
        name: language === "en" ? "Strategic Blueprint" : language === "si" ? "උපායමාර්ගික සැලසුම්" : "மூலோபாய திட்டம்",
        desc: language === "en" ? "Brainstorm concepts with exact follow-ups" : language === "si" ? "විමසීම් සමග අදහස් සැලසුම් කිරීම" : "கருத்துக்களை உருவாக்குதல்"
      };
    } else if (presetId === "candid_auditor") {
      return {
        name: language === "en" ? "Candid Auditor" : language === "si" ? "විවේචනාත්මක සහකරු" : "விமர்சகர்",
        desc: language === "en" ? "Ruthless critique focused on flaws" : language === "si" ? "වැරදි සහ අඩුපාඩු පෙන්වා දෙන සහකරු" : "குறைபாடுகளை கண்டறிதல்"
      };
    }
    return { name: defaultName, desc: defaultDesc };
  };

  const currentCandor = getCandorLabel(candorLevel);
  const t = TRANSLATIONS[language];

  return (
    <aside className="w-80 border-r border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col h-full overflow-hidden select-none" id="app-sidebar">
      {/* Upper Brand Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-slate-100 text-sm tracking-tight font-sans">
              {t.brandTitle}
            </h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              {t.brandSub} v1.0
            </span>
          </div>
        </div>
        <button
          onClick={() => onCreateSession()}
          className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all cursor-pointer"
          title="New Collaboration Session"
          id="new-session-header-btn"
        >
          <Plus className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Primary Sidebar Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Sessions Stack */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans">
            <span>{t.collaborations}</span>
            <span>{sessions.length}</span>
          </div>
          
          <div className="space-y-1" id="sessions-list">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/40 dark:border-slate-800/40 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/30 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                  onClick={() => onSelectSession(session.id)}
                  id={`session-item-${session.id}`}
                >
                  <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                  <span className="text-xs truncate pr-6 block font-sans">
                    {session.title || t.emptyCollaborations}
                  </span>

                  {sessions.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                      className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                      title="Delete Session"
                      id={`delete-btn-${session.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sandbox Configuration Slider */}
        <div className="bg-slate-100/40 dark:bg-slate-900/10 rounded-2xl p-4 border border-slate-200/30 dark:border-slate-800/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-sans">
              <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.sandboxTuning}</span>
            </div>
            <button 
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              id="toggle-instructions-btn"
            >
              {showConfig ? t.hideRules : t.editRules}
            </button>
          </div>

          {/* Active Preset Selection Card */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
              {t.behaviorPreset}
            </label>
            <div className="grid grid-cols-2 gap-1.5" id="preset-selector-grid">
              {presets.map((preset) => {
                const isSelected = activePreset.id === preset.id;
                const localized = getLocalizedPresetInfo(preset.id, preset.name, preset.description);
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-indigo-600/30 dark:border-indigo-400/30 text-slate-900 dark:text-white shadow-sm"
                        : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                    id={`preset-btn-${preset.id}`}
                  >
                    <span className="text-xs font-semibold font-sans">{localized.name}</span>
                    <span className="text-[9px] text-slate-400 truncate w-full mt-0.5">{localized.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Candor Calibration Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
                {t.empathyCandorBalance}
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${currentCandor.color}`}>
                {candorLevel}/5
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={candorLevel}
              onChange={(e) => onUpdateCandor(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
              id="candor-slider"
            />
            
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {currentCandor.label}
              </p>
              <p className="text-[10px] text-slate-400 leading-normal">
                {currentCandor.desc}
              </p>
            </div>
          </div>

          {/* System Instructions Manual Editor Override */}
          {showConfig && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
                  {t.activePromptRulebook}
                </span>
                <button
                  onClick={() => onUpdateInstruction(activePreset.instruction)}
                  className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  title="Reset to original guidelines"
                  id="reset-preset-btn"
                >
                  <Undo className="w-3 h-3" />
                  <span>{t.reset}</span>
                </button>
              </div>
              <textarea
                value={systemInstruction}
                onChange={(e) => onUpdateInstruction(e.target.value)}
                rows={6}
                className="w-full p-2 text-[11px] font-mono rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-600/50 resize-none leading-relaxed"
                id="system-instruction-textarea"
              />
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="bg-slate-100/40 dark:bg-slate-900/10 rounded-2xl p-4 border border-slate-200/30 dark:border-slate-800/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Language / භාෂාව / தமிழ்</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono uppercase">
              {language === "en" ? "English" : language === "si" ? "සිංහල" : "தமிழ்"}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-1" id="language-toggle-container">
            <button
              onClick={() => onToggleLanguage("en")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                language === "en"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              id="lang-en-btn"
            >
              <span>EN</span>
            </button>
            <button
              onClick={() => onToggleLanguage("si")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                language === "si"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              id="lang-si-btn"
            >
              <span>සිංහල</span>
            </button>
            <button
              onClick={() => onToggleLanguage("ta")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                language === "ta"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              id="lang-ta-btn"
            >
              <span>தமிழ்</span>
            </button>
          </div>
        </div>

        {/* Appearance Theme Switcher */}
        <div className="bg-slate-100/40 dark:bg-slate-900/10 rounded-2xl p-4 border border-slate-200/30 dark:border-slate-800/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
              {t.appearanceTheme}
            </span>
            <span className="text-[9px] text-slate-400 font-mono uppercase">
              {theme === "dark" ? t.darkMode : t.lightMode}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-1" id="theme-toggle-container">
            <button
              onClick={theme === "light" ? undefined : onToggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              id="theme-light-btn"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.lightMode}</span>
            </button>
            <button
              onClick={theme === "dark" ? undefined : onToggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              id="theme-dark-btn"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t.darkMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empathetic & Candid AI Collaborator Identity footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-slate-100/20 dark:bg-slate-900/10">
        <div className="flex gap-2.5 items-start">
          <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
            {t.personalAIPartnerDesc}
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between text-[10px] text-slate-400 font-sans">
          <span>SVD Personal AI Client</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t.developedBy}</span>
        </div>
      </div>
    </aside>
  );
}
