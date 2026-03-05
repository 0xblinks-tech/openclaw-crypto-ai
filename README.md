# 🦞 OpenClaw Crypto AI — Claude Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built for Binance](https://img.shields.io/badge/Built%20for-Binance%20Hackathon%202026-F0B90B)](https://binance.com)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-blueviolet)](https://anthropic.com)

A **Claude Skill** that builds a production-ready AI crypto assistant for the Binance ecosystem — in one shot. Drop it into your Claude environment and instantly generate polished, functional crypto AI chatbots.

> 参赛作品：Binance OpenClaw AI 黑客松 2026 · Submission for Binance OpenClaw AI Hackathon 2026

---

## ✨ What It Does

When installed, this skill teaches Claude to generate a complete **OpenClaw AI Assistant** React app — a Binance-themed crypto chatbot powered by the Anthropic API.

**Generated app features:**
- 🤖 Real-time AI chat (Claude-powered, full conversation memory per session)
- 📚 Crypto education: DCA, DeFi, BNB Chain, Binance products, tokenomics
- 📈 Trading strategy: risk management, market structure, leverage, futures vs spot
- 💼 Portfolio guidance: rebalancing, DCA automation, wealth tracking
- 🔥 Every response ends with an **Alpha Tip** — actionable crypto wisdom
- 🌏 Full Chinese & English support
- 🎨 Binance-themed dark UI with gold accents, grid background, smooth animations

---

## 🚀 Quick Start

### Install the Skill

1. Download `SKILL.md` from this repo
2. Place it in your Claude skills directory:
   ```
   /mnt/skills/user/openclaw-crypto-ai/SKILL.md
   ```
3. Restart Claude or reload skills

### Use It

Just ask Claude naturally:

```
帮我做一个币安加密 AI 助手
```
```
Build me a crypto trading bot UI for Binance
```
```
Create an OpenClaw assistant focused on DeFi education
```

Claude will generate a complete, ready-to-render `.jsx` artifact.

---

## 📁 Skill Structure

```
openclaw-crypto-ai/
└── SKILL.md          # Main skill — instructions + system prompts + style guide
```

The skill is intentionally single-file for easy installation and portability.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0B0E` | App background |
| Gold | `#F0B90B` | Binance accent, labels, borders |
| Gold Dark | `#E8A800` | Gradient end, hover states |
| AI Bubble | `rgba(255,255,255,0.04)` | Assistant message background |
| User Bubble | `linear-gradient(135deg, #F0B90B, #E8A800)` | User message |
| Body Text | `#D0D0D0` | AI response text |
| Online | `#00C853` | Status indicator |

---

## 🛠 Customization

The skill supports several built-in variations:

| Prompt | Result |
|--------|--------|
| "focus on trading strategy" | Emphasizes TA, chart patterns, entry/exit |
| "make it for beginners" | Simpler language, more analogies |
| "portfolio management focus" | DCA automation, rebalancing, risk allocation |
| "add web search" | Enables live market data via Anthropic web search tool |
| "用中文" | Full Chinese UI + Chinese AI responses |

---

## 📋 Requirements

- Claude with Artifacts enabled (claude.ai or API)
- Anthropic API access (injected automatically in claude.ai)
- React rendering support

---

## 🏆 Hackathon Context

Built for the **Binance OpenClaw AI Hackathon 2026** (Mar 4–18, 2026).

**Category:** Marketing & Education + Product Optimization  
**Prize pool:** 48.6 BNB  
**Concept:** A reusable Claude Skill that lets anyone build a polished Binance AI assistant in seconds — democratizing crypto AI tooling for the entire community.

---

## 📄 License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

## 🤝 Contributing

PRs welcome! Ideas for contributions:
- New focus area system prompts (NFT, Web3 gaming, DeFi protocols)
- Additional language support
- Dark/light theme toggle
- Voice input integration
- Portfolio tracker with persistent storage

---

*Made with 🦞 and powered by [Claude](https://anthropic.com)*
