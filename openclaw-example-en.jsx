import { useState, useEffect, useRef } from "react";

const SYSTEM_PROMPT = `You are OpenClaw, an elite AI assistant built for the Binance ecosystem. You are sharp, precise, and deeply knowledgeable about crypto trading, DeFi, BNB Chain, Binance products, and market strategy.

Your personality: Confident, insightful, slightly edgy — like a seasoned crypto trader who also loves teaching. You use crypto terminology naturally. You're concise but deep when needed.

Your capabilities:
- Explain crypto concepts clearly (DCA, DeFi, derivatives, spot trading, futures, BNBChain, etc.)
- Analyze trading strategies and risk management
- Help users understand Binance products (Binance Earn, Launchpad, Futures, Copy Trading, etc.)
- Provide portfolio management guidance
- Give market structure explanations (support/resistance, market cycles, sentiment)
- Help users set up smart alerts and trading plans
- Explain tokenomics and project fundamentals

Always end responses with a relevant "🔥 Alpha Tip" — a short, actionable piece of crypto wisdom.

Keep responses focused, practical, and empowering. Format with markdown when helpful. Never give financial advice — frame everything as education and strategy frameworks.`;

const SUGGESTIONS = [
  "How does DCA work on Binance Earn?",
  "Explain BNB Chain vs Ethereum",
  "What's the best strategy for a bear market?",
  "How do I read a crypto order book?",
  "Explain Binance Futures vs Spot trading",
  "What are the risks of leverage trading?",
];

const TypingIndicator = () => (
  <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "12px 16px" }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#F0B90B",
        animation: "bounce 1.2s infinite",
        animationDelay: `${i * 0.2}s`,
      }} />
    ))}
  </div>
);

const parseMarkdown = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(240,185,11,0.15);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#F0B90B">$1</code>')
    .replace(/^### (.*$)/gm, '<h3 style="color:#F0B90B;margin:12px 0 6px;font-size:1em">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 style="color:#F0B90B;margin:14px 0 8px;font-size:1.1em">$1</h2>')
    .replace(/^- (.*$)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#F0B90B;flex-shrink:0">▸</span><span>$1</span></div>')
    .replace(/\n/g, '<br/>');
};

export default function OpenClaw() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "**Welcome to OpenClaw** — your edge in the crypto market.\n\nI'm built to help you master Binance, understand trading strategy, and level up your crypto knowledge. Ask me anything — from DeFi basics to advanced derivatives strategy.\n\n🔥 Alpha Tip: The market rewards those who learn continuously. What do you want to master today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setError(null);

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const assistantText = data.content.map(b => b.text || "").join("");
      setMessages([...newMessages, { role: "assistant", content: assistantText }]);
    } catch (err) {
      setError("Connection lost. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0A0B0E",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#E8E8E8",
      position: "relative",
      overflow: "hidden",
    },
    bgGrid: {
      position: "fixed",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(240,185,11,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(240,185,11,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      pointerEvents: "none",
      zIndex: 0,
    },
    bgGlow: {
      position: "fixed",
      top: "-20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "800px",
      height: "400px",
      background: "radial-gradient(ellipse, rgba(240,185,11,0.06) 0%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    },
    container: {
      maxWidth: 800,
      width: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "relative",
      zIndex: 1,
    },
    header: {
      padding: "20px 24px 16px",
      borderBottom: "1px solid rgba(240,185,11,0.1)",
      display: "flex",
      alignItems: "center",
      gap: 14,
      backdropFilter: "blur(10px)",
      background: "rgba(10,11,14,0.8)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    logoBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "linear-gradient(135deg, #F0B90B, #E8A800)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      boxShadow: "0 0 20px rgba(240,185,11,0.4)",
      flexShrink: 0,
    },
    headerText: { flex: 1 },
    headerTitle: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "#F0B90B",
      letterSpacing: "-0.02em",
      lineHeight: 1,
      marginBottom: 3,
    },
    headerSub: { fontSize: "0.75rem", color: "#666", letterSpacing: "0.05em" },
    statusDot: {
      width: 8, height: 8, borderRadius: "50%",
      background: "#00C853",
      boxShadow: "0 0 8px #00C853",
      animation: "pulse 2s infinite",
    },
    messagesArea: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(240,185,11,0.2) transparent",
    },
    userMsg: {
      alignSelf: "flex-end",
      maxWidth: "75%",
      background: "linear-gradient(135deg, #F0B90B, #E8A800)",
      color: "#0A0B0E",
      padding: "12px 16px",
      borderRadius: "18px 18px 4px 18px",
      fontSize: "0.9rem",
      fontWeight: 500,
      lineHeight: 1.5,
      boxShadow: "0 4px 20px rgba(240,185,11,0.25)",
    },
    aiMsg: {
      alignSelf: "flex-start",
      maxWidth: "85%",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(240,185,11,0.12)",
      padding: "14px 16px",
      borderRadius: "4px 18px 18px 18px",
      fontSize: "0.9rem",
      lineHeight: 1.65,
      color: "#D0D0D0",
    },
    aiLabel: {
      fontSize: "0.7rem",
      color: "#F0B90B",
      fontWeight: 700,
      letterSpacing: "0.12em",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    typingBubble: {
      alignSelf: "flex-start",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(240,185,11,0.12)",
      borderRadius: "4px 18px 18px 18px",
    },
    suggestionsWrap: {
      padding: "0 16px 8px",
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
    },
    suggestionBtn: {
      background: "rgba(240,185,11,0.06)",
      border: "1px solid rgba(240,185,11,0.2)",
      borderRadius: 20,
      padding: "6px 14px",
      color: "#C8A800",
      fontSize: "0.78rem",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    },
    inputArea: {
      padding: "12px 16px 20px",
      borderTop: "1px solid rgba(240,185,11,0.08)",
      background: "rgba(10,11,14,0.9)",
      backdropFilter: "blur(10px)",
    },
    inputRow: {
      display: "flex",
      gap: 10,
      alignItems: "flex-end",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(240,185,11,0.2)",
      borderRadius: 16,
      padding: "10px 12px",
      transition: "border-color 0.2s",
    },
    textarea: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#E8E8E8",
      fontSize: "0.9rem",
      fontFamily: "inherit",
      resize: "none",
      maxHeight: 120,
      lineHeight: 1.5,
      padding: "2px 0",
    },
    sendBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: "linear-gradient(135deg, #F0B90B, #E8A800)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "opacity 0.2s, transform 0.1s",
      fontSize: 16,
    },
    errorBanner: {
      margin: "0 16px 8px",
      padding: "10px 14px",
      background: "rgba(255,60,60,0.1)",
      border: "1px solid rgba(255,60,60,0.3)",
      borderRadius: 10,
      fontSize: "0.82rem",
      color: "#FF6B6B",
    },
    footer: {
      textAlign: "center",
      fontSize: "0.7rem",
      color: "#333",
      padding: "4px 0 8px",
    },
  };

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(240,185,11,0.2);border-radius:2px}
        .msg-in{animation:fadeUp 0.3s ease forwards}
        .sugg:hover{background:rgba(240,185,11,0.14)!important;border-color:rgba(240,185,11,0.5)!important;color:#F0B90B!important}
        .send-btn:hover:not(:disabled){opacity:0.85;transform:scale(0.95)}
        .send-btn:disabled{opacity:0.4;cursor:not-allowed}
        .input-row:focus-within{border-color:rgba(240,185,11,0.5)!important}
      `}</style>
      <div style={styles.bgGrid} />
      <div style={styles.bgGlow} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoBox}>🦞</div>
          <div style={styles.headerText}>
            <div style={styles.headerTitle}>OpenClaw</div>
            <div style={styles.headerSub}>BINANCE AI ASSISTANT · CRYPTO INTELLIGENCE</div>
          </div>
          <div style={styles.statusDot} title="Online" />
        </div>

        {/* Messages */}
        <div style={styles.messagesArea}>
          {messages.map((msg, i) => (
            <div key={i} className="msg-in" style={msg.role === "user" ? styles.userMsg : styles.aiMsg}>
              {msg.role === "assistant" && (
                <div style={styles.aiLabel}>
                  <span>🦞</span> OPENCLAW
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
            </div>
          ))}
          {loading && (
            <div className="msg-in" style={styles.typingBubble}>
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div style={styles.suggestionsWrap}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="sugg" style={styles.suggestionBtn}
                onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

        {/* Input */}
        <div style={styles.inputArea}>
          <div className="input-row" style={styles.inputRow}>
            <textarea
              ref={inputRef}
              style={styles.textarea}
              placeholder="Ask OpenClaw anything about crypto, Binance, trading strategy..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              className="send-btn"
              style={styles.sendBtn}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              ➤
            </button>
          </div>
        </div>
        <div style={styles.footer}>Built for Binance OpenClaw AI Hackathon 2026 · Powered by Claude</div>
      </div>
    </div>
  );
}
