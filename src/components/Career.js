const experience = [
  {
    company: "Rasmi",
    role: "Software Engineer",
    period: "2026 — Present",
    description:
      "End-to-end product delivery with Next.js, NestJS, and React. Hajj & Umrah platforms, billing integrations, LLM-powered features, and production deployments on AWS.",
  },
  {
    company: "Madar Informatics",
    role: "System & Network Integration Engineer",
    period: "2025",
    description:
      "Enterprise network and security integration across government and business environments, from Cisco and Ruijie networks to video management and access control.",
  },
  {
    company: "Derwaza IT",
    role: "Software Engineer Intern",
    period: "Jul — Aug 2023",
    description:
      "Full-stack web features with MongoDB, Express, React, and Node.js, alongside REST API development and testing.",
  },
];

export default function Career() {
  return (
    <div className="career" aria-labelledby="career-title">
      <div className="career-intro reveal">
        <p className="eyebrow">EXPERIENCE & CREDENTIALS</p>
        <h3 id="career-title">
          From the interface
          <br />
          to the <span className="serif-word lime">infrastructure.</span>
        </h3>
        <p className="career-location">
          Jeddah, Saudi Arabia · Arabic & English
        </p>
        <ul className="certifications" aria-label="Professional certifications">
          <li>
            <i data-lucide="badge-check" />
            <span>
              AWS Solutions Architect — Associate
              <small>Also AWS Certified Cloud Practitioner</small>
            </span>
          </li>
          <li>
            <i data-lucide="network" />
            <span>
              Cisco Certified Network Associate<small>CCNA</small>
            </span>
          </li>
          <li>
            <i data-lucide="award" />
            <span>
              Milestone Systems & McKinsey
              <small>MCDE · MCIT · MCIE · Forward Program</small>
            </span>
          </li>
        </ul>
      </div>
      <ol className="career-list">
        {experience.map((job) => (
          <li className="career-item reveal" key={job.company}>
            <div className="career-item-top">
              <h4>{job.company}</h4>
              <span>{job.period}</span>
            </div>
            <p className="career-role">{job.role}</p>
            <p className="career-description">{job.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
