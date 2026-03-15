# 🛡️ ResQverse — Prepare Today. Protect Tomorrow.

India's first gamified disaster preparedness platform built for schools, students and communities.

## 🌐 Live Demo
**[resqverse-ready.vercel.app](https://resqverse-ready.vercel.app)**

---

## 📱 What is ResQverse?

ResQverse is a disaster preparedness platform that trains students through games, helps teachers manage emergencies, enables transparent blockchain donations, and provides real-time safety maps — all in one app.

Every year India faces 100+ disasters — floods, earthquakes, fires. But schools have NO system to:
- Train students before disasters happen
- Manage emergencies when they occur
- Connect affected families with donors
- Share real-time safety information

ResQverse solves all of this.

---

## ✨ Key Features

### 📚 Gamified Learning
- Earthquake Survival Game — survive home, school and city level disasters
- Disaster Ready — real-time emergency response game with campaign mode and leaderboard
- Interactive Quizzes with XP scoring — Earthquake Safety, Flood Awareness, First Aid Basics
- Safety Rhymes for young kids with YouTube video integration
- Scenario-based drills for teens

### 🗺️ Real-Time Safety Map
- Live GPS location detection
- Real nearby hospitals, police stations and schools fetched live via Overpass API
- Danger zones marked in red, safe shelters in green
- One tap Google Maps directions to any location
- Active disaster alerts from IMD and NDMA

### 🚨 One-Tap SOS Emergency
- Instant emergency alert with one tap — no login required
- Real GPS coordinates shared automatically
- Direct call buttons — Police 100, Ambulance 108, Fire 101, NDMA 1078
- Mark yourself as available to help others nearby
- Works on any device, any browser, even on slow internet

### ⛓️ Blockchain Donations
- Powered by Solana blockchain
- Every donation transaction verified on-chain
- Fully transparent — no middlemen, no corruption
- Donors can see exactly where their money went
- Public transaction history available

### 👨‍🏫 Teacher Dashboard
- Monitor student progress and quiz scores
- School rankings across the district
- Interschool drill scheduling and management
- Emergency portal to send school-wide alerts instantly
- Donor community management

### 🔐 Admin Panel
- Monitor all Solana transactions
- View all registered users
- App usage analytics
- SOS alert history and status
- Accessible only via secret URL

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | TailwindCSS |
| Authentication | Firebase Auth (Google + Email) |
| Database | Firebase Realtime Database |
| Maps | Leaflet.js + OpenStreetMap |
| Real Places Data | Overpass API |
| Blockchain | Solana Network |
| Deployment | Vercel |
| Version Control | GitHub |

---

## 👥 User Roles

| Role | Access |
|------|--------|
| 👦 Kids | Safety Rhymes, Matching Game, Earthquake Drill Game |
| 🧑‍🎓 Teen | Quizzes, Disaster Ready Game, Scenarios |
| 👨‍🏫 Teacher | Dashboard, Student Reports, Emergency Portal, Drills |
| 👨‍👧 Parent | Safety Map, SOS, Blockchain Donations, Learning |
| 🔐 Admin | All Transactions, User Analytics, SOS History |

---

## 📁 Project Structure
```
src/
├── pages/
│   ├── Intro.tsx               # Welcome/onboarding screen
│   ├── Home.tsx                # Main app with 4 tabs
│   ├── Login.tsx               # Firebase auth login
│   ├── SOSPage.tsx             # Emergency SOS screen
│   ├── admin/
│   │   ├── AdminLogin.tsx      # Secret admin login
│   │   └── AdminDashboard.tsx  # Admin control panel
│   ├── teacher/
│   │   ├── TeacherLogin.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── StudentReports.tsx
│   │   ├── SchoolRankings.tsx
│   │   ├── InterschoolDrills.tsx
│   │   ├── EmergencyPortal.tsx
│   │   └── TeacherDonor.tsx
│   ├── parent/
│   │   ├── LearningScreen.tsx
│   │   ├── AwarenessMap.tsx
│   │   ├── SOSScreen.tsx
│   │   └── DonorCommunity.tsx
│   └── kids/
│       ├── KidsOnboarding.tsx
│       ├── KidsHome.tsx
│       ├── KidsRhymes.tsx
│       ├── KidsMatching.tsx
│       └── KidsDrills.tsx
├── components/
│   ├── tabs/
│   │   ├── LearningTab.tsx     # Learn section
│   │   ├── CommunityTab.tsx    # Donor community
│   │   ├── MapTab.tsx          # Safety map
│   │   └── RecordsTab.tsx      # Progress records
│   ├── SOSButton.tsx           # Floating SOS button
│   └── BackButton.tsx          # Navigation back button
└── firebase.ts                 # Firebase configuration
```

---

## 🎯 App Flow
```
Intro Screen (what ResQverse does)
        ↓
Home Screen (4 tabs)
📚 Learn | 💝 Community | 🗺️ Map | 📊 Records
        +
🚨 SOS button (always visible, no login needed)
        ↓
Inside each tab — user selects their purpose
```

---

## 🔮 Future Scope

- 📱 Convert to React Native mobile app
- 📡 Offline Bluetooth mesh networking for no-internet disaster zones
- 🤖 AI-powered disaster prediction and early warning alerts
- 🏫 Direct integration with government school systems across India
- 📊 National disaster preparedness dashboard
- 🌐 Multi-language support for regional languages
