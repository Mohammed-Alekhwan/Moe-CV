import { projects } from "../data/projects";
import Career from "../components/Career";
import ProjectCard from "../components/ProjectCard";
import PortfolioExperience from "../components/PortfolioExperience";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true"></div>
      <header className="header">
        <a className="wordmark" href="#home" aria-label="Moe, back to home">
          moe<span className="logo-star">✳</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">
            Work <span>01</span>
          </a>
          <a href="#about">
            About <span>02</span>
          </a>
          <a href="#expertise">
            Expertise <span>03</span>
          </a>
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="#contact">
            Let’s talk <i data-lucide="arrow-up-right"></i>
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label="Open navigation"
            aria-expanded="false"
            aria-controls="mobile-nav"
          >
            <i data-lucide="menu"></i>
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden
        >
          <a href="#work">
            Work <span>01</span>
          </a>
          <a href="#about">
            About <span>02</span>
          </a>
          <a href="#expertise">
            Expertise <span>03</span>
          </a>
          <a href="#contact">
            Let’s talk <i data-lucide="arrow-up-right"></i>
          </a>
        </nav>
      </header>

      <main id="main">
        <section
          className="hero section-dark"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span>
              <span className="status-dot"></span> THE PORTFOLIO OF MOHAMMED
              ALEKHWAN
            </span>
            <span className="hero-edition">
              DESIGN MINDED. ENGINEERING DRIVEN.
            </span>
          </div>
          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow hero-intro">
                SOFTWARE ENGINEER & CREATIVE THINKER
              </p>
              <h1 id="hero-title">
                <span className="title-line">Code with</span>
                <span className="title-line">
                  purpose<span className="lime">.</span>
                </span>
                <span className="title-line muted-title">Design with</span>
                <span className="title-line">
                  <span className="serif-word">personality.</span>
                </span>
              </h1>
              <p className="hero-description">
                I’m Mohammed, a software engineer in Jeddah. I turn complex
                ideas into thoughtful web and mobile products — from the first
                screen to the cloud.
              </p>
              <div className="hero-ctas">
                <a className="button button-lime magnetic" href="#work">
                  Explore my work <i data-lucide="arrow-down-right"></i>
                </a>
                <a
                  className="text-link"
                  href="/Moe-CV/documents/Mohammed-CV.pdf"
                  download="Mohammed-Alekhwan-Software-Engineer.pdf"
                >
                  Download CV <i data-lucide="arrow-down-to-line"></i>
                </a>
              </div>
            </div>
            <div className="hero-art">
              <div
                className="art-coordinate art-coordinate-top"
                aria-hidden="true"
              >
                FIG. 001 <span>THE CREATIVE LOOP</span>
              </div>
              <div className="orbit-grid" aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div
                id="scene"
                className="scene"
                tabIndex="0"
                role="group"
                aria-label="Interactive 3D sculpture. Drag or use arrow keys to rotate. Use the material controls below to change its appearance."
              >
                <div className="scene-fallback" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="art-note">
                <span className="tiny-cross" aria-hidden="true">
                  +
                </span>
                <span>
                  A LITTLE LOGIC.
                  <br />A LOT OF POSSIBILITY.
                </span>
              </div>
              <div className="scene-toolbar">
                <span className="scene-hint">
                  <i data-lucide="move-up-right"></i> Drag to explore
                </span>
                <div
                  className="material-options"
                  role="group"
                  aria-label="Sculpture material"
                >
                  <button
                    className="material-button active"
                    data-material="chrome"
                    aria-label="Chrome material"
                    aria-pressed="true"
                  >
                    <span className="swatch swatch-chrome"></span>
                  </button>
                  <button
                    className="material-button"
                    data-material="lime"
                    aria-label="Lime material"
                    aria-pressed="false"
                  >
                    <span className="swatch swatch-lime"></span>
                  </button>
                  <button
                    className="material-button"
                    data-material="wire"
                    aria-label="Wireframe material"
                    aria-pressed="false"
                  >
                    <span className="swatch swatch-wire"></span>
                  </button>
                </div>
                <button
                  className="icon-button scene-reset"
                  aria-label="Reset sculpture rotation"
                >
                  <i data-lucide="rotate-ccw"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-invitation">
              <span className="scroll-line"></span> SCROLL TO DISCOVER
            </a>
            <span>BUILT WITH INTENTION. EVERY PIXEL.</span>
            <button className="motion-toggle" aria-pressed="false">
              <i data-lucide="pause"></i>
              <span>Pause motion</span>
            </button>
          </div>
        </section>

        <div
          className="ticker"
          role="region"
          aria-label="Software engineering, interface design, creative development, thoughtful experiences"
        >
          <div className="ticker-track" aria-hidden="true">
            <span>
              SOFTWARE ENGINEERING <b>✳</b> INTERFACE DESIGN <b>✳</b> CREATIVE
              DEVELOPMENT <b>✳</b> THOUGHTFUL EXPERIENCES <b>✳</b>{" "}
            </span>
            <span>
              SOFTWARE ENGINEERING <b>✳</b> INTERFACE DESIGN <b>✳</b> CREATIVE
              DEVELOPMENT <b>✳</b> THOUGHTFUL EXPERIENCES <b>✳</b>{" "}
            </span>
          </div>
        </div>

        <section
          className="work section-light section-pad"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading reveal">
            <p className="eyebrow">
              <span className="section-index">01 /</span> SELECTED WORK
            </p>
            <div className="section-heading-row">
              <h2 id="work-title">
                Ideas, made <span className="serif-word">real.</span>
              </h2>
              <p>
                Five selected projects. Real businesses,
                <br />
                real products, and purposeful engineering.
              </p>
            </div>
          </div>
          <div className="work-controls reveal">
            <div className="filters" role="group" aria-label="Filter projects">
              <button
                className="filter active"
                data-filter="all"
                aria-pressed="true"
              >
                All work <sup>05</sup>
              </button>
              <button
                className="filter"
                data-filter="website"
                aria-pressed="false"
              >
                Websites
              </button>
              <button
                className="filter"
                data-filter="system"
                aria-pressed="false"
              >
                Systems
              </button>
              <button
                className="filter"
                data-filter="application"
                aria-pressed="false"
              >
                Applications
              </button>
            </div>
            <span className="work-counter" aria-live="polite">
              05 PROJECTS
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <div className="work-footnote reveal">
            <span>ALWAYS EXPLORING. ALWAYS MAKING.</span>
            <a
              className="text-link dark-link"
              href="https://github.com/Mohammed-Alekhwan"
              target="_blank"
              rel="noopener noreferrer"
            >
              More on GitHub <i data-lucide="arrow-up-right"></i>
            </a>
          </div>
        </section>

        <section
          className="about section-dark section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-left">
            <p className="eyebrow reveal">
              <span className="section-index">02 /</span> THE PERSON BEHIND THE
              PIXELS
            </p>
            <div className="monogram-art reveal" aria-hidden="true">
              <div className="monogram-grid"></div>
              <span className="monogram">
                m<span>.</span>
              </span>
              <div className="monogram-label">LOGIC × IMAGINATION</div>
              <span className="monogram-plus">+</span>
              <div className="rotating-seal">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path
                      id="seal-circle"
                      d="M60,60m-45,0a45,45 0 1,1 90,0a45,45 0 1,1 -90,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#seal-circle">
                      CURIOUS BY NATURE · CREATIVE BY CHOICE ·{" "}
                    </textPath>
                  </text>
                </svg>
                <span>↗</span>
              </div>
            </div>
          </div>
          <div className="about-copy">
            <h2 className="reveal" id="about-title">
              An engineer’s mind.
              <br />A designer’s{" "}
              <span className="serif-word lime">instinct.</span>
            </h2>
            <p className="about-lead reveal">
              Hi, I’m Mohammed. You can call me Moe.
            </p>
            <p className="reveal">
              I’m a software engineer with 2+ years of experience building and
              deploying full-stack web and mobile applications. At Rasmi, I work
              across product architecture, interfaces, APIs, and the cloud —
              taking ideas all the way into production.
            </p>
            <p className="reveal">
              I graduated from the University of Jeddah in 2024 with a B.Sc. in
              Software Engineering and First-Class Honours. As an AWS Certified
              Solutions Architect, I care about what happens behind a beautiful
              interface just as much as what people see.
            </p>
            <div className="about-facts reveal">
              <div>
                <span className="fact-value">4.97</span>
                <span className="fact-label">GPA / 5.00</span>
              </div>
              <div>
                <span className="fact-value">2+</span>
                <span className="fact-label">YEARS OF EXPERIENCE</span>
              </div>
              <div>
                <span className="fact-value">AWS</span>
                <span className="fact-label">
                  CERTIFIED SOLUTIONS ARCHITECT
                </span>
              </div>
            </div>
            <a
              className="text-link reveal"
              href="/Moe-CV/documents/Mohammed-CV.pdf"
              download="Mohammed-Alekhwan-Software-Engineer.pdf"
            >
              The full story — download my CV{" "}
              <i data-lucide="arrow-down-to-line"></i>
            </a>
          </div>
          <Career />
        </section>

        <section
          className="expertise section-light section-pad"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="expertise-intro">
            <p className="eyebrow reveal">
              <span className="section-index">03 /</span> HOW I THINK & BUILD
            </p>
            <h2 className="reveal" id="expertise-title">
              The details
              <br />
              make the
              <br />
              <span className="serif-word">difference.</span>
            </h2>
            <p className="reveal">
              Good software needs more than code.
              <br />
              It needs a clear purpose, considered
              <br />
              design, and care in the execution.
            </p>
            <span className="expertise-asterisk reveal" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="expertise-list">
            <details className="expertise-item reveal" open>
              <summary>
                <span className="expertise-number">01</span>
                <h3>Web development</h3>
                <span className="detail-toggle">
                  <i data-lucide="plus"></i>
                </span>
              </summary>
              <div className="expertise-detail">
                <p>
                  Responsive interfaces with a strong foundation. Thoughtful
                  structure, readable code, and interactions that make
                  navigating feel natural.
                </p>
                <div className="tags">
                  <span>Next.js & React</span>
                  <span>TypeScript</span>
                  <span>Responsive design</span>
                </div>
              </div>
            </details>
            <details className="expertise-item reveal">
              <summary>
                <span className="expertise-number">02</span>
                <h3>Interface & experience</h3>
                <span className="detail-toggle">
                  <i data-lucide="plus"></i>
                </span>
              </summary>
              <div className="expertise-detail">
                <p>
                  Clarity in every screen. I care about visual hierarchy,
                  consistent patterns, and the small decisions that help people
                  feel at home in a product.
                </p>
                <div className="tags">
                  <span>UI / UX</span>
                  <span>Visual hierarchy</span>
                  <span>Interaction design</span>
                </div>
              </div>
            </details>
            <details className="expertise-item reveal">
              <summary>
                <span className="expertise-number">03</span>
                <h3>Application engineering</h3>
                <span className="detail-toggle">
                  <i data-lucide="plus"></i>
                </span>
              </summary>
              <div className="expertise-detail">
                <p>
                  From a mobile conversation to a customer rewards journey. I
                  build application interfaces and the backend services that
                  connect them, with attention to clear workflows and
                  maintainable systems.
                </p>
                <div className="tags">
                  <span>Flutter</span>
                  <span>NestJS / Node.js</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
            </details>
            <details className="expertise-item reveal">
              <summary>
                <span className="expertise-number">04</span>
                <h3>Cloud & infrastructure</h3>
                <span className="detail-toggle">
                  <i data-lucide="plus"></i>
                </span>
              </summary>
              <div className="expertise-detail">
                <p>
                  A product’s experience extends to its reliability. I deploy
                  and operate applications on AWS and Linux with Docker,
                  monitoring, and CI/CD, supported by a foundation in enterprise
                  networking.
                </p>
                <div className="tags">
                  <span>AWS</span>
                  <span>Docker & Linux</span>
                  <span>CI/CD</span>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section
          className="contact section-dark section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-top reveal">
            <p className="eyebrow">
              <span className="section-index">04 /</span> GREAT THINGS START
              WITH A CONVERSATION
            </p>
            <span className="status-label">
              <span className="status-dot"></span> SAY HELLO
            </span>
          </div>
          <a
            className="contact-heading reveal"
            href="mailto:mohammed.alekhwan@outlook.com"
          >
            <h2 id="contact-title">
              Let’s make
              <br />
              <span className="serif-word">something</span>{" "}
              <span className="lime">matter.</span>
            </h2>
            <span className="contact-arrow magnetic">
              <i data-lucide="arrow-up-right"></i>
            </span>
          </a>
          <div className="contact-bottom reveal">
            <p>
              Have an idea, an opportunity, or a good question?
              <br />
              I’d love to hear it.
            </p>
            <div className="email-actions">
              <a href="mailto:mohammed.alekhwan@outlook.com">
                mohammed.alekhwan@
                <wbr />
                outlook.com
              </a>
              <button
                className="copy-email icon-button"
                aria-label="Copy email address"
              >
                <i data-lucide="copy"></i>
              </button>
            </div>
          </div>
          <footer>
            <a className="wordmark" href="#home" aria-label="Moe, back to home">
              moe<span className="logo-star">✳</span>
            </a>
            <span className="copyright">
              © <span id="year">2026</span> MOHAMMED ALEKHWAN
            </span>
            <div className="footer-links">
              <a
                href="https://github.com/Mohammed-Alekhwan"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <i data-lucide="arrow-up-right"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-alekhwan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <i data-lucide="arrow-up-right"></i>
              </a>
              <a href="#home">
                Back to top <i data-lucide="arrow-up"></i>
              </a>
            </div>
          </footer>
        </section>
      </main>

      <dialog className="project-dialog" aria-labelledby="dialog-title">
        <div className="dialog-top">
          <span className="eyebrow" id="dialog-category"></span>
          <button
            className="dialog-close icon-button"
            aria-label="Close project"
          >
            <i data-lucide="x"></i>
          </button>
        </div>
        <div className="dialog-content">
          <h2 id="dialog-title"></h2>
          <p id="dialog-description"></p>
          <div id="dialog-tags" className="tags"></div>
          <div className="case-study-focus">
            <p className="eyebrow">PROJECT FOCUS</p>
            <ul id="dialog-focus" />
          </div>
          <div id="dialog-gallery"></div>
          <a
            id="dialog-action"
            className="button button-lime"
            href="mailto:mohammed.alekhwan@outlook.com"
          >
            Discuss this project <i data-lucide="arrow-up-right"></i>
          </a>
        </div>
      </dialog>
      <div className="toast" role="status" aria-live="polite"></div>
      <noscript>
        <div className="noscript-note">
          You can explore my background and download my CV here. Enable
          JavaScript to try the 3D sculpture, project galleries, and filters.
        </div>
      </noscript>

      <PortfolioExperience />
    </>
  );
}
