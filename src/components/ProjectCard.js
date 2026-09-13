export default function ProjectCard({ project, index }) {
  const featured = project.id === "wheelchair";
  return (
    <article
      className={`project-card reveal${featured ? " featured-project" : ""}`}
      data-category={project.category}
      data-project={project.id}
    >
      <button
        className={`project-cover ${project.id}-cover`}
        data-open-project={project.id}
        aria-label={`Explore ${project.title} project`}
      >
        <span className="cover-topline">
          <span>{project.label}</span>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {featured ? "FEATURED" : "SELECTED WORK"}
          </span>
        </span>
        {featured ? (
          <div className="wheelchair-art" aria-hidden="true">
            <div className="wheelchair-copy">
              <span>Mobility,</span>
              <span>
                with <em>purpose.</em>
              </span>
              <p>Rentals. Live tracking. Connected operations.</p>
            </div>
            <div className="wheelchair-blueprint">
              <div className="blueprint-circle" />
              <svg viewBox="0 0 400 400" fill="none">
                <circle cx="224" cy="84" r="23" />
                <path d="m209 119-19 110h98l32 74h33M201 167h75M194 202h88M169 181a91 91 0 1 0 79 123" />
                <circle className="blueprint-wheel" cx="162" cy="273" r="70" />
                <path
                  className="blueprint-spokes"
                  d="M162 203v140M92 273h140M112 223l100 100M112 323l100-100"
                />
              </svg>
              <span className="blueprint-label">
                HUMAN NEED. ENGINEERED SOLUTION.
              </span>
            </div>
          </div>
        ) : project.id === "sachat" ? (
          <div className="sachat-art" aria-hidden="true">
            <span className="sachat-word">
              SaChat<span>↗</span>
            </span>
            <div className="conversation-shapes">
              <span className="bubble-one">
                <i />
                <i />
                <i />
              </span>
              <span className="bubble-two">
                <svg viewBox="0 0 120 50">
                  <path d="M8 25h5m6-10v20m8-28v36m8-21v6m8-16v26m8-33v40m8-26v12m8-19v26m8-34v42m8-28v14m8-21v28m8-18v8" />
                </svg>
              </span>
            </div>
            <span className="sachat-caption">
              A closer connection.
              <br />A real-time experience.
            </span>
          </div>
        ) : (
          <div className="site-art">
            <span className="site-cover-word" aria-hidden="true">
              {project.id === "efadgrp"
                ? "EFAD."
                : project.id === "mercato"
                  ? "MERCATO."
                  : "Good things\ncome around."}
            </span>
            <div className="site-browser">
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <p>{new URL(project.url).hostname}</p>
              </div>
              <img
                src={`/Moe-CV/images/${project.images[0].file}`}
                alt={project.images[0].alt}
                width="1440"
                height="1050"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <span className="cover-open">
          <i data-lucide="arrow-up-right" />
        </span>
        <span className="cover-bottomline">
          {project.tags.slice(0, 2).join(" / ").toUpperCase()}
        </span>
      </button>
      <div className="project-info">
        <div>
          <h3>
            <button data-open-project={project.id}>{project.title}</button>
          </h3>
          <p>{project.subtitle}</p>
        </div>
        <span className="project-type">{project.type}</span>
      </div>
    </article>
  );
}
