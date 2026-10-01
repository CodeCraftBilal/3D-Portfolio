import type { Project } from "@/lib/types";

// Content is transcribed or summarized from public/resume/M-Bilal-Khan-Resume.pdf.
// Add screenshots and live URLs here when available; no room code needs to change.
export const profile = {
  name: "M. Bilal Khan",
  shortName: "Bilal",
  initials: "BK",
  role: "Full Stack Developer",
  location: "Mianwali, Pakistan",
  timezone: "Asia/Karachi",
  email: "bilalkhan751150@gmail.com",
  phone: "+923287925879",
  github: "https://github.com/CodeCraftBilal",
  linkedin: "https://www.linkedin.com/in/bilalkhan75/",
  resume: "/resume/M-Bilal-Khan-Resume.pdf",
  website: "https://bilalkhan.online",
  educationStatus: "Computer Science student",
  cgpa: "3.31",
  cgpaScale: "4.0",
  intro:
    "I build thoughtful web and mobile experiences. Come on in, explore my workspace, and get to know the developer behind the screen.",
  bio: "I’m Bilal, a Full Stack Developer and BS Computer Science student based in Pakistan. I build responsive, secure, and scalable web applications with React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL, and MongoDB.",
  approach:
    "From user interfaces to backend architecture, I enjoy solving problems independently and delivering complete products. My work brings together REST APIs, real-time features, database design, testing, performance optimization, cloud deployment, Docker, and CI/CD workflows.",
  current:
    "I’m developing EcoStudent, a capstone marketplace with AI recommendations, real-time messaging, and PostgreSQL, as part of a three-member team at the University of Mianwali.",
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
    image: "/projects/EcoStudent.jpg",
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
    image: "/projects/SecureShare.jpg",
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
      "Scalable database models and APIs for users, workspaces, projects, roles, permissions, and tasks.",
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
    image: "/projects/NexaPlan.jpg",
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
      "HTML",
      "CSS",
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
      "Python",
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
      "Docker",
      "CI/CD Pipelines",
      "VS Code",
      "Testing",
      "Performance Optimization",
      "Cloud Deployment",
    ],
  },
];

export const experience = [
  {
    role: "Full Stack React Native App Developer",
    company: "Viberay Tech",
    period: "Jul — Sep 2026",
    location: "Bahria Town, Rawalpindi, Pakistan",
    details: [
      "Developed and maintained responsive, user-friendly applications using React Native, React, TypeScript, and Node.js.",
      "Built and integrated RESTful APIs, server-side logic, and database-backed application features.",
      "Collaborated with designers and developers to translate product requirements into maintainable features.",
      "Debugged, tested, documented, and optimized applications across development and deployment workflows.",
    ],
  },
];

export const education = [
  {
    institution: "University of Mianwali",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    period: "2022 — 2026",
    detail:
      "In progress · Current CGPA 3.31 / 4.0 · EcoStudent capstone in a three-member team",
  },
  {
    institution: "Superior Group of College",
    degree: "FSc Pre-Engineering",
    period: "2020 — 2022",
    detail: "Mianwali · Top 10% in a cohort of 200 students",
  },
];

export const achievements = [
  "Achieved a top 10% ranking in a cohort of 200 students at Superior Group of College.",
  "Completed advanced coursework in calculus and physics with distinction.",
  "Participated in national science fairs, showcasing innovative engineering designs.",
];
