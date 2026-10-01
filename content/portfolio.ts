import type { Project } from "@/lib/types";

// All personal content is transcribed or summarized from assets/M. Bilal_Khan_Resume.pdf.
// Add screenshots and live URLs here when available; no room code needs to change.
export const profile = {
  name: "M. Bilal Khan",
  shortName: "Bilal",
  initials: "BK",
  role: "React Native & Full-stack Developer",
  location: "Mianwali, Pakistan",
  timezone: "Asia/Karachi",
  email: "bilalkhan751150@gmail.com",
  phone: "+923287925879",
  github: "https://github.com/CodeCraftBilal",
  linkedin: "https://www.linkedin.com/in/bilalkhan75/",
  resume: "/resume/M-Bilal-Khan-Resume.pdf",
  intro:
    "I build thoughtful web and mobile experiences. Come on in, explore my workspace, and get to know the developer behind the screen.",
  bio: "I’m Bilal, a Computer Science graduate and developer based in Pakistan. I work across React Native, TypeScript, and native Android with Kotlin, bringing ideas to life through reliable, easy-to-use applications.",
  approach:
    "From real-time marketplaces to encrypted file sharing, I enjoy connecting a considered interface with a solid backend. My work brings together REST APIs, authentication, database design, and the small details that make an application feel right.",
  current:
    "At Viberacy Tech, I’m building an Android document-reader app, working on reusable screens, local file handling, and native document-to-PDF integration.",
};

export const projects: Project[] = [
  {
    id: "ecostudent",
    title: "EcoStudent",
    category: "Marketplace · Full-stack",
    description:
      "A second life for learning essentials. A student marketplace to buy, sell, exchange, and donate educational items.",
    details: [
      "Authentication, product listings, favorites, orders, reviews, and notifications.",
      "Real-time messaging with Socket.IO and AI-powered product recommendations.",
      "Image-based product discovery and PostgreSQL/Prisma data models for marketplace workflows.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Socket.IO",
      "AI/ML",
    ],
    color: "sage",
    image: "/projects/EcoStudent.jfif",
    sourceUrl: "https://github.com/CodeCraftBilal/EcoStudent",
  },
  {
    id: "secureshare",
    title: "SecureShare",
    category: "Security · Web application",
    description:
      "Your files, your keys. A privacy-focused cloud storage and sharing platform with client-side end-to-end encryption.",
    details: [
      "AES-GCM file encryption and RSA-OAEP key protection using the Web Crypto API.",
      "Designed so plaintext files and encryption keys remain inaccessible to the storage provider.",
      "Secure upload, download, encrypted sharing, access control, and responsive file management.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "AES-GCM",
      "RSA-OAEP",
      "Web Crypto API",
      "Cloud Storage",
    ],
    color: "blue",
    image: "/projects/SecureShare.jfif",
    sourceUrl: "https://github.com/CodeCraftBilal/info-security-project",
  },
  {
    id: "nexaplan",
    title: "NexaPlan",
    category: "Productivity · AI workspace",
    description:
      "Less organizing. More creating. An intelligent workspace for projects, teams, tasks, and everyday collaboration.",
    details: [
      "Role-based access for workspace owners, managers, members, viewers, and administrators.",
      "Task assignment, priorities, deadlines, comments, activity tracking, and project dashboards.",
      "AI-assisted planning, task generation, workload organization, and project summaries.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "AI / LLM APIs",
    ],
    color: "peach",
    image: "/projects/NexaPlan.jfif",
    sourceUrl: "https://github.com/CodeCraftBilal/NexaPlan",
  },
];

export const skillGroups = [
  {
    title: "Interfaces & mobile",
    note: "Where ideas become experiences",
    skills: [
      "React Native",
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript / ES6+",
      "Tailwind CSS",
      "Kotlin",
      "React Navigation",
      "React Context",
    ],
  },
  {
    title: "Backend & data",
    note: "The foundations behind the screen",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "REST APIs",
      "Socket.IO",
      "Authentication & Authorization",
    ],
  },
  {
    title: "Tools & workflow",
    note: "How the work comes together",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Cloudinary",
      "Vercel",
      "API Development",
      "Database Design",
      "Debugging",
    ],
  },
];

export const experience = [
  {
    role: "React Native Developer",
    company: "Viberacy Tech",
    period: "Jul 2026 — Present",
    location: "Bahria Town, Rawalpindi, Pakistan",
    details: [
      "Developing React Native screens and reusable components for an Android document-reader app.",
      "Working on native Kotlin document-to-PDF integration, PDF layout, and Android build-size analysis.",
      "Implementing navigation, themes, and file actions, and debugging permissions and modal interactions.",
      "Building RESTful APIs and collaborating through Git branches, code integration, and issue resolution.",
    ],
  },
];

export const education = [
  {
    institution: "University of Mianwali",
    degree: "BS Computer Science",
    period: "2022 — 2026",
    detail: "Graduated with Honors · GPA 3.31 / 4.0",
  },
  {
    institution: "Superior Group of Colleges",
    degree: "FSc Pre-Engineering",
    period: "2020 — Jan 2022",
    detail: "Mianwali · Top 10% in a cohort of 200 students",
  },
];

export const achievements = [
  "Top 10 finish in national coding competitions.",
  "Led a mobile app team, improving user engagement by 30%.",
  "Completed an AI algorithms capstone project, earning top accolades.",
];
