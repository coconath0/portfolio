import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

type Message = { role: 'user' | 'model'; text: string };

const SUGGESTED = [
  'What are Nathaly\'s top skills?',
  'Tell me about her projects',
  'What is her education background?',
  'Is she open to job opportunities?',
  'Tell me about her work experience',
  'Who\'s Haru? 🐾',
];

export default function CocoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef<ReturnType<ReturnType<GoogleGenerativeAI['getGenerativeModel']>['startChat']> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      const apiKey = (import.meta as any).env.PUBLIC_GEMINI_KEY as string | undefined;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
        setError('Gemini API key not configured.');
        return;
      }
      try {
        const res = await fetch('/AI/COCO_AI_Script.pdf');
        if (!res.ok) throw new Error('Could not load context document.');
        const buf = await res.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        const pdfBase64 = btoa(binary);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          systemInstruction: `You are COCO, a friendly and knowledgeable AI assistant living inside Nathaly Ingol's portfolio website.
You have been given a document with complete information about Nathaly - her background, skills, projects, work experience, education, and personality.
Your job is to helpfully answer visitor questions about Nathaly using only the information in that document.
Be warm, concise, and professional. Use short paragraphs. If a question is not covered in the document, say so politely.
Never make up information. Do not answer questions unrelated to Nathaly or her portfolio.
Be sweet and nice to users. Always use emojis in your responses to make them more engaging and friendly. 🌟`,
        });

        chatRef.current = model.startChat({
          history: [
            {
              role: 'user',
              parts: [
                { text: "Hi COCO! Here's the document about Nathaly. Please read it carefully so you can answer questions about her." },
                { inlineData: { mimeType: 'application/pdf', data: pdfBase64 } },
              ],
            },
            {
              role: 'model',
              parts: [
                {
                  text: "Hi! I've read through Nathaly's portfolio document and I'm all set to help! 🌸 Ask me anything about her skills, projects, experience, or background.",
                },
              ],
            },
          ],
        });

        setReady(true);
      } catch (e: any) {
        setError(e.message ?? 'Failed to initialize assistant.');
      }
    }
    init();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading || !chatRef.current) return;
    const userText = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream(userText);
      let full = '';
      setMessages((prev) => [...prev, { role: 'model', text: '' }]);
      for await (const chunk of result.stream) {
        full += chunk.text();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: full };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "Sorry, something went wrong. Please try again! 🌿" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="coco-wrap">
      {/* ── Header ── */}
      <div className="coco-header">
        <img src="/images/nath-chibi.png" alt="COCO" className="coco-avatar-header" />
        <div>
          <p className="coco-header-name">COCO AI Bot</p>
          <p className="coco-header-sub">
            {ready ? (
              <><span className="coco-dot" />Ask me anything about Nathaly</>
            ) : error ? (
              <span className="coco-dot coco-dot--err" />
            ) : (
              <><span className="coco-dot coco-dot--loading" />Loading context…</>
            )}
          </p>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="coco-messages">
        {/* Welcome state */}
        {isEmpty && !error && (
          <div className="coco-welcome">
            <img src="/images/nath-chibi.png" alt="COCO" className="coco-welcome-img" />
            <h2 className="coco-welcome-title">Hi! I'm COCO 🦦</h2>
            <p className="coco-welcome-desc">
              I'm an AI assistant that knows all about Nathaly Ingol.
              {!ready && ' Give me a moment to load up…'}
            </p>
            {ready && (
              <div className="coco-chips">
                {SUGGESTED.map((q) => (
                  <button key={q} className="coco-chip" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="coco-error-msg">
            ⚠️ {error}
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} className={`coco-msg coco-msg--${msg.role}`}>
            {msg.role === 'model' && (
              <img src="/images/nath-chibi.png" alt="COCO" className="coco-msg-avatar" />
            )}
            <div className="coco-bubble">
              {msg.text === '' && msg.role === 'model' ? (
                <span className="coco-typing"><span /><span /><span /></span>
              ) : msg.role === 'model' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}

        {/* Streaming loader dot */}
        {loading && messages[messages.length - 1]?.text === '' && null}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="coco-input-bar">
        <input
          ref={inputRef}
          type="text"
          className="coco-input"
          placeholder={ready ? 'Ask about Nathaly…' : 'Loading…'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={!ready || loading}
        />
        <button
          className="coco-send"
          onClick={() => send(input)}
          disabled={!ready || loading || !input.trim()}
          aria-label="Send"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
