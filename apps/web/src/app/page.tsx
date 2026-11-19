const highlights = [
  {
    number: "01",
    title: "Find your people",
    description:
      "Explore interest-led communities and conversations beyond your city or country.",
  },
  {
    number: "02",
    title: "Understand more",
    description:
      "A translation-first experience designed to make language less of a barrier. Translation features are coming soon.",
  },
  {
    number: "03",
    title: "Share what matters",
    description:
      "A space for ideas, stories, creativity, and meaningful discovery across borders.",
  },
];

const communities = [
  { name: "Creative minds", members: "Art · Design · Ideas", tag: "CREATIVITY" },
  { name: "The language exchange", members: "Practice · Culture · Learning", tag: "LANGUAGES" },
  { name: "Build & technology", members: "Startups · Code · Product", tag: "TECH" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#" aria-label="VYORA home">
          <span className="brand-symbol">V</span>
          <span>VYORA</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#communities">Communities</a>
          <a href="#vision">Our vision</a>
        </div>
        <a className="nav-cta" href="#join">Get early access <span>↗</span></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> A NEW WAY TO CONNECT</div>
          <h1>The world is closer <span>than ever.</span></h1>
          <p className="hero-lede">
            Discover people, ideas, and communities beyond borders.
            One world. More ways to understand each other.
          </p>
          <div className="hero-actions" id="join">
            <a className="button-primary" href="mailto:hello@vyora.example?subject=VYORA%20early%20access">
              Join the early access list <span>↗</span>
            </a>
            <a className="button-quiet" href="#about">Explore the vision <span>↓</span></a>
          </div>
          <div className="hero-note"><span className="note-icon">✳</span> Built for a world without language barriers.</div>
        </div>

        <div className="visual" aria-label="Abstract illustration of people and connections around the world">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="glow" />
          <div className="planet">
            <div className="planet-shine" />
            <div className="planet-grid" />
            <span className="planet-label">ONE WORLD<br />MANY VOICES</span>
          </div>
          <div className="float-card card-top"><span className="avatar avatar-a">A</span><span><b>New perspectives</b><small>From everywhere</small></span><i>✦</i></div>
          <div className="float-card card-bottom"><span className="translate-icon">文</span><span><b>Language connects us</b><small>Understanding in progress</small></span><i className="status-dot" /></div>
          <div className="visual-caption">YOUR WORLD, EXPANDED <span>✳</span></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell strip-inner">
          <span>ONE GLOBAL COMMUNITY</span><i /> <span>MANY LANGUAGES</span><i /> <span>SHARED INTERESTS</span><i /> <span>REAL CONNECTIONS</span>
        </div>
      </section>

      <section className="section shell" id="about">
        <div className="section-heading">
          <div><div className="eyebrow">A DIFFERENT KIND OF SOCIAL</div><h2>Not just more content.<br /><span>More connection.</span></h2></div>
          <p>VYORA is being shaped around a simple idea: where you come from and what language you speak should never limit who you can connect with.</p>
        </div>
        <div className="feature-grid">
          {highlights.map((item) => (
            <article className="feature-card" key={item.number}>
              <span className="feature-number">{item.number}</span>
              <div className="feature-mark">{item.number === "01" ? "◎" : item.number === "02" ? "文" : "✳"}</div>
              <h3>{item.title}</h3><p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="community-section" id="communities">
        <div className="shell">
          <div className="eyebrow">YOUR INTERESTS HAVE NO BORDERS</div>
          <div className="community-heading"><h2>Find your corner<br />of the <span>world.</span></h2><p>From the things you love to the things you want to learn, discover spaces where your curiosity belongs.</p></div>
          <div className="community-grid">
            {communities.map((community, index) => (
              <article className="community-card" key={community.name}>
                <div className={`community-art art-${index + 1}`}><span>{["✳", "文", "⌘"][index]}</span><small>{community.tag}</small></div>
                <div className="community-info"><h3>{community.name}</h3><p>{community.members}</p><span className="arrow">↗</span></div>
              </article>
            ))}
          </div>
          <p className="demo-label">COMMUNITY CONCEPTS · EXAMPLES ONLY</p>
        </div>
      </section>

      <section className="closing shell" id="vision">
        <div className="closing-orb">V</div>
        <div><div className="eyebrow">THE NEXT CHAPTER OF CONNECTION</div><h2>Different languages.<br /><span>One shared world.</span></h2></div>
        <a className="button-primary" href="mailto:hello@vyora.example?subject=VYORA%20early%20access">Be part of it <span>↗</span></a>
      </section>

      <footer className="footer shell"><a className="wordmark" href="#"><span className="brand-symbol">V</span><span>VYORA</span></a><span>Connect Beyond Borders.</span><span>© {new Date().getFullYear()} VYORA. Concept preview.</span></footer>
    </main>
  );
}
