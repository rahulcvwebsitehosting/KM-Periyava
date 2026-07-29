# ॐ KM Periyava Sannadhi: Digital Sanctuary Blueprint

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-Nemotron_70B-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://build.nvidia.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **A high-fidelity digital portal for Sri Kanchi Maha Periyava Sannadhi, Kandhamangalam. Bridging ancient wisdom with cutting-edge AI architecture.**

---

## 🏛️ The Vision: Problem vs. Solution

### The Challenge
Traditional temple websites often suffer from static, non-engaging interfaces that fail to capture the spiritual "vibe" or provide real-time assistance to global devotees. Language barriers and lack of interactive teachings often distance the youth from sacred wisdom.

### The Blueprint Solution
**KM Periyava Sannadhi** is engineered as a **Digital Sanctuary**. It’s not just a website; it’s an immersive experience.
- **Bilingual Core**: Seamless real-time switching between Tamil and English.
- **AI Divine Assistant**: A context-aware chatbot powered by NVIDIA NIM Nemotron 70B for instant guidance on temple history and rituals.
- **Multisensory Engagement**: Integrated sacred chants, falling flower petals, and "Read Aloud" capabilities for divine teachings.

---

## 🧠 Intelligence & Architecture

The system follows a modern SPA (Single Page Application) architecture with a focus on **Performance** and **Immersive Design**.

### System Flow Diagram

```mermaid
graph TD
    User((Devotee)) --> Frontend[Vite + React 19 SPA]
    Frontend --> AI[NVIDIA NIM API - Nemotron 70B]
    Frontend --> Speech[Web Speech API - Read Aloud]
    Frontend --> Audio[HTML5 Audio - Sacred Chants]
    Frontend --> Analytics[Google Analytics 4]
    
    subgraph "Core Engine"
    Frontend
    end
    
    subgraph "External Services"
    AI
    Speech
    Audio
    Analytics
    end
```

### Key Technical Pillars
| Feature | Implementation |
| :--- | :--- |
| **AI Chatbot** | NVIDIA NIM API integration with `nvidia/llama-3.1-nemotron-70b-instruct` for Satvic-toned responses. |
| **Animation Engine** | `motion/react` for fluid page transitions, scrolling lyrics, and interactive petals. |
| **Accessibility** | Web Speech API for "Read Aloud" teachings, ensuring inclusivity for all age groups. |
| **Performance** | Custom `LazyImage` component and Vite-optimized build pipeline for sub-second load times. |

---

## 🛠️ Setup & Installation

Follow these steps to deploy your own instance of the sanctuary.

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- A NVIDIA NIM API Key (get it at https://build.nvidia.com)

### 1. Clone & Install
```bash
git clone https://github.com/rahulcvwebsitehosting/km-periyava-sannadhi.git
cd km-periyava-sannadhi
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_GA_ID=G-SST437CJCD
VITE_NVIDIA_NIM_API_KEY=your_nvidia_nim_api_key_here
```

### 3. Development & Build
```bash
# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 UI Layout Blueprint

| Section | Design Philosophy |
| :--- | :--- |
| **Hero Section** | High-impact visual of Sri Kanchi Maha Periyava with a 3D tilt effect. |
| **Divine Controls** | Floating header controls for Music, Petals, and Language. |
| **Wisdom Portal** | Daily quotes with "Read Aloud" functionality and bilingual toggle. |
| **Chatbot** | Persistent floating action button (FAB) with an animated "Om" pulse. |

---

## 🤝 Connect & Collaborate

This project is maintained by **Rahul Shyam**. I am passionate about building high-performance, meaningful web applications.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rahul_Shyam-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rahulshyamcivil)
[![GitHub](https://img.shields.io/badge/GitHub-rahulcvwebsitehosting-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rahulcvwebsitehosting)

---

<p align="center">
  <i>Jaya Jaya Shankara, Hara Hara Shankara</i><br>
  <b>© 2026 KM Periyava Sannadhi</b>
</p>
