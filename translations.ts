export type AppLanguage = "en" | "si" | "ta";

export interface TranslationSet {
  brandTitle: string;
  brandSub: string;
  collaborations: string;
  sandboxTuning: string;
  hideRules: string;
  editRules: string;
  behaviorPreset: string;
  empathyCandorBalance: string;
  activePromptRulebook: string;
  reset: string;
  appearanceTheme: string;
  lightMode: string;
  darkMode: string;
  personalAIPartnerDesc: string;
  developedBy: string;
  canvasTitle: string;
  presetText: string;
  calibratedAt: string;
  copyMarkdown: string;
  copied: string;
  meetPartner: string;
  introDesc: string;
  testRules: string;
  thinking: string;
  askPlaceholder: string;
  activeRulesFooter: string;
  constraintTracker: string;
  evaluated: string;
  awaitingCollaboration: string;
  awaitingDesc: string;
  rulesReference: string;
  rule1Desc: string;
  rule2Desc: string;
  readabilityScore: string;
  headers: string;
  bulletItems: string;
  structuredTables: string;
  latexMath: string;
  candorBalanceAudit: string;
  empathy: string;
  candor: string;
  candorLevelDesc1: string;
  candorLevelDesc2: string;
  candorLevelDesc3: string;
  candorLevelDesc4: string;
  candorLevelDesc5: string;
  mathCheatsheet: string;
  mathDesc: string;
  emptyCollaborations: string;
  detected: string;
  none: string;
  copy: string;
  exportChat: string;
  exported: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationSet> = {
  en: {
    brandTitle: "SVD Synapse",
    brandSub: "PERSONAL AI CLIENT",
    collaborations: "Collaborations",
    sandboxTuning: "Sandbox Tuning",
    hideRules: "Hide Rules",
    editRules: "Edit Rules",
    behaviorPreset: "Behavior Preset",
    empathyCandorBalance: "Empathy-Candor Balance",
    activePromptRulebook: "Active Prompt Rulebook",
    reset: "Reset",
    appearanceTheme: "Appearance / Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    personalAIPartnerDesc: "Your personal AI partner calibrates responses to balance deep empathy with supportive candor, outputting precise information.",
    developedBy: "Developed by SVD Group",
    canvasTitle: "Collaboration Canvas",
    presetText: "Preset",
    calibratedAt: "Calibrated at Candor level",
    copyMarkdown: "Copy Markdown",
    copied: "Copied!",
    meetPartner: "Meet your Personal AI Collaborator",
    introDesc: "Ask broad planning questions, requests for technical coding scripts, complex mathematical problems, or seek honest feedback.",
    testRules: "Test rules and equations",
    thinking: "Thinking...",
    askPlaceholder: "Ask a question...",
    activeRulesFooter: "Active Rules: Rule 1 (Complete) vs Rule 2 (Expert Guidance)",
    constraintTracker: "Constraint Tracker",
    evaluated: "EVALUATED",
    awaitingCollaboration: "Awaiting Collaboration",
    awaitingDesc: "Send a prompt to analyze the AI's structural guidelines and rule compliance.",
    rulesReference: "Rules Reference",
    rule1Desc: "Rule 1 (Completion): No follow-ups if prompt is self-contained.",
    rule2Desc: "Rule 2 (Expert Guidance): Exactly one follow-up question if prompt is broad.",
    readabilityScore: "Readability Score",
    headers: "Headers (##, ###)",
    bulletItems: "Bullet Items",
    structuredTables: "Structured Tables",
    latexMath: "LaTeX Math",
    candorBalanceAudit: "Candor Balance Audit",
    empathy: "Empathy",
    candor: "Candor",
    candorLevelDesc1: "Warm, gentle guidance and encouraging feedback.",
    candorLevelDesc2: "Friendly collaborator; combines positive reinforcement with constructive critique.",
    candorLevelDesc3: "Thoughtful feedback focusing on uncovering structural blind spots.",
    candorLevelDesc4: "Pragmatic, concise, and focused purely on efficiency and performance.",
    candorLevelDesc5: "Stripped of filler text. Highly critical of flaws, absolute efficiency.",
    mathCheatsheet: "Math Cheat-sheet",
    mathDesc: "To view math rendering, type formulas wrapped in dollar signs ($).",
    emptyCollaborations: "Empty Collaboration",
    detected: "Detected",
    none: "None",
    copy: "Copy",
    exportChat: "Export Chat",
    exported: "Exported!"
  },
  si: {
    brandTitle: "SVD Synapse",
    brandSub: "පෞද්ගලික කෘත්‍රිම බුද්ධි සහකරු",
    collaborations: "සංවාදයන්",
    sandboxTuning: "සෑන්ඩ්බොක්ස් සැකසුම් (Tuning)",
    hideRules: "නීති සඟවන්න",
    editRules: "නීති සකසන්න",
    behaviorPreset: "හැසිරීම් රටා Preset",
    empathyCandorBalance: "සංවේදනය - අවංකභාවය සමබරතාවය",
    activePromptRulebook: "සක්‍රීය ප්‍රොම්ප්ට් නීති පද්ධතිය",
    reset: "යළි පිහිටුවන්න",
    appearanceTheme: "පෙනුම සහ තේමාව (Theme)",
    lightMode: "දිවා ආලෝකය",
    darkMode: "රාත්‍රී අඳුර",
    personalAIPartnerDesc: "ඔබගේ පෞද්ගලික AI සහකරු සංවේදනය සහ අවංකභාවය මනාව ගළපමින් ඔබට නිවැරදිම දත්ත සපයයි.",
    developedBy: "SVD සමූහය විසින් නිර්මාණය කරන ලදී",
    canvasTitle: "සංවාද මණ්ඩපය",
    presetText: "රටාව",
    calibratedAt: "සමතුලිතතාවය",
    copyMarkdown: "Markdown පිටපත් කරන්න",
    copied: "පිටපත් කෙරුණි!",
    meetPartner: "ඔබගේ පෞද්ගලික AI සහකරු හමුවන්න",
    introDesc: "පළල් සැලසුම්, කෝඩින් විසඳුම්, සංකීර්ණ ගණිත ගැටලු හෝ සත්‍යවාදී විවේචනාත්මක අදහස් විමසන්න.",
    testRules: "පද්ධති නීති සහ සූත්‍ර පරීක්ෂා කරන්න",
    thinking: "සිතමින් පවතී...",
    askPlaceholder: "ප්‍රශ්නයක් අසන්න (Gammata hadමු!)...",
    activeRulesFooter: "සක්‍රීය නීති: නීතිය 1 (පරිපූර්ණ) සහ නීතිය 2 (විශේෂඥ මගපෙන්වීම)",
    constraintTracker: "සීමා කිරීම් නිරීක්ෂකය",
    evaluated: "ඇගයූවා",
    awaitingCollaboration: "සංවාදය ඇරඹීමට සූදානම්",
    awaitingDesc: "AI හි ව්‍යුහාත්මක රීති අනුකූලතාවය සහ කාර්ය සාධනය විශ්ලේෂණය කිරීමට පණිවිඩයක් එවන්න.",
    rulesReference: "පද්ධති නීති කෙටි සටහන",
    rule1Desc: "නීතිය 1 (පරිපූර්ණ): කාර්යය ස්වයං-පරිපූර්ණ නම් අමතර ප්‍රශ්න නොඅසයි.",
    rule2Desc: "නීතිය 2 (විශේෂඥ මගපෙන්වීම): ප්‍රශ්නය පුළුල් එකක් නම්, මගපෙන්වීම සඳහා තවත් එක් ප්‍රශ්නයක් අසයි.",
    readabilityScore: "කියවීමේ පහසුව",
    headers: "මාතෘකා (##, ###)",
    bulletItems: "ලැයිස්තු අයිතම (Bullets)",
    structuredTables: "ව්‍යුහාත්මක වගු",
    latexMath: "LaTeX ගණිත සූත්‍ර",
    candorBalanceAudit: "අවංකභාවයේ සමතුලිතතාවය",
    empathy: "සංවේදනය (Empathy)",
    candor: "අවංකභාවය (Candor)",
    candorLevelDesc1: "ඉතා සුහදශීලී, සන්සුන් සහ ධෛර්යමත් කරන සුළු මගපෙන්වීම්.",
    candorLevelDesc2: "මිත්‍රශීලී සහයෝගීතාවය; ධනාත්මක ඇගයීම් සමග නිර්මාණාත්මක විවේචන.",
    candorLevelDesc3: "තාර්කික දුර්වලතා සහ සැඟවුණු ප්‍රශ්න ඉස්මතු කරන සොක්‍රටීස් විලාසයේ ප්‍රතිචාර.",
    candorLevelDesc4: "කෙටි, සෘජු සහ සම්පූර්ණයෙන්ම කාර්යක්ෂමතාවය ඉලක්ක කරගත් ප්‍රතිචාර.",
    candorLevelDesc5: "අනවශ්‍ය වදන්වලින් තොර, දුර්වලතා සෘජුවම පෙන්වන පරම සත්‍යවාදී ප්‍රතිචාර (Gammata Machan!).",
    mathCheatsheet: "ගණිත සූත්‍ර සටහන",
    mathDesc: "ගණිත සූත්‍ර දර්ශනය කිරීමට ඒවා ඩොලර් සලකුණු ($) මගින් වට කරන්න.",
    emptyCollaborations: "හිස් සංවාදයක්",
    detected: "හඳුනාගැනිණි",
    none: "නොමැත",
    copy: "පිටපත් කරන්න",
    exportChat: "සංවාදය අපනයනය",
    exported: "අපනයනය කෙරුණි!"
  },
  ta: {
    brandTitle: "SVD Synapse",
    brandSub: "தனிப்பட்ட AI உதவியாளர்",
    collaborations: "உரையாடல்கள்",
    sandboxTuning: "சாண்ட்பாக்ஸ் அமைப்பு (Tuning)",
    hideRules: "விதைகளை மறை",
    editRules: "விதிகளைத் திருத்து",
    behaviorPreset: "நடத்தை முன்னமைப்பு (Preset)",
    empathyCandorBalance: "இரக்கம் - நேர்மை சமநிலை",
    activePromptRulebook: "செயலில் உள்ள விதிமுறை புத்தகம்",
    reset: "மீட்டமை",
    appearanceTheme: "தோற்றம் மற்றும் தீம் (Theme)",
    lightMode: "ஒளி பயன்முறை",
    darkMode: "இருள் பயன்முறை",
    personalAIPartnerDesc: "உங்கள் தனிப்பட்ட AI துணை, ஆழ்ந்த இரக்கத்திற்கும் நேர்மைக்கும் இடையே பதில்களை சமநிலைப்படுத்தி, துல்லியமான தகவலை வழங்குகிறது.",
    developedBy: "SVD குழுமத்தால் உருவாக்கப்பட்டது",
    canvasTitle: "உரையாடல் தளம்",
    presetText: "முன்னமைப்பு",
    calibratedAt: "சமநிலைப்படுத்தப்பட்டது",
    copyMarkdown: "Markdown நகலெடு",
    copied: "நகலெடுக்கப்பட்டது!",
    meetPartner: "உங்கள் தனிப்பட்ட AI துணையை சந்திக்கவும்",
    introDesc: "பரந்த திட்டமிடல் கேள்விகள், குறியீட்டு தீர்வுகள், சிக்கலான கணிதப் பிரச்சினைகள் அல்லது உண்மையான கருத்துக்களைக் கேளுங்கள்.",
    testRules: "விதிகள் மற்றும் கணித சூத்திரங்களை சோதிக்கவும்",
    thinking: "யோசிக்கிறது...",
    askPlaceholder: "கேள்வி கேளுங்கள்...",
    activeRulesFooter: "செயலில் உள்ள விதிகள்: விதி 1 (முழுமையான பதில்) மற்றும் விதி 2 (நிபுணர் வழிகாட்டுதல்)",
    constraintTracker: "கட்டுப்பாட்டு கண்காணிப்பாளர்",
    evaluated: "மதிப்பிடப்பட்டது",
    awaitingCollaboration: "உரையாடலுக்கு காத்திருக்கிறது",
    awaitingDesc: "AI-இன் கட்டமைப்பு விதிகள் மற்றும் இணக்கத்தை பகுப்பாய்வு செய்ய ஒரு செய்தியை அனுப்பவும்.",
    rulesReference: "விதிகள் குறிப்பு",
    rule1Desc: "விதி 1 (முழுமையான பதில்): கேள்வி முழுமையாக தீர்க்கப்பட்டால் கூடுதல் கேள்விகள் கேட்கப்படாது.",
    rule2Desc: "விதி 2 (நிபுணர் வழிகாட்டுதல்): கேள்வி பரந்ததாக இருந்தால், வழிகாட்ட சரியாக ஒரு கேள்வி கேட்கப்படும்.",
    readabilityScore: "வாசிப்புத்திறன் மதிப்பீடு",
    headers: "தலைப்புகள் (##, ###)",
    bulletItems: "பட்டியல் உருப்படிகள்",
    structuredTables: "கட்டமைக்கப்பட்ட அட்டவணைகள்",
    latexMath: "LaTeX கணிதம்",
    candorBalanceAudit: "நேர்மை சமநிலை தணிக்கை",
    empathy: "இரக்கம் (Empathy)",
    candor: "நேர்மை (Candor)",
    candorLevelDesc1: "மிகவும் அன்பான, மென்மையான மற்றும் ஊக்கமளிக்கும் வழிகாட்டுதல்.",
    candorLevelDesc2: "நட்பான உதவியாளர்; நேர்மறை வலுவூட்டல் மற்றும் ஆக்கபூர்வமான விமர்சனம்.",
    candorLevelDesc3: "கட்டமைப்பு குருட்டுப் புள்ளிகளைக் கண்டறிவதில் கவனம் செலுத்தும் சிந்தனைமிக்க கருத்து.",
    candorLevelDesc4: "சுருக்கமான, நேரடியான மற்றும் செயல்திறனில் மட்டுமே கவனம் செலுத்தும் பதில்.",
    candorLevelDesc5: "தேவையற்ற சொற்களற்ற, குறைபாடுகளை நேரடியாக சுட்டிக்காட்டும் உண்மையான பதில்.",
    mathCheatsheet: "கணித குறிப்பு",
    mathDesc: "கணித சூத்திரங்களை பார்க்க, அவற்றை டாலர் குறியீடுகளுக்குள் ($) எழுதவும்.",
    emptyCollaborations: "வெற்று உரையாடல்",
    detected: "கண்டறியப்பட்டது",
    none: "இல்லை",
    copy: "நகலெடு",
    exportChat: "உரையாடலை ஏற்றுமதி செய்",
    exported: "ஏற்றுமதி செய்யப்பட்டது!"
  }
};
