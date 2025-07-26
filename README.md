# 🏥 Academic Project : Health
#### Jordy Bacherot | Cyprien Grunblatt | Léa Mick | Loghann Beaudot

## 🎯 Purpose

**HealthCoach App** is a web application developed as part of the **"User Interfaces and Components"** course.
Its goal is to provide an intuitive and efficient platform for **sports coaches** and **medical professionals** to monitor and manage their patients' health data.

This app empowers healthcare professionals and coaches to:
- Track **medical metrics** and **progress charts** of patients.
- Schedule and manage **appointments**.
- Communicate through a **global chat** interface between medical professionals.
- Get support from an **AI-powered chatbot** to assist with diagnostics or personalized coaching advice.

This project was developed as part of a class project in our Cognitive Sciences Master’s degree, with a focus on building a website using React.

## 🧠 Architecture Overview

The application integrates seamlessly with three powerful APIs:

### 🔗 External APIs

- **Directus API**  
  Used for managing and fetching **user profiles** and **data profiles** (patients, doctors/coaches).

- **Supabase API**  
  Stores and manages:
    - **Appointments**
    - **Real-time chat** system for communication between medical professionals.

- **Groq API (via Langchain)**  
  Enables a **custom AI chatbot**, offering assistance to medical staff using **LLM (Large Language Models)**.

## ⚙️ Tech Stack

- **React** – Frontend framework for building UI.
- **Bun** – Ultra-fast JavaScript runtime, replacing Node.js.
- **Vite** – Next-gen build tool optimized for fast development.
- 
## 🚀 Getting Started

Make sure you have **Bun** installed:

### 1. Install dependencies
```bash
bun install
```

### 2. Run the development server
```bash
bun run dev
```

## 📁 Project Structure
```
academic_health_project/
├── public/               # Static files
├── src/                  # Main source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── services/         # API and data logic
│   ├── assets/           # Images, icons, etc.
│   └── ...
├── .env                  # Environment variables
├── vite.config.ts        # Vite configuration
├── bun.lock              # Bun dependency lock
├── tsconfig.json         # TypeScript config
└── README.md             # You're reading it!
```


