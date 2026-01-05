<div align="center">

# 💊 aiMed

### AI-Powered Medication Safety & Management

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2051-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-black.svg)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991.svg)](https://openai.com/)

*Smart medication tracking with AI-powered drug interaction analysis*

</div>

---

## 📖 About

**aiMed** is a mobile health application that helps users safely manage multiple medications. It combines medication tracking with AI-powered analysis to identify potential drug interactions and provide patient-friendly safety information.

### Key Features

- 🤖 **AI Drug Interaction Analysis** - Uses OpenAI GPT-5 to check medication combinations for safety concerns
- 💊 **Medication Management** - Track medications with dosage, strength, and custom schedules
- 🔔 **Smart Reminders** - Customizable notification times (1x, 2x, 3x, 4x daily)
- 🔐 **Secure & Private** - Clerk authentication with isolated user data in Supabase
- 📱 **Cross-Platform** - Native iOS and Android support via React Native

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- Expo CLI
- Accounts: [Clerk](https://clerk.com/), [Supabase](https://supabase.com/), [OpenAI](https://platform.openai.com/)

### Installation

**1. Clone and install dependencies**
```bash
git clone https://github.com/ssujayy/aiMed_.git
cd aiMed_
npm install
```

**2. Set up environment variables**

Create `.env` in project root:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

Create `BACKEND/.env`:
```env
OPENAI_API_KEY=your_openai_key
```

**3. Configure services**
- Set up [Clerk](https://clerk.com/) authentication
- Set up [Supabase](https://supabase.com/) database
- Get [OpenAI API](https://platform.openai.com/) key

**4. Start the backend**
```bash
cd BACKEND
pip install -r requirements.txt
python app.py
```

**5. Start the app**
```bash
# In new terminal, from project root
npx expo start
```

Then press `i` for iOS or `a` for Android.

---

## 🛠️ Tech Stack

**Frontend**
- React Native + Expo + TypeScript
- Clerk (authentication)
- Supabase (database)
- Expo Router (navigation)
- Expo Notifications (reminders)

**Backend**
- Flask (Python web framework)
- OpenAI API (GPT-5 for drug analysis)

---
