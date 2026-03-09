export default function Hero({ projects }) {
  return (
    <section className="hero" id="about">
      <div className="hero-divider"></div>
      <div className="hero-vertical">Azamgarh · Uttar Pradesh · India</div>
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line"></div>
          <span>Cloud Computing · Full Stack Developer</span>
        </div>
        <h1 className="hero-name">
          <span className="first">Ayushi</span>
          <span className="last">Singh.</span>
        </h1>
        <div className="hero-role">
          <div className="role-badge">B.Tech 2028</div>
          <div className="role-dot"></div>
          <div className="hero-role-text">SRM Institute of Science &amp; Technology</div>
        </div>
        <p className="hero-desc">
          Building <strong>intuitive web &amp; mobile experiences</strong> with React,
          Node.js, and cloud technologies. Driven by the belief that great software changes lives.
        </p>
        <div className="hero-cta-group">
          <a href="#contact" className="btn btn-gold"><span>Say Hello</span><span>→</span></a>
          <a href="https://github.com/Ayushi-hi" target="_blank" className="btn btn-outline"><span>GitHub</span><span>↗</span></a>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-right-bg"></div>
        <div className="hero-right-grid"></div>
        <div className="hero-right-content">
          <div className="hero-circle-wrap">
            <div className="hero-circle">
              <div className="orbit-dot"></div>
              <div className="orbit-dot"></div>
              <div className="orbit-dot"></div>
              <div className="hero-circle-inner">
                <div className="circle-initial">AS</div>
                <div className="circle-sub">Developer · Designer</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-stats-float">
          <div className="hstat">
            <div className="hstat-n">{projects.length || 4}</div>
            <div className="hstat-l">Projects</div>
          </div>
          <div className="hstat">
            <div className="hstat-n">8+</div>
            <div className="hstat-l">Technologies</div>
          </div>
          <div className="hstat">
            <div className="hstat-n">1</div>
            <div className="hstat-l">Certification</div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-ind">
        <div className="scroll-pip"></div>
        <div className="scroll-text">Scroll</div>
      </div>
    </section>
  )
}