export default function Education() {
  return (
    <section className="edu-section" id="education">
      <div className="edu-block reveal-left">
        <div className="s-label"><div className="s-label-line"></div>Education</div>
        <h2 className="s-title">Academic<br /><em>Journey</em></h2>
        <div className="edu-card-new">
          <div className="edu-school">SRM Institute of<br />Science &amp; Technology</div>
          <div className="edu-deg">Bachelor of Technology — Cloud Computing</div>
          <div className="edu-yr">2024 — 2028</div>
        </div>
        <div className="vol-card">
          <div className="vol-title">🤝 NSS — National Service Scheme Member</div>
          <div className="vol-desc">
            Participated in social service and community development programs,
            building leadership, teamwork, and communication skills through hands-on volunteering.
          </div>
        </div>
      </div>
      <div className="cert-block reveal">
        <div className="s-label"><div className="s-label-line"></div>Certifications</div>
        <h2 className="s-title">Globally<br /><em>Certified</em></h2>

        <div className="cert-card-new">
          <div className="cert-icon">❄️</div>
          <div className="cert-name">SnowPro Associate: Platform</div>
          <div className="cert-sub">Issued by Snowflake · ID: S139753-260306-SOL</div>
          <div className="cert-dates">
            <div className="cert-date-item">
              <div className="cdn">Issued</div><div className="cdv">Mar 2026</div>
            </div>
            <div className="cert-date-item">
              <div className="cdn">Valid Until</div><div className="cdv">Mar 2028</div>
            </div>
          </div>
        </div>

        <div className="cert-card-new" style={{marginTop:'1.5rem'}}>
          <div className="cert-icon">☁️</div>
          <div className="cert-name">Oracle Cloud Infrastructure 2025 — AI Foundations Associate</div>
          <div className="cert-sub">Issued by Oracle Corporation</div>
          <div className="cert-dates">
            <div className="cert-date-item">
              <div className="cdn">Issued</div><div className="cdv">Dec 2025</div>
            </div>
            <div className="cert-date-item">
              <div className="cdn">Valid Until</div><div className="cdv">Dec 2027</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}