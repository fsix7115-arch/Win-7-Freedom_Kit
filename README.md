# 🚀 Win7 Freedom Kit

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
* 💽 **All data on D: drive, C: drive stays free:** C: drive kabhi full nahi hogi. Workspace, portable tools, aur logs sab `D:\AI\` ke andar surakshit rahenge.
* 🔋 **Laptop on = Automation on:** Laptop screen band rakho ya background me chalao, aapka coding agent 24/7 kaam ke liye tayyar rahega.

---

## 📋 Prerequisites (Zaroori Cheezein)

Setup start karne se pehle ye check kar lo:

1. **Operating System:** Windows 7 Service Pack 1 (SP1) — *32-bit (x86) ya 64-bit (x64)* dono supported hain.
2. **Disk Space:** At least **2 GB free space** on your `D:` drive (Agar D: drive nahi hai toh koi bhi non-system partition use kar sakte ho).
3. **Internet Connection:** Node packages aur initial lightweight setup ke liye, plus free AI API access ke liye.
4. **Admin Privileges:** Environment variables (PATH) add karne aur Node.js MSI install karne ke liye.

---

## 🛠️ Step-by-Step Setup Guide

Follow these 8 simple steps ek-ek karke. Har command copy-paste ready hai!

### 📂 Step 1: Create `D:\AI` Folders

Sabse pehle hum D: drive par ek clean folder structure banayenge jahan saare tools aur workspace isolate rahenge.

1. Press `Win + R`, type `cmd`, aur press **Enter**.
2. Run this command:

```cmd
mkdir D:\AI\tools D:\AI\workspace D:\AI\bin D:\AI\downloads
```

Folder layout ban jayega:
```text
D:\AI\
 ├── bin\          <- Custom batch scripts & launchers
 ├── downloads\    <- Downloaded zips & installers
 ├── tools\        <- ConEmu, Python portable
 └── workspace\    <- Aapke coding projects & AI workspace
```

---

### 🖥️ Step 2: Install ConEmu Terminal

Windows 7 ka default `cmd.exe` bohot purana hai. Hum use karenge **ConEmu** (lightweight, tabbed, XP/Win7 compatible).

1. Browser me download link open karo:
   * **Direct 7-Zip Portable Package:** [https://conemu.github.io/](https://conemu.github.io/) ya [GitHub Releases](https://github.com/Maximus5/ConEmu/releases) (Download `ConEmuPack.*.7z` or `.zip`).
2. Downloaded archive ko extract karo yahan:
   `D:\AI\tools\ConEmu\`
3. Check karo ki file `D:\AI\tools\ConEmu\ConEmu.exe` (32-bit) ya `ConEmu64.exe` (64-bit) maujood hai.
4. *Desktop Shortcut:* `ConEmu64.exe` (ya 32-bit pe `ConEmu.exe`) par Right-Click karo -> **Send to** -> **Desktop (create shortcut)**.
5. First launch me fast startup settings me "cmd" ya "Far Manager" me se standard Windows cmd select kar lo.

---

### 🐍 Step 3: Extract Portable Python 3.8.10

Windows 7 officially Python 3.8 tak support karta hai. Hum portable build use karenge jisme pip pre-configured hai.

1. **Download:** Open [anzz1/python-windows Releases](https://github.com/anzz1/python-windows/releases).
   * 64-bit system ke liye: `python-3.8.10.amd64.zip`
   * 32-bit system ke liye: `python-3.8.10.zip`
2. Downloaded zip ko extract karo inside:
   `D:\AI\tools\python38\`
   *(Ensure karo ki `python.exe` path `D:\AI\tools\python38\python.exe` par ho)*
3. **Registry association (Optional but recommended):**
   Folder ke andar agar `install.reg` ya helper script ho, uspe double click karke run karo taaki `.py` scripts associate ho jayein.
4. **Add to User PATH:**
   Command prompt me ye one-liner run karo user PATH permanently update karne ke liye:

```cmd
setx PATH "%PATH%;D:\AI\tools\python38;D:\AI\tools\python38\Scripts;D:\AI\bin"
```

---

### 🟢 Step 4: Install Node.js v13.14.0

> ⚠️ **Important Note:** Node.js v14+ Windows 7 par block ho jata hai ("This OS is not supported"). Isliye **Node.js v13.14.0** is the ultimate golden rock-solid version for Windows 7.

1. Official Node.js archive se installer download karo:
   * **64-bit (x64) Installer:** [https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi](https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi)
   * **32-bit (x86) Installer:** [https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi](https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi)
2. Installer (`.msi`) ko run karo, default settings ke sath **Next -> Next -> Install** click karo.
3. Installation finish hone ke baad ConEmu ko reopen karo.

---

### 🤖 Step 5: Install 7coder AI Agent

Ab hum install karenge **7coder** — special lightweight AI coding agent with 40+ developer tools jo legacy Windows par seamlessly run karta hai.

ConEmu me ye command execute karo:

```cmd
npm install -g @nodemixaholic/7coder
```

*(Tip: Agar permission issue aaye ya global install me time lage, thoda wait karo — npm files download karke global prefix me set kar dega).*

---

### 🔑 Step 6: Configure `.env` File (Free API Key)

7coder ko run hone ke liye ek free AI API key chahiye (jaise Google Gemini free tier ya Groq free tier).

1. `D:\AI\workspace\` folder ke andar ek file banao jiska naam rakho `.env`.
2. Notepad se open karne ke liye command run karo:

```cmd
notepad D:\AI\workspace\.env
```

3. File me ye configuration paste karo:

```env
# Win7 Freedom Kit - Environment Settings
# Choose your preferred free/affordable AI provider:
GEMINI_API_KEY=your_free_gemini_api_key_here

# Optional: Groq / OpenRouter / Anthropic compatible keys
# GROQ_API_KEY=your_groq_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# 7coder Settings
AGENT_WORKSPACE=D:\AI\workspace
ENABLE_COMPUTER_USE=false
MAX_TOOL_STEPS=30
LOG_LEVEL=info
```

*Free API Key kahan se milegi?*
* [Google AI Studio](https://aistudio.google.com/) par jao -> "Get API Key" par click karo (Free of cost).
* Key copy karke `GEMINI_API_KEY=` ke aage paste kar do aur file Save (`Ctrl + S`) karke close kar do.

---

### 🚀 Step 7: Create `start.bat` & Add to Startup

Ab hum ek single click launcher banayenge jo ConEmu me seedha 7coder agent ko start karega, aur chaaho toh laptop on hote hi auto-start karega.

1. Create `D:\AI\bin\start.bat`:

```cmd
notepad D:\AI\bin\start.bat
```

2. Niche diya gaya script paste karo:

```bat
@echo off
title Win7 Freedom Kit - 7coder AI Agent
color 0A
echo ===================================================
echo     WIN7 FREEDOM KIT: AI CODING AGENT LAUNCHER
echo ===================================================
echo.
cd /d D:\AI\workspace

:: Ensure PATH contains our portable tools
set PATH=D:\AI\tools\python38;D:\AI\tools\python38\Scripts;D:\AI\bin;%PATH%

echo Checking environment...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not detected in PATH! Check installation.
    pause
    exit /b 1
)

echo Starting 7coder AI Agent in D:\AI\workspace...
echo Type your task or type 'exit' to quit.
echo ---------------------------------------------------
7coder --workspace D:\AI\workspace

if errorlevel 1 (
    echo.
    echo [Notice] 7coder session ended.
)
pause
```

3. **Auto-start on Boot (Laptop On = Automation On):**
   * Press `Win + R`, type `shell:startup`, aur press **Enter**.
   * Windows Startup folder open ho jayega.
   * `D:\AI\bin\start.bat` ka shortcut yahan paste kar do!
   * Ab jab bhi aap laptop on karoge, aapka AI assistant background me ready rahega.

---

### 💤 Step 8: Disable Sleep Mode (Powercfg Commands)

AI task lambe chalte hain, aur hum nahi chahte ki screen ya system beech me sleep/hibernate ho jaye.
Admin Command Prompt me ye commands run karo:

```cmd
:: AC Power (Charger plugged in) par sleep disable karo
powercfg -change -standby-timeout-ac 0

:: Monitor timeout 15 minutes set karo (battery & screen saving)
powercfg -change -monitor-timeout-ac 15

:: Hibernate mode disable karo
powercfg -hibernate off

:: Laptop lid band karne par sleep na ho (Do Nothing on Lid Close)
powercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg -setactive SCHEME_CURRENT
```

*Result:* Ab aap laptop ka lid band karke side me rakh sakte ho — laptop quietly kaam karta rahega!

---

## ✅ Verification Checklist

Sab kuch setup ho gaya? Verify karo ek minute me:

- [ ] **ConEmu opens cleanly:** ConEmu shortcut double click karne par smooth tabbed terminal open ho raha hai.
- [ ] **Python version check:**
  ```cmd
  python --version
  ```
  *Expected Output:* `Python 3.8.10`
- [ ] **Node.js version check:**
  ```cmd
  node --version
  ```
  *Expected Output:* `v13.14.0`
- [ ] **7coder is available:**
  ```cmd
  7coder --help
  ```
  *Expected Output:* 7coder command list and options print ho rahe hain.
- [ ] **Workspace ready:** `D:\AI\workspace` folder exist karta hai aur uske andar `.env` file present hai.

---

## 🩺 Troubleshooting (Aam Samasyaein & Solutions)

### 1. ConEmu internet update / download fails on Windows 7
* **Wajah:** Windows 7 by default purana SSL/TLS 1.0 use karta hai, jabki modern servers TLS 1.2 maangte hain.
* **Solution:**
  1. Press `Win + R`, type `inetcpl.cpl`, hit Enter (**Internet Properties** khulega).
  2. **Advanced** tab par jao.
  3. Scroll down to bottom aur **Use TLS 1.2** aur **Use TLS 1.1** ko tick karo.
  4. Click **Apply** aur **OK**.
  5. Ya registry fix run karo:
  ```cmd
  reg add "HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client" /v DisabledByDefault /t REG_DWORD /d 0 /f
  reg add "HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client" /v Enabled /t REG_DWORD /d 1 /f
  ```

### 2. `'npm'` ya `'node'` is not recognized as an internal or external command
* **Wajah:** Node.js installer ka PATH refresh nahi hua.
* **Solution:**
  * Terminal/ConEmu ko close karke dobara open karo.
  * Agar phir bhi na aaye, manually PATH verify karo:
  ```cmd
  set PATH=%PATH%;C:\Program Files\nodejs\
  ```

### 3. 7coder API Error / Unauthorized (401 / 403)
* **Wajah:** `.env` file me API key galat hai ya whitespace/quotes extra copy ho gaye hain.
* **Solution:**
  * `D:\AI\workspace\.env` open karo.
  * Ensure karo: `GEMINI_API_KEY=AIzaSy...` bina kisi double quotes `"` ke seedha likha ho.
  * Test karo internet connection active hai ya nahi.

### 4. `pip` SSL Certificate Verify Failed
* **Wajah:** Windows 7 root certificates purane ho chuke hain.
* **Solution:**
  ```cmd
  python -m pip install --upgrade certifi
  ```

---

## 🧹 Disk Cleanup (Monthly Maintenance)

Windows 7 me disk space bachaane ke liye mahine me ek baar ye 2-minute maintenance routine run karo:

```cmd
:: 1. NPM cache clean karo (Ye hundreds of MB free karega)
npm cache clean --force

:: 2. Pip cache clear karo
rmdir /s /q "%LOCALAPPDATA%\pip\cache" 2>nul

:: 3. Purane temporary workspace logs delete karo
del /q /f D:\AI\workspace\*.log 2>nul
del /q /f D:\AI\workspace\.7coder\logs\*.* 2>nul

:: 4. Windows temp cleanup
del /q /f /s "%TEMP%\*" 2>nul
```

---

## 📜 Architecture & Folder Map

```text
D:\AI\
├── bin\
│   └── start.bat              <- One-click agent launcher
├── tools\
│   ├── ConEmu\
│   │   ├── ConEmu.exe         <- 32-bit console
│   │   └── ConEmu64.exe       <- 64-bit console
│   └── python38\
│       ├── python.exe         <- Portable Python 3.8.10
│       └── Scripts\pip.exe
└── workspace\
    ├── .env                   <- API Keys & config
    ├── projects\              <- Your code repos
    └── tests\
```

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
