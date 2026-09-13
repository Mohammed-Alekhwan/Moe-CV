import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** A self-contained, disposable WebGL scene with pointer and keyboard controls. */
export function createScene(container, initiallyPaused) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return null;
  }

  const abort = new AbortController();
  const on = (target, type, callback, options = {}) =>
    target.addEventListener(type, callback, {
      ...options,
      signal: abort.signal,
    });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x11120f, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(0, 0, 8.5);

  const room = new RoomEnvironment();
  const generator = new THREE.PMREMGenerator(renderer);
  const environment = generator.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  generator.dispose();

  const group = new THREE.Group();
  group.position.y = 0.05;
  scene.add(group);
  const geometry = new THREE.TorusKnotGeometry(1.12, 0.345, 240, 40, 2, 3);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xd6ddcf,
    metalness: 1,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    envMapIntensity: 2.15,
  });
  const sculpture = new THREE.Mesh(geometry, material);
  sculpture.rotation.set(0.55, -0.35, -0.32);
  group.add(sculpture);
  const wireGeometry = new THREE.TorusKnotGeometry(1.12, 0.345, 96, 14, 2, 3);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xc6ef78,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
  });
  const wire = new THREE.Mesh(wireGeometry, wireMaterial);
  wire.visible = false;
  wire.rotation.copy(sculpture.rotation);
  group.add(wire);

  const keyLight = new THREE.DirectionalLight(0xfaffed, 3);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);
  const limeLight = new THREE.PointLight(0xc6ff54, 30, 15, 2);
  limeLight.position.set(2, -2, 2);
  scene.add(limeLight);
  const fill = new THREE.DirectionalLight(0x9cafa3, 1.5);
  fill.position.set(3, 1, -4);
  scene.add(fill);

  const orbit = new THREE.Group();
  orbit.rotation.set(1.2, -0.35, -0.5);
  scene.add(orbit);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xc6ff6b,
    transparent: true,
    opacity: 0.43,
  });
  const orbitGeometry = new THREE.TorusGeometry(2.03, 0.006, 6, 140);
  orbit.add(new THREE.Mesh(orbitGeometry, orbitMaterial));
  const satelliteGeometry = new THREE.SphereGeometry(0.095, 24, 16);
  const satelliteMaterial = new THREE.MeshStandardMaterial({
    color: 0xd5ff5f,
    metalness: 0.3,
    roughness: 0.3,
    emissive: 0x8fb52c,
    emissiveIntensity: 0.35,
  });
  const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
  satellite.position.set(2.03, 0, 0);
  orbit.add(satellite);
  const secondaryOrbit = new THREE.Mesh(
    new THREE.TorusGeometry(2.28, 0.004, 5, 140),
    new THREE.MeshBasicMaterial({
      color: 0xaebd92,
      transparent: true,
      opacity: 0.14,
    }),
  );
  secondaryOrbit.rotation.set(0.5, 1.1, 0.6);
  scene.add(secondaryOrbit);

  const positions = new Float32Array(70 * 3);
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (random() - 0.5) * 7;
    positions[i + 1] = (random() - 0.5) * 6;
    positions[i + 2] = (random() - 0.5) * 3 - 1.5;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const dust = new THREE.Points(
    dustGeometry,
    new THREE.PointsMaterial({
      color: 0xb9c794,
      size: 0.012,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    }),
  );
  scene.add(dust);

  let paused = initiallyPaused;
  let visible = true;
  let disposed = false;
  let contextLost = false;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let dragging = false;
  let previousX = 0;
  let previousY = 0;
  let yaw = 0;
  let pitch = 0;
  let pointerX = 0;
  let pointerY = 0;

  function render() {
    if (disposed || contextLost) return;
    group.rotation.set(pitch + pointerY, yaw + pointerX, 0);
    renderer.render(scene, camera);
  }
  function animate(time) {
    frame = 0;
    if (disposed || paused || !visible || document.hidden || contextLost)
      return;
    const delta = Math.min((time - (lastTime || time)) / 1000, 0.05);
    lastTime = time;
    elapsed += delta;
    if (!dragging) yaw += delta * 0.115;
    group.position.y = 0.05 + Math.sin(elapsed * 0.65) * 0.07;
    orbit.rotation.z = -0.5 + elapsed * 0.09;
    dust.rotation.y = elapsed * 0.018;
    render();
    frame = requestAnimationFrame(animate);
  }
  function syncLoop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (!paused && visible && !document.hidden && !disposed && !contextLost)
      frame = requestAnimationFrame(animate);
    else if (visible && !document.hidden) render();
  }
  function resize() {
    if (disposed) return;
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    // Keep the complete orbit within narrow mobile viewports.
    camera.position.z = camera.aspect < 0.8 ? 9.8 : 8.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      syncLoop();
    },
    { rootMargin: "80px" },
  );
  visibilityObserver.observe(container);
  on(document, "visibilitychange", syncLoop);

  on(container, "pointerdown", (event) => {
    if (event.button !== 0) return;
    dragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    container.setPointerCapture(event.pointerId);
  });
  on(container, "pointermove", (event) => {
    if (dragging) {
      yaw += (event.clientX - previousX) * 0.008;
      pitch = THREE.MathUtils.clamp(
        pitch + (event.clientY - previousY) * 0.006,
        -1.4,
        1.4,
      );
      previousX = event.clientX;
      previousY = event.clientY;
    } else if (!paused && event.pointerType === "mouse") {
      const bounds = container.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.09;
    }
    if (paused || dragging) render();
  });
  const release = () => {
    dragging = false;
  };
  on(container, "pointerup", release);
  on(container, "pointercancel", release);
  on(container, "lostpointercapture", release);
  on(container, "pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
    if (paused) render();
  });
  on(container, "keydown", (event) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(
        event.key,
      )
    )
      return;
    event.preventDefault();
    if (event.key === "ArrowLeft") yaw -= 0.18;
    if (event.key === "ArrowRight") yaw += 0.18;
    if (event.key === "ArrowUp") pitch -= 0.18;
    if (event.key === "ArrowDown") pitch += 0.18;
    if (event.key === "Home") {
      yaw = 0;
      pitch = 0;
    }
    pitch = THREE.MathUtils.clamp(pitch, -1.4, 1.4);
    render();
  });
  on(renderer.domElement, "webglcontextlost", (event) => {
    event.preventDefault();
    contextLost = true;
    container.classList.remove("ready");
    syncLoop();
  });
  on(renderer.domElement, "webglcontextrestored", () => {
    contextLost = false;
    container.classList.add("ready");
    syncLoop();
  });

  resize();
  container.classList.add("ready");
  syncLoop();

  return {
    setPaused(value) {
      paused = value;
      pointerX = 0;
      pointerY = 0;
      syncLoop();
    },
    setMaterial(name) {
      wire.visible = name === "wire";
      sculpture.visible = name !== "wire";
      material.color.set(name === "lime" ? 0xceff64 : 0xd6ddcf);
      material.metalness = name === "lime" ? 0.15 : 1;
      material.roughness = name === "lime" ? 0.26 : 0.18;
      material.envMapIntensity = name === "lime" ? 0.8 : 2.15;
      render();
    },
    reset() {
      yaw = 0;
      pitch = 0;
      pointerX = 0;
      pointerY = 0;
      render();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      abort.abort();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material))
          object.material.forEach((item) => item.dispose());
        else object.material?.dispose();
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      container.classList.remove("ready");
    },
  };
}
