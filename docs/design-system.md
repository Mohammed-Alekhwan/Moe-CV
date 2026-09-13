# Moe / visual direction

## Reference and interpretation

Guidance queried from the official [UI/UX Pro Max repository](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), using `creative developer portfolio editorial --design-system --motion 8 --variance 8 --density 2` and `interactive scene performance accessibility --stack threejs`.

The verified portfolio result recommended scroll-based storytelling, bold asymmetric composition, spacious layout, visible structural lines, distinct typography, and understandable content without animation. The Three.js guidance emphasized descriptive accessibility labels, live reduced-motion support, and touch interaction.

This is an intentional adaptation: polished editorial structure rather than raw brutalism, charcoal/paper/lime instead of the suggested blue palette, and smooth contextual motion rather than instant transitions. The user's expressive motion request guides this choice.

## Tokens

- Ink: `#11120f`
- Paper: `#f2f2e9`
- Accent: `#d5ff5f`
- Display: self-hosted Space Grotesk
- Body: self-hosted Inter
- Expressive contrast: system Georgia italic
- Gutters: 25px on mobile, 5vw on desktop
- Motion: 150–400ms for feedback; 850–1600ms for entrances

## Interaction standards

Motion remains optional and reacts to the operating system preference. The pause control is persistent. Scrolling is native. Content is rendered as HTML before enhancement. Dialogs provide a native focus trap and Escape dismissal. The sculpture supports arrow keys, Home reset, horizontal touch dragging, and button-based material changes. Its render loop stops offscreen, when the document is hidden, and while paused. WebGL failure leaves an intentional static visual and readable content.

## Content integrity

Use actual project screens and existing repository facts. Do not invent testimonials, company experience, project outcomes, or metrics. The latest CV supplied by Mohammed is available unchanged. Professional experience, certifications, education, and contact information follow that document.
