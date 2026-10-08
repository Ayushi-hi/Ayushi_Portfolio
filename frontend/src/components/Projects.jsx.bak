const fallbackFeatured = {
  title: 'DERMIQUE', emoji: '🧴',
  description: 'AI-powered skincare analyzer achieving 92% detection accuracy for harmful cosmetic compounds. Full-stack web app with intelligent caching reducing API response time to sub-second latency.',
  techStack: ['React.js', 'Node.js', 'MongoDB', 'AI', 'REST APIs'],
  githubUrl: 'https://github.com/Ayushi-hi/dermique',
  liveUrl: 'https://dermique.vercel.app/'
}
const fallbackOthers = [
  {
    title: 'VoteChain India', emoji: '🗳️',
    description: 'Secure blockchain voting system built on Solana for immutable, tamper-proof vote recording. Integrated Aadhaar-based authentication with cryptographic signing ensuring 100% transaction integrity.',
    techStack: ['Solana', 'React.js', 'Web3.js', 'Node.js', 'Smart Contracts'],
    githubUrl: 'https://github.com/Ayushi-hi/Digital-Votechain-India',
    liveUrl: 'https://digital-votechain-india.vercel.app/'
  },
  {
    title: 'OS-Mon Academy', emoji: '🎮',
    description: 'Interactive 3D platform teaching Operating Systems concepts with 10+ gamified modules. Integrated Three.js graphics engine for real-time 3D rendering supporting 50+ concurrent users.',
    techStack: ['React.js', 'Three.js', 'TypeScript', 'Vite', 'TailwindCSS'],
    githubUrl: 'https://github.com/Ayushi-hi/Os-Mon',
    liveUrl: 'https://os-mon.vercel.app/'
  },
  {
    title: 'PawMatch', emoji: '🐾',
    description: 'Full-stack pet adoption platform connecting users with NGO shelter animals. Built REST APIs for pet listings, user profiles, and adoption request workflows.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'Spring Boot'],
    githubUrl: 'https://github.com/Ayushi-hi/PawMatch',
    liveUrl: 'https://pawmatch-txnh.onrender.com/'
  },
]

export default function Projects({ projects }) {
  const featured = projects.find(p => p.featured) || fallbackFeatured
  const others = projects.filter(p => !p.featured).length > 0
    ? projects.filter(p => !p.featured)
    : fallbackOthers

  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <div className="reveal">
          <div className="s-label"><div className="s-label-line"></div> Selected Work</div>
          <h2 className="s-title">Projects &amp;<br /><em>Builds</em></h2>
        </div>
        <a href="https://github.com/Ayushi-hi" target="_blank" className="btn btn-outline reveal">View all on GitHub ↗</a>
      </div>

      <div className="proj-featured reveal">
        <div>
          <div className="proj-featured-badge">✦ Featured Project</div>
          <div className="proj-featured-name">{featured.title}</div>
          <p className="proj-featured-desc">{featured.description}</p>
          <div className="proj-tags" style={{justifyContent:'flex-start',marginBottom:'2rem'}}>
            {featured.techStack?.map(t => <span className="ptag" key={t}>{t}</span>)}
          </div>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <a href={featured.githubUrl || '#'} target="_blank" className="btn btn-gold">
              <span>GitHub</span><span>↗</span>
            </a>
            <a href={featured.liveUrl || '#'} target="_blank" className="btn btn-outline">
              <span>Live Demo</span><span>↗</span>
            </a>
          </div>
        </div>
        <div className="proj-featured-right">
          <div className="proj-featured-vis">{featured.emoji || '💻'}</div>
        </div>
      </div>

      <div className="projects-list">
        {others.map((p, i) => (
          <div key={p.title} className="proj-item reveal">
            <div className="proj-num">0{i + 2}</div>
            <div className="proj-name">{p.title}</div>
            <div className="proj-desc">{p.description}</div>
            <div className="proj-tags">
              {p.techStack?.map(t => <span className="ptag" key={t}>{t}</span>)}
            </div>
            <div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
              <a href={p.githubUrl || '#'} target="_blank" style={{color:'var(--gold)',textDecoration:'none',fontSize:'0.85rem'}}>GitHub ↗</a>
              <a href={p.liveUrl || '#'} target="_blank" style={{color:'var(--cream)',textDecoration:'none',fontSize:'0.85rem'}}>Live Demo ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}