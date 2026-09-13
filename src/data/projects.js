/** Selected work approved by Mohammed. Public summaries only; source repositories stay private. */
export const projects = [
  {
    id: "wheelchair",
    title: "Efad Wheelchair System",
    category: "system",
    type: "CUSTOM SYSTEM",
    subtitle: "A connected rental platform for Al-Haram.",
    label: "EFAD GO / CONNECTED MOBILITY",
    description:
      "A wheelchair rental and operations platform designed for Al-Haram in Makkah. It connects a Flutter customer app, a Next.js administrative dashboard, and a NestJS backend with IoT fleet telemetry. The experience covers discovery and reservations, rental trips, wallets and payments, and the operational workflows behind the fleet.",
    tags: ["Next.js", "Flutter", "NestJS", "IoT / MQTT"],
    focus: [
      "Customer discovery, reservations, and rental trips",
      "Live fleet tracking and connected wheelchair telemetry",
      "Operations dashboard, wallets, and payments",
    ],
    images: [],
  },
  {
    id: "efadgrp",
    title: "EFADgrp Website",
    category: "website",
    type: "CORPORATE WEBSITE",
    subtitle: "One group. A world of capabilities.",
    label: "EFAD / INTERNATIONAL GROUP",
    description:
      "A bilingual corporate website for EFAD International Group. The experience brings the group’s companies, strategic sectors, capabilities, and contact journeys together in one coherent digital presence, with dedicated Arabic and English pages.",
    tags: ["Corporate website", "Arabic & English", "Responsive design"],
    focus: [
      "A unified presence across business sectors",
      "Arabic and English content",
      "Company discovery and contact journeys",
    ],
    images: [
      {
        file: "efadgrp.webp",
        alt: "Live EFAD International Group website, Arabic homepage",
      },
    ],
    url: "https://efadgrp.com/ar",
  },
  {
    id: "mercato",
    title: "Mercato Maintenance Website",
    category: "website",
    type: "SERVICE WEBSITE",
    subtitle: "A clear digital presence for essential services.",
    label: "MERCATO / OPERATIONS & MAINTENANCE",
    description:
      "An Arabic website for Mercato’s operations and maintenance business. Built with Next.js, it presents the company, its services, and its contact channels through a responsive experience designed for right-to-left reading.",
    tags: ["Next.js", "Arabic / RTL", "Responsive web"],
    focus: [
      "Service discovery",
      "Arabic-first interface",
      "Company and contact pages",
    ],
    images: [
      {
        file: "mercato.webp",
        alt: "Live Mercato Maintenance website, Arabic homepage",
      },
    ],
    url: "https://maintenance.mercato.sa/",
  },
  {
    id: "sachat",
    title: "SaChat",
    category: "application",
    type: "MESSAGING PLATFORM",
    subtitle: "Conversations, connected in real time.",
    label: "SACHAT / MESSAGING",
    description:
      "A messaging platform built with a Flutter client and a NestJS backend. SaChat brings together direct and group conversations, presence, typing indicators, media, and calling features, with a focus on a self-hosted architecture for the Saudi market.",
    tags: ["Flutter", "NestJS", "Real-time messaging"],
    focus: [
      "Direct and group conversations",
      "Presence and typing indicators",
      "Mobile client and backend engineering",
    ],
    images: [],
  },
  {
    id: "rasmi",
    title: "Rasmi Rewards",
    category: "system",
    type: "SAAS PLATFORM",
    subtitle: "From a first scan to a reason to return.",
    label: "RASMI / REWARDS PLATFORM",
    description:
      "A rewards platform that connects a customer’s QR scan with discovery, a digital wallet, and in-store redemption. Brands can manage campaigns, branches, staff, and rewards from a central console, while customers get an experience shaped around each brand.",
    tags: ["Next.js", "NestJS", "Multi-tenant SaaS", "Customer PWA"],
    focus: [
      "QR-to-reward customer journey",
      "Campaign and branch management",
      "Digital wallets and cashier redemption",
    ],
    images: [
      {
        file: "rasmi.webp",
        alt: "Live Rasmi Rewards Arabic website with a rewards wheel and customer journey",
      },
    ],
    url: "https://rewards.rasmi.sa/",
  },
];
