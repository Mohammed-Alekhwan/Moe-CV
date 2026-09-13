import { projects } from "./data/projects";
import {
  createIcons,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownToLine,
  ArrowUp,
  MoveUpRight,
  RotateCcw,
  Menu,
  X,
  Plus,
  Copy,
  Pause,
  Play,
  BadgeCheck,
  Network,
  Award,
} from "lucide";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initializePortfolio() {
  let disposed = false;
  const abort = new AbortController();
  const listen = (target) => ({
    addEventListener(type, handler, options = {}) {
      target.addEventListener(type, handler, {
        ...options,
        signal: abort.signal,
      });
    },
  });
  const icons = {
    ArrowUpRight,
    ArrowDownRight,
    ArrowDownToLine,
    ArrowUp,
    MoveUpRight,
    RotateCcw,
    Menu,
    X,
    Plus,
    Copy,
    Pause,
    Play,
    BadgeCheck,
    Network,
    Award,
  };
  const refreshIcons = () =>
    createIcons({ icons, attrs: { "aria-hidden": "true" } });
  refreshIcons();
  gsap.registerPlugin(ScrollTrigger);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let savedPause = false;
  try {
    savedPause = localStorage.getItem("moe-motion-paused") === "true";
  } catch {
    /* Storage is optional. */
  }
  let motionPaused = motionQuery.matches || savedPause;
  let sceneController;
  let animationContext;
  const motionButton = document.querySelector(".motion-toggle");
  const base = "/Moe-CV/";

  function updateMotion() {
    document.documentElement.classList.toggle("motion-paused", motionPaused);
    motionButton.setAttribute("aria-pressed", String(motionPaused));
    motionButton.innerHTML = `<i data-lucide="${motionPaused ? "play" : "pause"}"></i><span>${motionPaused ? "Enable motion" : "Pause motion"}</span>`;
    refreshIcons();
    sceneController?.setPaused(motionPaused);
    animationContext?.revert();
    animationContext = null;
    if (!motionPaused) {
      animationContext = gsap.context(() => {
        gsap.from(".hero-intro, .title-line, .hero-description, .hero-ctas", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".hero-art", {
          opacity: 0,
          y: 18,
          duration: 1.6,
          delay: 0.3,
          clearProps: "all",
        });
        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: { trigger: element, start: "top 93%", once: true },
          });
        });
        gsap.to(".expertise-asterisk", {
          rotation: 120,
          ease: "none",
          scrollTrigger: {
            trigger: ".expertise",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }
  }
  updateMotion();
  listen(motionButton).addEventListener("click", () => {
    motionPaused = !motionPaused;
    savedPause = motionPaused;
    try {
      localStorage.setItem("moe-motion-paused", String(motionPaused));
    } catch {
      /* Storage is optional. */
    }
    updateMotion();
  });
  listen(motionQuery).addEventListener("change", (event) => {
    motionPaused = event.matches || savedPause;
    updateMotion();
  });

  let scrollQueued = false;
  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    document.querySelector(".scroll-progress").style.transform =
      `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
    scrollQueued = false;
  }
  listen(window).addEventListener(
    "scroll",
    () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(updateScroll);
      }
    },
    { passive: true },
  );
  updateScroll();

  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  function closeMenu(restoreFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    refreshIcons();
    if (restoreFocus) menuButton.focus();
  }
  listen(menuButton).addEventListener("click", () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute(
      "aria-label",
      opening ? "Close navigation" : "Open navigation",
    );
    menuButton.innerHTML = `<i data-lucide="${opening ? "x" : "menu"}"></i>`;
    refreshIcons();
  });
  mobileNav
    .querySelectorAll("a")
    .forEach((link) =>
      listen(link).addEventListener("click", () => closeMenu()),
    );
  listen(document).addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
  });
  listen(document).addEventListener("click", (event) => {
    if (
      !mobileNav.hidden &&
      !event.composedPath().includes(document.querySelector(".header"))
    )
      closeMenu();
  });
  listen(matchMedia("(min-width: 761px)")).addEventListener(
    "change",
    (event) => {
      if (event.matches) closeMenu();
    },
  );

  document.querySelectorAll(".filter").forEach((button) =>
    listen(button).addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      let count = 0;
      document.querySelectorAll(".project-card").forEach((card) => {
        const visible =
          button.dataset.filter === "all" ||
          card.dataset.category === button.dataset.filter;
        card.hidden = !visible;
        if (visible) count += 1;
      });
      document.querySelector(".work-counter").textContent =
        `${String(count).padStart(2, "0")} PROJECT${count === 1 ? "" : "S"}`;
      ScrollTrigger.refresh();
    }),
  );

  const dialog = document.querySelector(".project-dialog");
  let dialogTrigger;
  function openProject(id, trigger) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    dialogTrigger = trigger;
    document.querySelector("#dialog-category").textContent = project.type;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent =
      project.description;
    document.querySelector("#dialog-tags").replaceChildren(
      ...project.tags.map((tag) => {
        const el = document.createElement("span");
        el.textContent = tag;
        return el;
      }),
    );
    const gallery = document.querySelector("#dialog-gallery");
    gallery.hidden = project.images.length === 0;
    gallery.replaceChildren(
      ...project.images.map((file, index) => {
        const img = document.createElement("img");
        img.src = `${base}images/${file.file}`;
        img.alt = file.alt;
        img.loading = index > 0 ? "lazy" : "eager";
        return img;
      }),
    );
    document.querySelector("#dialog-focus").replaceChildren(
      ...project.focus.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
      }),
    );
    const action = document.querySelector("#dialog-action");
    action.href =
      project.url ||
      `mailto:mohammed.alekhwan@outlook.com?subject=${encodeURIComponent("Let’s talk about " + project.title)}`;
    action.target = project.url ? "_blank" : "_self";
    action.rel = "noopener noreferrer";
    action.innerHTML = `${project.url ? "Visit live website" : "Discuss this project"} <i data-lucide="arrow-up-right"></i>`;
    refreshIcons();
    document.body.classList.add("modal-open");
    dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector(".dialog-close").focus();
  }
  document
    .querySelectorAll("[data-open-project]")
    .forEach((button) =>
      listen(button).addEventListener("click", () =>
        openProject(button.dataset.openProject, button),
      ),
    );
  listen(document.querySelector(".dialog-close")).addEventListener(
    "click",
    () => dialog.close(),
  );
  listen(dialog).addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
  listen(dialog).addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    dialogTrigger?.focus({ preventScroll: true });
  });
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    const element = document.querySelector(".toast");
    element.textContent = message;
    element.classList.add("visible");
    toastTimer = setTimeout(() => element.classList.remove("visible"), 3500);
  }
  listen(document.querySelector(".copy-email")).addEventListener(
    "click",
    async () => {
      try {
        await navigator.clipboard.writeText("mohammed.alekhwan@outlook.com");
        toast("Email copied. Let’s make something great.");
      } catch {
        toast(
          "Email: mohammed.alekhwan@outlook.com — select the address to copy it.",
        );
      }
    },
  );
  document.querySelector("#year").textContent = new Date().getFullYear();

  document.querySelectorAll(".magnetic").forEach((element) => {
    listen(element).addEventListener("pointermove", (event) => {
      if (motionPaused || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      gsap.to(element, {
        x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
        y: (event.clientY - bounds.top - bounds.height / 2) * 0.15,
        duration: 0.4,
      });
    });
    listen(element).addEventListener("pointerleave", () =>
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: motionPaused ? 0 : 0.6,
        ease: "elastic.out(1, .5)",
      }),
    );
  });

  // Loading the scene independently keeps navigation and project galleries usable without WebGL.
  import("./scene.js")
    .then(({ createScene }) => {
      if (disposed) return;
      sceneController = createScene(
        document.querySelector("#scene"),
        motionPaused,
      );
      if (!sceneController) throw new Error("WebGL is unavailable");
      document.querySelectorAll(".material-button").forEach((button) =>
        listen(button).addEventListener("click", () => {
          sceneController.setMaterial(button.dataset.material);
          document.querySelectorAll(".material-button").forEach((item) => {
            item.classList.toggle("active", item === button);
            item.setAttribute("aria-pressed", String(item === button));
          });
        }),
      );
      listen(document.querySelector(".scene-reset")).addEventListener(
        "click",
        () => sceneController.reset(),
      );
    })
    .catch(() => {
      if (disposed) return;
      document.querySelector(".scene-hint").textContent =
        "The creative loop — still edition";
      document
        .querySelectorAll(".material-button, .scene-reset")
        .forEach((button) => {
          button.disabled = true;
        });
      document
        .querySelector("#scene")
        .setAttribute(
          "aria-label",
          "Decorative sculpture. Interactive 3D is unavailable in this browser.",
        );
    });

  return () => {
    disposed = true;
    abort.abort();
    clearTimeout(toastTimer);
    animationContext?.revert();
    sceneController?.dispose();
    gsap.killTweensOf(".magnetic");
    document.body.classList.remove("modal-open");
  };
}
