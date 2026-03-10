const skills = [
  { name: 'Languages', pills: ['C','C++','Python','Java','JavaScript'] },
  { name: 'Frontend',  pills: ['HTML','CSS','React','React Native'] },
  { name: 'Backend',   pills: ['Node.js','Convex','Spring Boot'] },
  { name: 'Design',    pills: ['Figma','Canva','UI/UX'] },
  { name: 'Tools',     pills: ['Git','GitHub','VS Code'] },
]

export default function About() {
  return (
    <section className="about-strip" id="skills">
      <div className="about-strip-inner">
        <div className="about-text reveal">
          <div className="s-label"><div className="s-label-line"></div> About Me</div>
          <h2 className="s-title">Crafting<br /><em>Digital</em><br />Experiences</h2>
          <p className="about-body">
            A <strong>Cloud Computing student</strong> at SRMIST with a passion for building
            things that work beautifully. From full-stack pet adoption platforms to blockchain
            decentralized solutions — I bring curiosity and care to every line of code.
          </p>
        </div>
        <div className="about-skills-col reveal">
          {skills.map(s => (
            <div className="skill-row" key={s.name}>
              <div className="skill-row-name">{s.name}</div>
              <div className="skill-pills">
                {s.pills.map(p => <span className="pill" key={p}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-deco"></div>
    </section>
  )
}