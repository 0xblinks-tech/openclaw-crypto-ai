---
name: openclaw-crypto-ai
description: >
  Build a fully functional OpenClaw AI crypto assistant React app for the Binance ecosystem.
  Use this skill whenever the user wants to create a crypto AI chatbot, trading assistant,
  crypto education tool, Binance helper, DeFi assistant, or any AI-powered tool related to
  cryptocurrency, trading strategy, portfolio management, or blockchain. Also triggers for
  "OpenClaw", "币安 AI", "加密助手", "crypto bot", "trading AI", or any Binance hackathon
  entry. Always use this skill even if the user only mentions building "something for crypto"
  or "a chat app for trading" — do not try to build from scratch without consulting this skill.
---

# OpenClaw Crypto AI Skill

Builds a production-ready, AI-powered crypto assistant React artifact using the Anthropic API.
Designed as a Binance ecosystem tool — works as a crypto educator, trading strategy guide,
portfolio advisor, or general Binance UX helper.

## What This Skill Produces

A single-file React `.jsx` artifact with:
- Real-time AI chat powered by Claude (via Anthropic API)
- Binance-themed dark UI (gold `#F0B90B` accent, grid background, glow effects)
- Markdown rendering for structured AI responses
- Quick-start suggestion chips
- Typing indicator + smooth animations
- Fully localized (Chinese or English based on user preference)

## Step-by-Step Instructions

### 1. Determine Language & Focus

Ask (or infer from context):
- **Language**: Chinese (`zh`) or English (`en`)?
- **Focus area**: Pick one or let user choose:
  - `education` — explain crypto concepts, Binance products
  - `trading` — strategy, risk management, market structure
  - `portfolio` — DCA, rebalancing, wealth tracking
  - `general` — all-purpose Binance assistant

### 2. Select the System Prompt

Use the appropriate system prompt template from the **Assets** section below,
substituting the focus area. The prompt must:
- Define the AI persona as "OpenClaw" (开爪 in Chinese)
- Specify the focus area's expertise
- Require every response to end with a 🔥 Alpha Tip (Alpha 小贴士 in Chinese)
- Prohibit direct financial advice — frame everything as education/strategy

### 3. Build the React Component

Follow this component structure exactly:

```
OpenClaw()
├── State: messages[], input, loading, error
├── Header: logo + title + live status dot
├── MessagesArea: scrollable chat history
│   ├── UserMessage (gold gradient bubble, right-aligned)
│   └── AIMessage (dark bordered bubble, left-aligned, with markdown)
├── SuggestionsRow: shown only when messages.length <= 1
├── ErrorBanner: shown on API failure
└── InputArea: textarea + send button
```

**Critical implementation details:**
- Use `useRef` + `scrollIntoView` for auto-scroll
- Parse markdown: bold, italic, inline code, h2/h3, bullet lists, newlines
- Send full conversation history on every API call (no memory between calls)
- `Enter` sends, `Shift+Enter` adds newline
- Disable send button when loading or input is empty
- Handle API errors gracefully with a localized error message

### 4. Styling Rules

| Token | Value |
|-------|-------|
| Background | `#0A0B0E` |
| Gold accent | `#F0B90B` |
| AI bubble bg | `rgba(255,255,255,0.04)` |
| AI bubble border | `rgba(240,185,11,0.12)` |
| User bubble | `linear-gradient(135deg, #F0B90B, #E8A800)` |
| User text | `#0A0B0E` |
| Body text | `#D0D0D0` |
| Error | `#FF6B6B` |
| Online dot | `#00C853` |

**Background effects (required):**
- CSS grid overlay: `rgba(240,185,11,0.03)` lines, 40px spacing
- Radial glow at top: `rgba(240,185,11,0.06)`, 800×400px ellipse

**Fonts:**
- Chinese: `'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif`
- English: `'DM Sans', 'Segoe UI', sans-serif`

**Animations (define in `<style>` tag):**
- `bounce`: typing indicator dots (translateY, 1.2s)
- `pulse`: status dot opacity (2s)
- `fadeUp`: message entrance (translateY 10px → 0, 0.3s)

### 5. API Call Pattern

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: conversationHistory, // full history, role+content only
  }),
});
const data = await response.json();
if (data.error) throw new Error(data.error.message);
const text = data.content.map(b => b.text || "").join("");
```

Never include an API key — it is injected automatically by the platform.

### 6. Default Suggestion Chips

**Chinese (6 chips):**
1. 如何在币安理财中使用定投？
2. BNB 链和以太坊有什么区别？
3. 熊市中最好的策略是什么？
4. 如何看懂加密货币订单簿？
5. 币安合约和现货交易的区别？
6. 杠杆交易有哪些风险？

**English (6 chips):**
1. How does DCA work on Binance Earn?
2. Explain BNB Chain vs Ethereum
3. What's the best strategy for a bear market?
4. How do I read a crypto order book?
5. Explain Binance Futures vs Spot trading
6. What are the risks of leverage trading?

### 7. Footer

Always include at the bottom:
- Chinese: `为币安 OpenClaw AI 黑客松 2026 打造 · 由 Claude 驱动`
- English: `Built for Binance OpenClaw AI Hackathon 2026 · Powered by Claude`

---

## Assets

### System Prompt — Chinese (General)

```
你是 OpenClaw（开爪），币安生态系统的顶级 AI 助手。你精准、深刻，对加密货币交易、
DeFi、BNB 链、币安产品和市场策略有深入了解。

你的性格：自信、富有洞察力、略带锋芒——像一个热爱教学的资深加密交易员。
你自然地使用加密货币术语。简洁但在需要时有深度。

你的能力：
- 清晰解释加密货币概念（DCA、DeFi、衍生品、现货交易、期货、BNB链等）
- 分析交易策略和风险管理
- 帮助用户了解币安产品（币安理财、Launchpad、合约、跟单交易等）
- 提供投资组合管理指导
- 解释市场结构（支撑/阻力、市场周期、市场情绪）
- 帮助用户制定智能提醒和交易计划
- 解释代币经济学和项目基本面

每次回答结尾都加上一条"🔥 Alpha 小贴士"——一条简短、可操作的加密智慧。
保持回答聚焦、实用、赋能用户。需要时使用 markdown 格式。
永远不给出财务建议——将一切框架为教育和策略指导。全程使用中文回答。
```

### System Prompt — English (General)

```
You are OpenClaw, an elite AI assistant built for the Binance ecosystem. You are sharp,
precise, and deeply knowledgeable about crypto trading, DeFi, BNB Chain, Binance products,
and market strategy.

Your personality: Confident, insightful, slightly edgy — like a seasoned crypto trader who
also loves teaching. You use crypto terminology naturally. Concise but deep when needed.

Your capabilities:
- Explain crypto concepts clearly (DCA, DeFi, derivatives, spot trading, futures, BNB Chain)
- Analyze trading strategies and risk management
- Help users understand Binance products (Earn, Launchpad, Futures, Copy Trading, etc.)
- Provide portfolio management guidance
- Explain market structure (support/resistance, market cycles, sentiment)
- Help users set up smart alerts and trading plans
- Explain tokenomics and project fundamentals

Always end responses with a 🔥 Alpha Tip — a short, actionable piece of crypto wisdom.
Keep responses focused, practical, and empowering. Use markdown when helpful.
Never give financial advice — frame everything as education and strategy frameworks.
```

---

## Customization Options

When the user requests variations, apply these modifications:

| Request | Change |
|---------|--------|
| Trading focus | Adjust system prompt to emphasize TA, chart patterns, entry/exit strategy |
| Education focus | Adjust to explain concepts from beginner level, add more analogies |
| Portfolio focus | Adjust to cover DCA automation, rebalancing triggers, risk allocation |
| Different accent color | Replace all `#F0B90B` / `#E8A800` instances |
| Add web search | Add `tools: [{ type: "web_search_20250305", name: "web_search" }]` to API call |

---

## Quality Checklist

Before delivering the artifact, verify:
- [ ] AI responds in the correct language
- [ ] Every AI response ends with 🔥 Alpha Tip
- [ ] Suggestion chips are hidden after first user message
- [ ] Send button disabled while loading
- [ ] Error state displays correctly
- [ ] Auto-scroll works on new messages
- [ ] Markdown renders (bold, code, bullets, headers)
- [ ] No `localStorage` or `sessionStorage` used
- [ ] No API key hardcoded
