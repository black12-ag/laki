# 🦅 LakiRemit iOS

[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020.svg?style=for-the-badge&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB.svg?style=for-the-badge&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success.svg?style=for-the-badge)]()

<div align="center">
  <img src="./assets/images/qr-code.png" width="250" alt="LakiRemit Scan Code" />
  <p><b>Scan with Expo Go</b></p>
</div>

> A premium, cross-border money transfer application engineered for speed, security, and aesthetic excellence.

## 📱 Project Overview

LakiRemit is a state-of-the-art fintech mobile application designed to simplify international remittances to Ethiopia. Built with a performance-first mindset, it leverages the latest **Expo Router v6** for seamless navigation and **Firebase v12** for banking-grade security.

### ✨ Key Features

- **🌍 Global Reach**: Instant transfers to Abyssinia Bank, CBE, and other major financial institutions.
- **🎨 Adaptive UI/UX**: Stunning **OLED Dark Mode (`#121212`)** and Light Mode support, featuring glassmorphism and smooth micro-interactions.
- **⚡ Real-Time Processing**: Live exchange rate updates and instant transaction verification.
- **🔒 Enterprise Security**: Biometric authentication, JWT token management, and secure payload encryption.

---

## 🏗️ Architecture

The codebase follows a scalable **Feature-Based Architecture**, ensuring modularity and "Atomic Design" principles.

```
lakiremit-ios/
├── app/                  # Expo Router (Navigation)
│   ├── (tabs)/          # Main App Tabs
│   └── _layout.tsx      # Root Providers
├── components/
│   ├── features/        # Business Logic (Auth, Transfer, Gifter)
│   └── ui/              # Reusable Design System (Atomic)
├── constants/           # Design Tokens (Colors, Typography)
└── hooks/               # Custom React Hooks (useAuth, useTheme)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Expo Go App (on mobile)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/black12-ag/laki.git
   cd laki
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on Device**
   - **Scan the QR code above** with **Expo Go**.
   - Press `i` for iOS Simulator or `a` for Android Emulator.

---

## 🛠️ Tech Stack

| Category     | Technology                          |
| ------------ | ----------------------------------- |
| **Core**     | React Native, Expo SDK 54           |
| **Language** | TypeScript (Strict Mode)            |
| **State**    | Zustand + Context API               |
| **Styling**  | Custom StyleSheet + Dynamic Theming |
| **Backend**  | Firebase (Auth, Firestore)          |
| **CI/CD**    | EAS Build + GitHub Actions          |

---

## 👨‍💻 Developer

**Munir Kabir**  
_Lead Software Engineer @ Black12-AG_

---

© 2026 LakiRemit. All rights reserved.
