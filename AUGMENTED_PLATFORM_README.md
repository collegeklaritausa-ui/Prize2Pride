# Prize2Pride - Augmented American English Learning Platform

## Overview

This is a **super augmented platform** built on top of the Prize2Pride codebase, featuring autonomous AI avatars, interactive voice courses, and comprehensive speech evaluation for American English learning.

## Key Features

### 1. Autonomous Animated Avatars
- **4 AI Teachers**: Aymena, Sophia, Puchasy, and Elena
- Each avatar specializes in different aspects of American English:
  - **Aymena**: Grammar & Academic English
  - **Sophia**: Speaking & Pronunciation
  - **Puchasy**: Vocabulary & Idioms
  - **Elena**: Cultural Learning & Business English
- Avatars speak autonomously using Web Speech API
- Animated visual feedback during speech

### 2. Interactive Voice Courses
- **4 Course Modules** covering levels A1 to B2:
  - Greetings & Introductions (A1)
  - Daily Conversations (A2)
  - Professional English (B1)
  - Advanced Vocabulary (B2)
- Each module contains 3 lessons with:
  - Target practice text
  - Key vocabulary with audio pronunciation
  - Grammar focus points
  - Cultural notes about American English

### 3. Speech Evaluation System
- **Real-time speech recognition** using Web Speech API
- Comprehensive evaluation of:
  - **Grammar**: Subject-verb agreement, article usage, tense consistency
  - **Vocabulary**: Level assessment (A1-C2), advanced word detection
  - **Pronunciation**: Clarity scoring, challenging word identification
  - **Fluency**: Words per minute, filler word detection
- **Scholarly feedback** with detailed explanations
- Suggestions for improvement at each level

### 4. Gamification
- Progress tracking across lessons
- Score accumulation
- Lesson completion badges
- Visual progress indicators

## Technical Architecture

### Frontend Components
- `AutonomousAvatar.tsx` - Animated avatar with speech synthesis
- `SpeechEvaluator.tsx` - Voice recording and evaluation interface
- `VoiceCourse.tsx` - Interactive course page
- `AugmentedHome.tsx` - Main landing page

### Utilities
- `speechAnalysis.ts` - Grammar rules, vocabulary levels, analysis functions

### Avatar Images
Located in `/client/public/avatars/`:
- `aymena_avatar.webp`
- `hostess_prize2pride_silver.webp` (Sophia)
- `puchasy_avatar.webp`
- `hostess_prize2pride_gold.png` (Elena)
- Additional host images from Prize2Pride-English-A1 repository

## Routes

| Route | Description |
|-------|-------------|
| `/` | Augmented home page with avatar showcase |
| `/voice-course` | Interactive voice learning course |
| `/classic` | Original Prize2Pride home page |
| `/quiz` | Quiz module |
| `/leaderboard` | Leaderboard |
| `/gift-wheel` | Prize wheel |

## Running the Platform

```bash
cd /home/ubuntu/Prize2Pride
pnpm install
pnpm run dev
```

The server runs on port 3000 (or 3002 if 3000 is busy).

## API Integration Ready

The platform is designed to integrate with:
- OpenAI API for advanced language processing
- External speech recognition APIs
- Text-to-speech services
- Language evaluation APIs

## Noble Mission

This platform is dedicated to **augmenting human life** through education, making American English learning accessible, engaging, and effective for learners worldwide.

---

**Prize2Pride** - Empowering Humanity Through Language Education

© 2025 Prize2Pride Platform
