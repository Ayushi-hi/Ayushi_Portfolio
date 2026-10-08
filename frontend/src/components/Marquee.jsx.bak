const techs = ['React','Node.js','React Native','Spring Boot','Blockchain','Cloud Computing','Figma','JavaScript','Python','Oracle Cloud']

export default function Marquee() {
  const items = [...techs, ...techs]
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {items.map((t, i) => (
          <span key={i}>
            {t}{i < items.length - 1 && <span className="marquee-sep"> ✦ </span>}
          </span>
        ))}
      </div>
    </div>
  )
}