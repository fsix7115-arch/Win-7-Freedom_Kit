export interface StepItem {
  id: number;
  title: string;
  hinglishTitle: string;
  summary: string;
  command?: string;
  subCommands?: { label: string; cmd: string }[];
  fileContent?: string;
  fileName?: string;
  links?: { name: string; url: string; note: string }[];
  tips: string[];
}

export interface ScriptFile {
  name: string;
  filename: string;
  description: string;
  category: 'batch' | 'registry' | 'config';
  code: string;
}

export interface TroubleshootingItem {
  id: string;
  problem: string;
  cause: string;
  causeHinglish: string;
  solution: string;
  code?: string;
  tag: string;
}

export const SETUP_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Create D:\\AI Isolation Folders',
    hinglishTitle: 'D: Drive me AI Folders Banao',
    summary: 'C: drive ko hamesha clean aur fast rakhne ke liye D: partition par dedicated folder tree initialize karo.',
    command: 'mkdir D:\\AI\\tools D:\\AI\\workspace D:\\AI\\bin D:\\AI\\downloads',
    tips: [
      'Win + R daba kar "cmd" type karo aur Enter maaro.',
      'Agar aapke laptop me D: drive nahi hai, toh E: ya koi dusra drive letter use kar sakte ho.',
      'Folders: bin (scripts), downloads (installers), tools (ConEmu/Python), workspace (code projects).'
    ]
  },
  {
    id: 2,
    title: 'Install ConEmu Terminal',
    hinglishTitle: 'ConEmu Modern Tabbed Terminal Setup',
    summary: 'Windows 7 ka purana cmd.exe replace karke smooth, unicode-ready, lightweight tabbed terminal set karo.',
    links: [
      { name: 'ConEmu Official Site', url: 'https://conemu.github.io/', note: 'Recommended 7-Zip Portable Package' },
      { name: 'GitHub Releases', url: 'https://github.com/Maximus5/ConEmu/releases', note: 'Download ConEmuPack.*.7z or .zip' }
    ],
    tips: [
      'Archive ko D:\\AI\\tools\\ConEmu\\ me extract karo.',
      '64-bit Windows ke liye ConEmu64.exe aur 32-bit ke liye ConEmu.exe par right-click karke Desktop Shortcut bana lo.',
      'First run me default startup task "cmd" select karo.'
    ]
  },
  {
    id: 3,
    title: 'Extract Portable Python 3.8.10',
    hinglishTitle: 'Portable Python 3.8.10 (No Installer)',
    summary: 'Bina kisi messy Windows installer ke direct extract-and-go Python 3.8.10 setup karo aur PATH me add karo.',
    command: 'setx PATH "%PATH%;D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin"',
    links: [
      { name: 'Python Windows Portable (GitHub)', url: 'https://github.com/anzz1/python-windows/releases', note: 'anzz1 releases: python-3.8.10.amd64.zip (64-bit) or python-3.8.10.zip (32-bit)' }
    ],
    tips: [
      'D:\\AI\\tools\\python38\\ ke andar extract karo taaki python.exe seedha D:\\AI\\tools\\python38\\python.exe par ho.',
      'Folder ke andar install.reg ho toh use run karke registry register kar lo.',
      'setx PATH command chala kar ConEmu restart karo.'
    ]
  },
  {
    id: 4,
    title: 'Install Node.js v13.14.0',
    hinglishTitle: 'Node.js v13.14.0 Install Karo (Last Win7 Supported)',
    summary: 'Node 14+ Windows 7 par crash ho jata hai. Node.js v13.14.0 Windows 7 ka ultimate stable version hai.',
    links: [
      { name: 'Node.js v13.14.0 (x64 64-bit MSI)', url: 'https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi', note: 'Official 64-bit installer' },
      { name: 'Node.js v13.14.0 (x86 32-bit MSI)', url: 'https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi', note: 'Official 32-bit installer' }
    ],
    tips: [
      'Installer ko run karo aur "Next -> Next -> Install" default directory me kar do.',
      'Installation ke baad ConEmu ko ek baar restart karo taaki npm PATH load ho sake.'
    ]
  },
  {
    id: 5,
    title: 'Install 7coder AI Agent',
    hinglishTitle: '7coder Global NPM Package Install',
    summary: 'Claude Code replacement AI agent with 40+ local developer tools jo terminal se autonomically code likhta hai.',
    command: 'npm install -g @nodemixaholic/7coder',
    tips: [
      'Ye command ConEmu terminal me run karo.',
      'Agar internet slow ho toh 1-2 minute wait karo. Packages automatically compile aur link ho jayenge.'
    ]
  },
  {
    id: 6,
    title: 'Configure .env Settings',
    hinglishTitle: 'Free API Key aur .env Config Set Karo',
    summary: 'D:\\AI\\workspace\\.env create karo aur free Google Gemini API key ya Groq key add karo.',
    fileName: 'D:\\AI\\workspace\\.env',
    fileContent: `# Win7 Freedom Kit - Environment Settings
GEMINI_API_KEY=AIzaSy_YOUR_FREE_GEMINI_KEY_HERE

# Optional Alternative Providers
# GROQ_API_KEY=your_groq_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# 7coder Configuration
AGENT_WORKSPACE=D:\\AI\\workspace
ENABLE_COMPUTER_USE=false
MAX_TOOL_STEPS=30
LOG_LEVEL=info`,
    links: [
      { name: 'Google AI Studio (Free Gemini Key)', url: 'https://aistudio.google.com/', note: 'Get API Key for free tier' }
    ],
    tips: [
      'Notepad me open karne ke liye type karo: notepad D:\\AI\\workspace\\.env',
      'API key ke aas-paas quotes (" ") mat lagana.',
      'Save karte waqt "Save as type: All Files (*.*)" select karo.'
    ]
  },
  {
    id: 7,
    title: 'Create start.bat & Auto-startup',
    hinglishTitle: '1-Click start.bat Launcher & Auto-Boot',
    summary: 'D:\\AI\\bin\\start.bat banao jo PATH fix karega aur workspace me agent launch karega.',
    fileName: 'D:\\AI\\bin\\start.bat',
    fileContent: `@echo off
title Win7 Freedom Kit - 7coder AI Agent
color 0A
echo ===================================================
echo     WIN7 FREEDOM KIT: AI CODING AGENT LAUNCHER
echo ===================================================
echo.
cd /d D:\\AI\\workspace

:: Ensure PATH contains our portable tools
set PATH=D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin;%PATH%

echo Checking environment...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not detected in PATH! Check installation.
    pause
    exit /b 1
)

echo Starting 7coder AI Agent in D:\\AI\\workspace...
echo Type your task or type 'exit' to quit.
echo ---------------------------------------------------
7coder --workspace D:\\AI\\workspace

if errorlevel 1 (
    echo.
    echo [Notice] 7coder session ended.
)
pause`,
    tips: [
      'Notepad me save karo: D:\\AI\\bin\\start.bat',
      'Laptop on hote hi start karne ke liye: Press Win + R, type "shell:startup", aur start.bat ka shortcut wahan paste kar do.'
    ]
  },
  {
    id: 8,
    title: 'Disable Sleep on Lid Close',
    hinglishTitle: 'Sleep Mode Band Karo (powercfg commands)',
    summary: 'Lid band karke bhi laptop continuously automation run karta rahe bina sleep ya freeze huye.',
    command: `powercfg -change -standby-timeout-ac 0\npowercfg -change -monitor-timeout-ac 15\npowercfg -hibernate off\npowercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0\npowercfg -setactive SCHEME_CURRENT`,
    tips: [
      'In commands ko Administrator Command Prompt me chalao.',
      'Ab charger laga kar laptop ki screen/lid close kar do, aapka AI agent continuous kaam karega.'
    ]
  }
];

export const SCRIPTS: ScriptFile[] = [
  {
    name: 'Folder Setup Batch Script',
    filename: '1_setup_folders.bat',
    category: 'batch',
    description: 'Creates all D:\\AI directory structures instantly in 1 click.',
    code: `@echo off
echo Creating Win7 Freedom Kit folder layout...
mkdir D:\\AI\\tools >nul 2>&1
mkdir D:\\AI\\workspace >nul 2>&1
mkdir D:\\AI\\bin >nul 2>&1
mkdir D:\\AI\\downloads >nul 2>&1
echo Done! Folders created successfully under D:\\AI
echo D:\\AI\\tools, D:\\AI\\workspace, D:\\AI\\bin, D:\\AI\\downloads
pause`
  },
  {
    name: 'Agent Launcher (start.bat)',
    filename: 'start.bat',
    category: 'batch',
    description: 'Launches 7coder with custom isolated PATH in D:\\AI\\workspace.',
    code: `@echo off
title Win7 Freedom Kit - 7coder AI Agent
color 0A
echo ===================================================
echo     WIN7 FREEDOM KIT: AI CODING AGENT LAUNCHER
echo ===================================================
echo.
cd /d D:\\AI\\workspace

set PATH=D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin;%PATH%

echo Checking environment...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not detected in PATH!
    pause
    exit /b 1
)

echo Starting 7coder AI Agent in D:\\AI\\workspace...
7coder --workspace D:\\AI\\workspace
pause`
  },
  {
    name: 'Windows 7 TLS 1.2 Enable Registry Fix',
    filename: 'enable_tls12_win7.reg',
    category: 'registry',
    description: 'Fixes ConEmu, curl, and network HTTPS SSL handshake failures on Win7 SP1.',
    code: `Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2]

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Client]
"DisabledByDefault"=dword:00000000
"Enabled"=dword:00000001

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Server]
"DisabledByDefault"=dword:00000000
"Enabled"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001`
  },
  {
    name: 'Power & Anti-Sleep Configuration',
    filename: 'disable_sleep.bat',
    category: 'batch',
    description: 'Prevents Windows 7 from sleeping when lid is closed on AC power.',
    code: `@echo off
echo Configuring Windows 7 Power Settings for Automation...
:: Standby timeout = 0 (Never sleep on AC)
powercfg -change -standby-timeout-ac 0
:: Monitor timeout = 15 mins (save backlight)
powercfg -change -monitor-timeout-ac 15
:: Turn off hibernation to save GBs on C: drive
powercfg -hibernate off
:: Lid close action = 0 (Do nothing)
powercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg -setactive SCHEME_CURRENT
echo Power configured! You can now close the laptop lid safely while plugged in.
pause`
  },
  {
    name: 'Monthly Maintenance & Cache Cleaner',
    filename: 'monthly_cleanup.bat',
    category: 'batch',
    description: 'Cleans npm cache, pip cache, logs, and temp files to save disk space.',
    code: `@echo off
echo ===================================================
echo     WIN7 FREEDOM KIT: MONTHLY DISK CLEANER
echo ===================================================
echo.
echo 1. Cleaning NPM cache...
call npm cache clean --force
echo 2. Cleaning Pip cache...
rmdir /s /q "%LOCALAPPDATA%\\pip\\cache" 2>nul
echo 3. Deleting temporary workspace logs...
del /q /f D:\\AI\\workspace\\*.log 2>nul
del /q /f D:\\AI\\workspace\\.7coder\\logs\\*.* 2>nul
echo 4. Cleaning Windows Temp files...
del /q /f /s "%TEMP%\\*" 2>nul
echo.
echo Cleanup complete! Your disk is fresh and fast.
pause`
  }
];

export const TROUBLESHOOTING: TroubleshootingItem[] = [
  {
    id: 'tls-issue',
    tag: 'Network / SSL',
    problem: 'ConEmu update or curl fails with SSL/TLS Handshake Error',
    cause: 'Windows 7 SP1 defaults to TLS 1.0; modern web services require TLS 1.2.',
    causeHinglish: 'Modern servers TLS 1.2 maangte hain jabki Windows 7 purane TLS 1.0 par rehta hai.',
    solution: 'Press Win+R -> type inetcpl.cpl -> Advanced tab me niche jaakar "Use TLS 1.2" aur "Use TLS 1.1" ko check karo. Ya phir hamara registry fix download karke run karo.',
    code: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Client" /v DisabledByDefault /t REG_DWORD /d 0 /f\nreg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Client" /v Enabled /t REG_DWORD /d 1 /f`
  },
  {
    id: 'npm-not-found',
    tag: 'PATH / Environment',
    problem: "'npm' or 'node' is not recognized as an internal or external command",
    cause: 'Node.js was installed but terminal session was not refreshed, or PATH was not added.',
    causeHinglish: 'Terminal restart nahi hua ya Node.js ka folder PATH me register nahi hua.',
    solution: 'ConEmu ko fully close karke dubara open karo. Agar issue persist kare toh Node.js ko PATH me manually add karo.',
    code: `set PATH=%PATH%;C:\\Program Files\\nodejs\\`
  },
  {
    id: 'api-error',
    tag: '7coder Agent',
    problem: '7coder gives 401 Unauthorized or Invalid API Key error',
    cause: 'The .env file has incorrect keys, extra spaces, or surrounding quotes around key value.',
    causeHinglish: '.env file me key ke sath extra quotes (") lag gaye ya whitespace copy ho gaya.',
    solution: 'D:\\AI\\workspace\\.env kholo aur verify karo ki GEMINI_API_KEY bina kisi double quotes ke seedha likha hai. Ensure karo key active hai.',
    code: `GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
  },
  {
    id: 'pip-ssl-error',
    tag: 'Python / SSL',
    problem: 'pip install fails with "SSL: CERTIFICATE_VERIFY_FAILED"',
    cause: 'Windows 7 root certificate trust store is out of date.',
    causeHinglish: 'Windows 7 ke root SSL certificates expire ho gaye hain.',
    solution: 'certifi package ko update karo ya trusted hosts flag ke sath install karo.',
    code: `python -m pip install --upgrade certifi\n:: Alternately:\npython -m pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org <package-name>`
  }
];

export const RAW_README_MARKDOWN = `# 🚀 Win7 Freedom Kit

> **Win7 Freedom Kit: Free local terminal + AI coding agent for Windows 7 — no VPS, no subscription.**

[![Platform: Windows 7 SP1](https://img.shields.io/badge/Platform-Windows%207%20SP1%20(32%2F64--bit)-0078D7?logo=windows&logoColor=white)](https://microsoft.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Zero Budget](https://img.shields.io/badge/Cost-100%25%20Free%20%2F%20Local-success)](#)
[![Node.js](https://img.shields.io/badge/Node.js-v13.14.0%20(Last%20Win7%20Build)-339933?logo=node.js&logoColor=white)](https://nodejs.org/dist/v13.14.0/)
[![Python](https://img.shields.io/badge/Python-3.8.10%20Portable-3776AB?logo=python&logoColor=white)](https://github.com/anzz1/python-windows)
[![7coder](https://img.shields.io/badge/AI%20Agent-7coder%20(40%2B%20Tools)-orange)](#step-5-install-7coder-ai-agent)

---

Namaste dosto! 👋 Agar aapke paas ek purana Windows 7 laptop ya desktop pada hai jismein koi heavy software nahi chalta, toh fikr bilkul mat karo. **Win7 Freedom Kit** ke sath aap apne Windows 7 machine ko ek fully autonomous, super-fast AI coding powerhouse bana sakte ho — bina kisi monthly subscription ke aur bina kisi expensive Cloud VPS ke!

Sab kuch **100% Free, 100% Local terminal control, aur D: drive par isolated** rahega taaki aapka C: drive partition hamesha clean aur fast rahe.

---

## 🎁 What You Get (Aapko Kya-Kya Milega?)

* 💻 **Full terminal freedom (ConEmu, XP+ compatible):** Tabbed terminal, UTF-8 unicode support, customizable colors, and smooth shell experience on legacy Windows.
* 🐍 **Portable Python 3.8.10 (Extract-and-go):** No messy installer, no registry headaches. Bas unzip karo aur chalao.
* ⚡ **Node.js 13.14.0 (Official Last Win7-Compatible Release):** Official Node build jo Windows 7 par natively smoothly bina OS lock ke chalti hai.
* 🤖 **7coder AI agent (Claude Code replacement, 40+ tools):** Local AI developer agent jo terminal se code read, write, debug, execute aur browser task kar sakta hai.
* 💽 **All data on D: drive, C: drive stays free:** C: drive kabhi full nahi hogi. Workspace, portable tools, aur logs sab \`D:\\AI\\\` ke andar surakshit rahenge.
* 🔋 **Laptop on = Automation on:** Laptop screen band rakho ya background me chalao, aapka coding agent 24/7 kaam ke liye tayyar rahega.

---

## 📋 Prerequisites (Zaroori Cheezein)

Setup start karne se pehle ye check kar lo:

1. **Operating System:** Windows 7 Service Pack 1 (SP1) — *32-bit (x86) ya 64-bit (x64)* dono supported hain.
2. **Disk Space:** At least **2 GB free space** on your \`D:\` drive (Agar D: drive nahi hai toh koi bhi non-system partition use kar sakte ho).
3. **Internet Connection:** Node packages aur initial lightweight setup ke liye, plus free AI API access ke liye.
4. **Admin Privileges:** Environment variables (PATH) add karne aur Node.js MSI install karne ke liye.

---

## 🛠️ Step-by-Step Setup Guide

Follow these 8 simple steps ek-ek karke. Har command copy-paste ready hai!

### 📂 Step 1: Create \`D:\\AI\` Folders

Sabse pehle hum D: drive par ek clean folder structure banayenge jahan saare tools aur workspace isolate rahenge.

1. Press \`Win + R\`, type \`cmd\`, aur press **Enter**.
2. Run this command:

\`\`\`cmd
mkdir D:\\AI\\tools D:\\AI\\workspace D:\\AI\\bin D:\\AI\\downloads
\`\`\`

Folder layout ban jayega:
\`\`\`text
D:\\AI\\
 ├── bin\\          <- Custom batch scripts & launchers
 ├── downloads\\    <- Downloaded zips & installers
 ├── tools\\        <- ConEmu, Python portable
 └── workspace\\    <- Aapke coding projects & AI workspace
\`\`\`

---

### 🖥️ Step 2: Install ConEmu Terminal

Windows 7 ka default \`cmd.exe\` bohot purana hai. Hum use karenge **ConEmu** (lightweight, tabbed, XP/Win7 compatible).

1. Browser me download link open karo:
   * **Direct 7-Zip Portable Package:** [https://conemu.github.io/](https://conemu.github.io/) ya [GitHub Releases](https://github.com/Maximus5/ConEmu/releases) (Download \`ConEmuPack.*.7z\` or \`.zip\`).
2. Downloaded archive ko extract karo yahan:
   \`D:\\AI\\tools\\ConEmu\\\`
3. Check karo ki file \`D:\\AI\\tools\\ConEmu\\ConEmu.exe\` (32-bit) ya \`ConEmu64.exe\` (64-bit) maujood hai.
4. *Desktop Shortcut:* \`ConEmu64.exe\` (ya 32-bit pe \`ConEmu.exe\`) par Right-Click karo -> **Send to** -> **Desktop (create shortcut)**.
5. First launch me fast startup settings me "cmd" ya "Far Manager" me se standard Windows cmd select kar lo.

---

### 🐍 Step 3: Extract Portable Python 3.8.10

Windows 7 officially Python 3.8 tak support karta hai. Hum portable build use karenge jisme pip pre-configured hai.

1. **Download:** Open [anzz1/python-windows Releases](https://github.com/anzz1/python-windows/releases).
   * 64-bit system ke liye: \`python-3.8.10.amd64.zip\`
   * 32-bit system ke liye: \`python-3.8.10.zip\`
2. Downloaded zip ko extract karo inside:
   \`D:\\AI\\tools\\python38\\\`
   *(Ensure karo ki \`python.exe\` path \`D:\\AI\\tools\\python38\\python.exe\` par ho)*
3. **Registry association (Optional but recommended):**
   Folder ke andar agar \`install.reg\` ya helper script ho, uspe double click karke run karo taaki \`.py\` scripts associate ho jayein.
4. **Add to User PATH:**
   Command prompt me ye one-liner run karo user PATH permanently update karne ke liye:

\`\`\`cmd
setx PATH "%PATH%;D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin"
\`\`\`

---

### 🟢 Step 4: Install Node.js v13.14.0

> ⚠️ **Important Note:** Node.js v14+ Windows 7 par block ho jata hai ("This OS is not supported"). Isliye **Node.js v13.14.0** is the ultimate golden rock-solid version for Windows 7.

1. Official Node.js archive se installer download karo:
   * **64-bit (x64) Installer:** [https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi](https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi)
   * **32-bit (x86) Installer:** [https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi](https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi)
2. Installer (\`.msi\`) ko run karo, default settings ke sath **Next -> Next -> Install** click karo.
3. Installation finish hone ke baad ConEmu ko reopen karo.

---

### 🤖 Step 5: Install 7coder AI Agent

Ab hum install karenge **7coder** — special lightweight AI coding agent with 40+ developer tools jo legacy Windows par seamlessly run karta hai.

ConEmu me ye command execute karo:

\`\`\`cmd
npm install -g @nodemixaholic/7coder
\`\`\`

*(Tip: Agar permission issue aaye ya global install me time lage, thoda wait karo — npm files download karke global prefix me set kar dega).*

---

### 🔑 Step 6: Configure \`.env\` File (Free API Key)

7coder ko run hone ke liye ek free AI API key chahiye (jaise Google Gemini free tier ya Groq free tier).

1. \`D:\\AI\\workspace\\\` folder ke andar ek file banao jiska naam rakho \`.env\`.
2. Notepad se open karne ke liye command run karo:

\`\`\`cmd
notepad D:\\AI\\workspace\\.env
\`\`\`

3. File me ye configuration paste karo:

\`\`\`env
# Win7 Freedom Kit - Environment Settings
# Choose your preferred free/affordable AI provider:
GEMINI_API_KEY=your_free_gemini_api_key_here

# Optional: Groq / OpenRouter / Anthropic compatible keys
# GROQ_API_KEY=your_groq_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# 7coder Settings
AGENT_WORKSPACE=D:\\AI\\workspace
ENABLE_COMPUTER_USE=false
MAX_TOOL_STEPS=30
LOG_LEVEL=info
\`\`\`

*Free API Key kahan se milegi?*
* [Google AI Studio](https://aistudio.google.com/) par jao -> "Get API Key" par click karo (Free of cost).
* Key copy karke \`GEMINI_API_KEY=\` ke aage paste kar do aur file Save (\`Ctrl + S\`) karke close kar do.

---

### 🚀 Step 7: Create \`start.bat\` & Add to Startup

Ab hum ek single click launcher banayenge jo ConEmu me seedha 7coder agent ko start karega, aur chaaho toh laptop on hote hi auto-start karega.

1. Create \`D:\\AI\\bin\\start.bat\`:

\`\`\`cmd
notepad D:\\AI\\bin\\start.bat
\`\`\`

2. Niche diya gaya script paste karo:

\`\`\`bat
@echo off
title Win7 Freedom Kit - 7coder AI Agent
color 0A
echo ===================================================
echo     WIN7 FREEDOM KIT: AI CODING AGENT LAUNCHER
echo ===================================================
echo.
cd /d D:\\AI\\workspace

:: Ensure PATH contains our portable tools
set PATH=D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin;%PATH%

echo Checking environment...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not detected in PATH! Check installation.
    pause
    exit /b 1
)

echo Starting 7coder AI Agent in D:\\AI\\workspace...
echo Type your task or type 'exit' to quit.
echo ---------------------------------------------------
7coder --workspace D:\\AI\\workspace

if errorlevel 1 (
    echo.
    echo [Notice] 7coder session ended.
)
pause
\`\`\`

3. **Auto-start on Boot (Laptop On = Automation On):**
   * Press \`Win + R\`, type \`shell:startup\`, aur press **Enter**.
   * Windows Startup folder open ho jayega.
   * \`D:\\AI\\bin\\start.bat\` ka shortcut yahan paste kar do!
   * Ab jab bhi aap laptop on karoge, aapka AI assistant background me ready rahega.

---

### 💤 Step 8: Disable Sleep Mode (Powercfg Commands)

AI task lambe chalte hain, aur hum nahi chahte ki screen ya system beech me sleep/hibernate ho jaye.
Admin Command Prompt me ye commands run karo:

\`\`\`cmd
:: AC Power (Charger plugged in) par sleep disable karo
powercfg -change -standby-timeout-ac 0

:: Monitor timeout 15 minutes set karo (battery & screen saving)
powercfg -change -monitor-timeout-ac 15

:: Hibernate mode disable karo
powercfg -hibernate off

:: Laptop lid band karne par sleep na ho (Do Nothing on Lid Close)
powercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg -setactive SCHEME_CURRENT
\`\`\`

*Result:* Ab aap laptop ka lid band karke side me rakh sakte ho — laptop quietly kaam karta rahega!

---

## ✅ Verification Checklist

Sab kuch setup ho gaya? Verify karo ek minute me:

- [ ] **ConEmu opens cleanly:** ConEmu shortcut double click karne par smooth tabbed terminal open ho raha hai.
- [ ] **Python version check:**
  \`\`\`cmd
  python --version
  \`\`\`
  *Expected Output:* \`Python 3.8.10\`
- [ ] **Node.js version check:**
  \`\`\`cmd
  node --version
  \`\`\`
  *Expected Output:* \`v13.14.0\`
- [ ] **7coder is available:**
  \`\`\`cmd
  7coder --help
  \`\`\`
  *Expected Output:* 7coder command list and options print ho rahe hain.
- [ ] **Workspace ready:** \`D:\\AI\\workspace\` folder exist karta hai aur uske andar \`.env\` file present hai.

---

## 🩺 Troubleshooting (Aam Samasyaein & Solutions)

### 1. ConEmu internet update / download fails on Windows 7
* **Wajah:** Windows 7 by default purana SSL/TLS 1.0 use karta hai, jabki modern servers TLS 1.2 maangte hain.
* **Solution:**
  1. Press \`Win + R\`, type \`inetcpl.cpl\`, hit Enter (**Internet Properties** khulega).
  2. **Advanced** tab par jao.
  3. Scroll down to bottom aur **Use TLS 1.2** aur **Use TLS 1.1** ko tick karo.
  4. Click **Apply** aur **OK**.
  5. Ya registry fix run karo:
  \`\`\`cmd
  reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Client" /v DisabledByDefault /t REG_DWORD /d 0 /f
  reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Client" /v Enabled /t REG_DWORD /d 1 /f
  \`\`\`

### 2. 'npm' ya 'node' is not recognized as an internal or external command
* **Wajah:** Node.js installer ka PATH refresh nahi hua.
* **Solution:**
  * Terminal/ConEmu ko close karke dobara open karo.
  * Agar phir bhi na aaye, manually PATH verify karo:
  \`\`\`cmd
  set PATH=%PATH%;C:\\Program Files\\nodejs\\
  \`\`\`

### 3. 7coder API Error / Unauthorized (401 / 403)
* **Wajah:** \`.env\` file me API key galat hai ya whitespace/quotes extra copy ho gaye hain.
* **Solution:**
  * \`D:\\AI\\workspace\\.env\` open karo.
  * Ensure karo: \`GEMINI_API_KEY=AIzaSy...\` bina kisi double quotes \`"\` ke seedha likha ho.
  * Test karo internet connection active hai ya nahi.

### 4. \`pip\` SSL Certificate Verify Failed
* **Wajah:** Windows 7 root certificates purane ho chuke hain.
* **Solution:**
  \`\`\`cmd
  python -m pip install --upgrade certifi
  \`\`\`

---

## 🧹 Disk Cleanup (Monthly Maintenance)

Windows 7 me disk space bachaane ke liye mahine me ek baar ye 2-minute maintenance routine run karo:

\`\`\`cmd
:: 1. NPM cache clean karo (Ye hundreds of MB free karega)
npm cache clean --force

:: 2. Pip cache clear karo
rmdir /s /q "%LOCALAPPDATA%\\pip\\cache" 2>nul

:: 3. Purane temporary workspace logs delete karo
del /q /f D:\\AI\\workspace\\*.log 2>nul
del /q /f D:\\AI\\workspace\\.7coder\\logs\\*.* 2>nul

:: 4. Windows temp cleanup
del /q /f /s "%TEMP%\\*" 2>nul
\`\`\`

---

## 📜 Architecture & Folder Map

\`\`\`text
D:\\AI\\
├── bin\\
│   └── start.bat              <- One-click agent launcher
├── tools\\
│   ├── ConEmu\\
│   │   ├── ConEmu.exe         <- 32-bit console
│   │   └── ConEmu64.exe       <- 64-bit console
│   └── python38\\
│       ├── python.exe         <- Portable Python 3.8.10
│       └── Scripts\\pip.exe
└── workspace\\
    ├── .env                   <- API Keys & config
    ├── projects\\              <- Your code repos
    └── tests\\
\`\`\`

---

## 🤝 Contributing & Community

Aapka bhi purana laptop zinda ho gaya? We'd love your contributions!
* Found a bug on 32-bit Win7? Open an issue!
* Have another Win7-compatible portable tool? Submit a Pull Request.
* Share your setup screenshots and automation scripts.

---

## 📄 License

This guide and kit are released under the [MIT License](LICENSE).
Free for personal, academic, and commercial use. Windows 7 is a registered trademark of Microsoft Corporation.
`;
