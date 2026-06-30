import React from "react";
import { 
  Activity, 
  CheckCircle, 
  HelpCircle, 
  BarChart4, 
  FileCode, 
  AlertCircle,
  HelpCircle as QuestionIcon,
  Flame,
  Binary
} from "lucide-react";
import { Message, ResponseMetrics } from "./types";
import { AppLanguage, TRANSLATIONS } from "./translations";

interface PerformanceInspectorProps {
  lastMessage: Message | null;
  candorLevel: number;
  language: AppLanguage;
}

export default function PerformanceInspector({ lastMessage, candorLevel, language }: PerformanceInspectorProps) {
  const metrics: ResponseMetrics | null = lastMessage?.metrics || null;
  const t = TRANSLATIONS[language];

  // Render state when no metrics are available yet
  if (!lastMessage || !metrics) {
    return (
      <div className="w-80 border-l border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col h-full p-6 select-none font-sans" id="perf-inspector-empty">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-900">
          <Activity className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
            {t.constraintTracker}
          </h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
            <BarChart4 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t.awaitingCollaboration}
            </h3>
            <p className="text-[11px] text-slate-400 max-w-[180px] mx-auto mt-1 leading-normal">
              {t.awaitingDesc}
            </p>
          </div>
        </div>

        {/* Cheat-sheet bottom container */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            {t.rulesReference}
          </span>
          <div className="space-y-2 text-[10px] text-slate-500 leading-normal">
            <div className="flex gap-1.5">
              <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                {language === "en" ? (
                  <><strong>Rule 1 (Completion):</strong> No follow-ups if prompt is self-contained.</>
                ) : language === "si" ? (
                  <><strong>රීති 1 (සම්පූර්ණ කිරීම):</strong> ප්‍රශ්නය ස්වයං-ප්‍රමාණවත් නම් අමතර විමසීම් නොකරයි.</>
                ) : (
                  <><strong>விதி 1 (நிறைவு):</strong> கேள்வி முழுமையாக இருந்தால் கூடுதல் கேள்விகள் இல்லை.</>
                )}
              </span>
            </div>
            <div className="flex gap-1.5">
              <QuestionIcon className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
              <span>
                {language === "en" ? (
                  <><strong>Rule 2 (Expert Guidance):</strong> Exactly one follow-up question if prompt is broad.</>
                ) : language === "si" ? (
                  <><strong>රීති 2 (විශේෂඥ මගපෙන්වීම):</strong> ප්‍රශ්නය පුළුල් විෂයයක් නම් හරියටම එක් අමතර ප්‍රශ්නයක් විමසයි.</>
                ) : (
                  <><strong>விதி 2 (நிபுணர் வழிகாட்டுதல்):</strong> கேள்வி பொதுவானதாக இருந்தால் சரியாக ஒரு தொடர் கேள்வி கேட்கப்படும்.</>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formatting evaluation percentages
  const calculateFormattingScore = () => {
    let score = 20; // baseline
    if (metrics.headersCount > 0) score += 20;
    if (metrics.bulletsCount > 0) score += 20;
    if (metrics.tablesCount > 0) score += 20;
    if (metrics.boldPhrasesCount > 0) score += 10;
    if (metrics.hasLaTeX) score += 10;
    return Math.min(score, 100);
  };

  const formattingScore = calculateFormattingScore();

  return (
    <div className="w-80 border-l border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col h-full overflow-hidden select-none font-sans" id="perf-inspector-panel">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
            {t.constraintTracker}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded font-semibold">
          {t.evaluated}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Active Constraint Rule Card */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            {t.activePromptRulebook}
          </label>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${
                metrics.ruleApplied.includes("Rule 1") 
                  ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                  : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
              }`}>
                {metrics.ruleApplied.includes("Rule 1") ? (
                  <CheckCircle className="w-4.5 h-4.5" />
                ) : (
                  <QuestionIcon className="w-4.5 h-4.5" />
                )}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {metrics.ruleApplied.includes("Rule 1") 
                    ? (language === "en" ? "Rule 1: Completion" : language === "si" ? "රීති 1: සම්පූර්ණ කිරීම" : "விதி 1: நிறைவு") 
                    : (language === "en" ? "Rule 2: Expert Guidance" : language === "si" ? "රීති 2: විශේෂඥ මගපෙන්වීම" : "விதி 2: நிபுணர் வழிகாட்டுதல்")}
                </h3>
                <span className="text-[9px] text-slate-400 block font-mono mt-0.5">
                  {metrics.ruleApplied.includes("Rule 1") 
                    ? (language === "en" ? "Definitive task completed without trailing question." : language === "si" ? "ප්‍රශ්නය ස්වයං-ප්‍රමාණවත් නිසා අමතර විමසීම් නොමැත." : "கேள்விக்குத் தகுந்தவாறு பதில் வழங்கப்பட்டது, தொடர் கேள்வி இல்லை.")
                    : (language === "en" ? "Broad query followed up with exactly one question." : language === "si" ? "පුළුල් විෂයයක් නිසා හරියටම එක් අමතර ප්‍රශ්නයක් විමසා ඇත." : "பொதுவான கேள்வி என்பதால் சரியாக ஒரு தொடர் கேள்வி கேட்கப்பட்டுள்ளது.")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Readability Metrics Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              {t.readabilityScore}
            </label>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {formattingScore}%
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500" 
              style={{ width: `${formattingScore}%` }}
            />
          </div>

          {/* Individual elements table / counters */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[9px] font-medium text-slate-400 block">{t.headers} (##, ###)</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                {metrics.headersCount}
              </span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[9px] font-medium text-slate-400 block">{t.bulletItems}</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                {metrics.bulletsCount}
              </span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[9px] font-medium text-slate-400 block">{t.structuredTables}</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                {metrics.tablesCount}
              </span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[9px] font-medium text-slate-400 block">LaTeX Math</span>
              <span className={`text-sm font-bold font-mono mt-0.5 block ${metrics.hasLaTeX ? "text-amber-600" : "text-slate-800 dark:text-slate-200"}`}>
                {metrics.hasLaTeX ? t.detected : t.none}
              </span>
            </div>
          </div>
        </div>

        {/* Style and Empathy Indicator */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            {t.candorBalanceAudit}
          </label>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-500">{t.empathy}</span>
              <span className="text-rose-500">{t.candor}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300" 
                style={{ width: `${(6 - candorLevel) * 20}%` }}
              />
              <div 
                className="bg-rose-500 h-full transition-all duration-300" 
                style={{ width: `${(candorLevel) * 20}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-normal pt-1">
              {language === "en" 
                ? `Currently tuned to ${candorLevel === 1 ? "Warm, patient validation" : candorLevel === 5 ? "Radical objective critique" : "Balanced, constructive peer-collaboration"} style.`
                : language === "si"
                ? `දැනට ${candorLevel === 1 ? "සුහදශීලී සහ අනුකම්පාව සහිත" : candorLevel === 5 ? "සෘජු, පරම සත්‍යවාදී සහ විවේචනාත්මක" : "සමබර සහ සුහදශීලී සහයෝගීතා"} රටාවට සකසා ඇත.`
                : `தற்போது ${candorLevel === 1 ? "அதிக இரக்கம் மற்றும் ஆதரவு" : candorLevel === 5 ? "முழுமையான மற்றும் கடுமையான விமர்சனம்" : "சமநிலையான மற்றும் பயனுள்ள"} முறையில் இயங்குகிறது.`}
            </p>
          </div>
        </div>

        {/* LaTeX syntax snippet helper */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Binary className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t.mathCheatsheet}</span>
          </span>
          <p className="text-[10px] text-slate-500 leading-normal">
            {t.mathDesc}
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl text-[10px] font-mono text-slate-600 dark:text-slate-400 space-y-1 select-all">
            <div>{"$E = mc^2$"}</div>
            <div>{"$a^2 + b^2 = c^2$"}</div>
            <div>{"$f(x) = \\int_{-\\infty}^{\\infty} e^{-x^2} dx$"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
