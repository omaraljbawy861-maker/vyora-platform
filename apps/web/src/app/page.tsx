"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase";

type Post = { id: string; author_id: string; body: string; language: string; created_at: string };
type Profile = { id: string; display_name: string | null; username: string | null };

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => { setSession(next); setLoading(false); });
    return () => data.subscription.unsubscribe();
  }, []);

  const loadFeed = useCallback(async () => {
    if (!supabase || !session) return;
    setBusy(true);
    const { data, error } = await supabase.from("posts").select("id,author_id,body,language,created_at").order("created_at", { ascending: false }).limit(40);
    if (error) { setMessage(error.message); setBusy(false); return; }
    const rows = (data ?? []) as Post[];
    setPosts(rows);
    const ids = [...new Set(rows.map((p) => p.author_id))];
    if (ids.length) {
      const { data: people } = await supabase.from("profiles").select("id,display_name,username").in("id", ids);
      setProfiles(Object.fromEntries(((people ?? []) as Profile[]).map((p) => [p.id, p])));
    } else setProfiles({});
    setBusy(false);
  }, [session]);

  useEffect(() => { if (session) void loadFeed(); else { setPosts([]); setProfiles({}); } }, [session, loadFeed]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const result = mode === "signup"
      ? await supabase.auth.signUp({ email: email.trim(), password, options: { data: { display_name: displayName.trim() } } })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (result.error) setMessage(result.error.message);
    else if (mode === "signup" && !result.data.session) setMessage("Account created. Check your email to confirm your address, then sign in.");
    else setMessage(mode === "signup" ? "Your VYORA account is ready." : "Welcome back to VYORA.");
    setBusy(false);
  }

  async function publishPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !session?.user || !postBody.trim()) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.from("posts").insert({ author_id: session.user.id, body: postBody.trim(), language: navigator.language?.split("-")[0] || "en", visibility: "public" });
    if (error) setMessage(error.message);
    else { setPostBody(""); setMessage("Your post has been published."); await loadFeed(); }
    setBusy(false);
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    setMessage(error?.message || "You have signed out.");
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#"><span className="brand-symbol">V</span><span>VYORA</span></a>
        <div className="nav-links"><a href="#about">About</a><a href="#community">Community</a><a href="#join">Join</a></div>
        {session ? <button className="nav-cta nav-button" onClick={signOut}>Sign out ↗</button> : <a className="nav-cta" href="#join">Get started ↗</a>}
      </nav>

      {!supabaseConfigured ? <section className="shell auth-shell"><h1>VYORA is almost ready.</h1><p>Supabase connection settings are missing from this deployment.</p></section>
      : loading ? <section className="shell auth-shell"><div className="eyebrow">VYORA GLOBAL</div><h1>Connecting your world…</h1></section>
      : session ? (
        <section className="shell app-shell" id="community">
          <div className="app-heading"><div><div className="eyebrow"><span className="pulse" /> YOUR GLOBAL COMMUNITY</div><h1>Welcome to <span>VYORA.</span></h1><p className="hero-lede">Signed in as {session.user.email}. Share an idea and start a conversation across borders.</p></div><div className="app-badge"><span>V</span><small>CONNECTED</small></div></div>
          {message && <p className="notice" role="status">{message}</p>}
          <form className="composer" onSubmit={publishPost}><label htmlFor="post-body">Share something with the world</label><textarea id="post-body" value={postBody} onChange={(e) => setPostBody(e.target.value)} maxLength={2000} placeholder="What would you like to share?" required /><div className="composer-footer"><span>{postBody.length}/2000</span><button className="button-primary" disabled={busy || !postBody.trim()}>{busy ? "Please wait…" : "Publish post ↗"}</button></div></form>
          <div className="feed-heading"><div><div className="eyebrow">DISCOVER</div><h2>Community feed</h2></div><button className="refresh-button" onClick={() => void loadFeed()} disabled={busy}>↻ Refresh</button></div>
          {posts.length === 0 ? <div className="empty-state"><span>✳</span><h3>Your global conversation starts here.</h3><p>{busy ? "Loading community posts…" : "Be the first to publish a post."}</p></div> : <div className="feed-list">{posts.map((post) => { const person = profiles[post.author_id]; return <article className="feed-card" key={post.id}><div className="feed-author"><span className="feed-avatar">{(person?.display_name || person?.username || "V").slice(0,1).toUpperCase()}</span><div><b>{person?.display_name || person?.username || "VYORA member"}</b><small>{new Date(post.created_at).toLocaleString()}</small></div></div><p>{post.body}</p><div className="feed-meta">{post.language.toUpperCase()} <span>·</span> PUBLIC POST</div></article>; })}</div>}
        </section>
      ) : (
        <>
          <section className="hero shell"><div className="hero-copy"><div className="eyebrow"><span className="pulse" /> A NEW WAY TO CONNECT</div><h1>The world is closer <span>than ever.</span></h1><p className="hero-lede">Discover people, ideas, and communities beyond borders. One world. More ways to understand each other.</p><div className="hero-actions"><a className="button-primary" href="#join">Create your free account <span>↗</span></a><a className="button-quiet" href="#about">Explore the vision ↓</a></div><div className="hero-note"><span className="note-icon">✳</span> Built for a world without language barriers.</div></div>
            <div className="visual" aria-label="Abstract connected world"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="glow" /><div className="planet"><div className="planet-shine" /><div className="planet-grid" /><span className="planet-label">ONE WORLD<br />MANY VOICES</span></div><div className="float-card card-top"><span className="avatar avatar-a">A</span><span><b>New perspectives</b><small>From everywhere</small></span><i>✦</i></div><div className="float-card card-bottom"><span className="translate-icon">文</span><span><b>Language connects us</b><small>Understanding in progress</small></span><i className="status-dot" /></div><div className="visual-caption">YOUR WORLD, EXPANDED <span>✳</span></div></div>
          </section>
          <section className="trust-strip"><div className="shell strip-inner"><span>ONE GLOBAL COMMUNITY</span><i /><span>MANY LANGUAGES</span><i /><span>SHARED INTERESTS</span><i /><span>REAL CONNECTIONS</span></div></section>
          <section className="section shell" id="about"><div className="section-heading"><div><div className="eyebrow">A DIFFERENT KIND OF SOCIAL</div><h2>Not just more content.<br /><span>More connection.</span></h2></div><p>Where you come from and what language you speak should never limit who you can connect with.</p></div><div className="feature-grid"><article className="feature-card"><span className="feature-number">01</span><div className="feature-mark">◎</div><h3>Find your people</h3><p>Explore communities and conversations beyond borders.</p></article><article className="feature-card"><span className="feature-number">02</span><div className="feature-mark">文</div><h3>Understand more</h3><p>A translation-first experience designed to make language less of a barrier.</p></article><article className="feature-card"><span className="feature-number">03</span><div className="feature-mark">✳</div><h3>Share what matters</h3><p>A space for ideas, stories, creativity, and discovery.</p></article></div></section>
          <section className="auth-section" id="join"><div className="shell auth-layout"><div><div className="eyebrow">YOUR NEXT CONNECTION STARTS HERE</div><h2>Join a world<br /><span>without borders.</span></h2><p>Create an account with your email. Phone and social sign-in can be enabled once their providers are configured.</p></div><div className="auth-card"><div className="auth-tabs"><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => {setMode("signup");setMessage("");}}>Create account</button><button type="button" className={mode === "signin" ? "active" : ""} onClick={() => {setMode("signin");setMessage("");}}>Sign in</button></div><form onSubmit={handleAuth}>{mode === "signup" && <label>Display name<input value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="name" placeholder="Your name" required /></label>}<label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} placeholder="At least 6 characters" required /></label><button className="button-primary auth-submit" disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create my VYORA account ↗" : "Sign in ↗"}</button></form>{message && <p className="notice" role="status">{message}</p>}<small className="auth-footnote">Use VYORA respectfully and follow community guidelines.</small></div></div></section>
        </>
      )}
      <footer className="footer shell"><a className="wordmark" href="#"><span className="brand-symbol">V</span><span>VYORA</span></a><span>Connect Beyond Borders.</span><span>© {new Date().getFullYear()} VYORA.</span></footer>
    </main>
  );
}
