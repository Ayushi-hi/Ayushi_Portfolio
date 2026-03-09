const fallbackFeatured = {
  title: 'PawMatch', emoji: '🐾',
  description: 'A full-stack pet adoption platform connecting users with pets from NGOs. Built during Year 1 of B.Tech featuring smart pet listings, adoption request management, and a clean UI.',
  techStack: ['HTML','CSS','JavaScript','Java','Spring Boot'],
  githubUrl: 'https://github.com/Ayushi-hi'
}
const fallbackOthers = [
  { title:'SheCoder', description:'React & Node.js platform encouraging girl students to learn coding through structured paths in Web Dev, AI, and DSA.', techStack:['React','Node.js','JavaScript'], githubUrl:'https://github.com/Ayushi-hi' },
  { title:'Forage-Midas', description:'A group blockchain project building a decentralized solution using smart contract fundamentals. Reached the final round.', techStack:['Blockchain','Smart Contracts'], githubUrl:'https://github.com/Ayushi-hi' },
  { title:'TODO App', description:'First full-stack mobile app with React Native and Convex — learning component-based UI, mobile architecture, and real-time data handling.', techStack:['React Native','Convex','JavaScript'], githubUrl:'https://github.com/Ayushi-hi' },
]

export default function Projects({ projects }) {
  const featured = projects.find(p => p.featured) || (projects[0] || fallbackFeatured)
  const others   = projects.filter(p => !p.featured).length > 0
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
          <a href={featured.githubUrl || '#'} target="_blank" className="btn btn-gold">
            <span>View Project</span><span>↗</span>
          </a>
        </div>
        <div className="proj-featured-right">
          <div className="proj-featured-vis">{featured.emoji || '💻'}</div>
        </div>
      </div>

      <div className="projects-list">
        {others.map((p, i) => (
          <a href={p.githubUrl || '#'} target="_blank" key={p.title} className="proj-item reveal" style={{textDecoration:'none',color:'inherit'}}>
            <div className="proj-num">0{i + 2}</div>
            <div className="proj-name">{p.title}</div>
            <div className="proj-desc">{p.description}</div>
            <div className="proj-tags">
              {p.techStack?.map(t => <span className="ptag" key={t}>{t}</span>)}
            </div>
            <div className="proj-arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  )
}