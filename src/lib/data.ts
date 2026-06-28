import {
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Mohammed Rayees",
  role: "AI Data Engineer",
  roles: [
    "AI Data Engineer",
    "AI Engineer",
    "LLM Engineer",
    "Data Analytics Engineer",
  ],
  email: "krmdrayees25@gmail.com",
  github: "https://github.com/MohammedRayees25",
  linkedin: "https://www.linkedin.com/in/mohammedrayees",
  subtitle:
    "Building intelligent data platforms, AI systems, LLM applications, and next-generation automation experiences.",
};

export type Stat = {
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: "2+", label: "Years Experience" },
  { value: "08+", label: "Projects" },
  { value: "10M+", label: "Records Processed" },
  { value: "15+", label: "Technologies" },
];

export const ABOUT = [
  "I'm Mohammed Rayees, an AI Data Engineer with over 2 years of experience building scalable data platforms, AI-powered applications, cloud-native architectures, analytics systems, and intelligent automation workflows.",
  "I have worked professionally at HCL Technologies while also delivering freelance AI and data engineering projects. My expertise spans data engineering, cloud computing, GenAI, large language models, analytics engineering, and software development.",
  "I enjoy building systems where data engineering meets artificial intelligence, automation, and modern cloud architecture.",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    company: "HCL Technologies",
    role: "AI Data Engineer",
    period: "2023 — Present",
    points: [
      "Developed enterprise-grade ETL pipelines",
      "Built scalable data platforms",
      "Worked extensively on PySpark",
      "Developed Spark SQL transformations",
      "Built Databricks workflows",
      "Created Azure cloud data solutions",
      "Designed analytics dashboards",
      "Automated business workflows",
      "Implemented data quality frameworks",
      "Built modern AI-powered data solutions",
    ],
  },
  {
    company: "Freelance AI Data Engineer",
    role: "Independent Consultant",
    period: "2024 — Present",
    points: [
      "Developed AI applications",
      "Built cloud-native architectures",
      "Designed ETL/ELT pipelines",
      "Built LLM-powered solutions",
      "Created business analytics dashboards",
      "Developed automation systems",
    ],
  },
  {
    company: "Independent Builder",
    role: "Creator & Engineer",
    period: "Ongoing",
    points: [
      "AI Agents",
      "Agentic AI",
      "LLM Applications",
      "GenAI Systems",
      "SaaS Development",
      "Workflow Automation",
      "Vibe Coding",
    ],
  },
];

export type SkillGroup = {
  category: string;
  accent: "primary" | "accent";
  skills: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Backend",
    accent: "primary",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "REST APIs",
      "GraphQL",
      "Async Python",
      "SQLAlchemy",
      "Pydantic",
    ],
  },
  {
    category: "Data Engineering",
    accent: "accent",
    skills: [
      "SQL",
      "Advanced SQL",
      "PySpark",
      "Apache Spark",
      "Spark SQL",
      "Databricks",
      "Delta Lake",
      "Apache Airflow",
      "dbt",
      "ETL",
      "ELT",
      "Data Warehousing",
      "Data Modeling",
      "Data Lakes",
      "Medallion Architecture",
      "Batch Processing",
      "Stream Processing",
    ],
  },
  {
    category: "Cloud — Azure",
    accent: "accent",
    skills: [
      "Azure Data Factory",
      "Azure Databricks",
      "Azure Synapse",
      "Azure Blob Storage",
      "Azure Data Lake",
      "Azure Functions",
    ],
  },
  {
    category: "Cloud — AWS",
    accent: "accent",
    skills: ["AWS S3", "EC2", "AWS Glue", "Redshift", "Lambda", "CloudWatch"],
  },
  {
    category: "Analytics",
    accent: "primary",
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "Dashboarding",
      "Business Intelligence",
      "KPI Analytics",
      "Data Visualization",
    ],
  },
  {
    category: "AI Engineering",
    accent: "primary",
    skills: [
      "OpenAI API",
      "Anthropic API",
      "Gemini API",
      "Ollama",
      "OpenRouter",
      "HuggingFace",
      "Prompt Engineering",
      "AI Agents",
      "Agentic AI",
      "Multi-Agent Systems",
      "AI Workflow Automation",
    ],
  },
  {
    category: "Machine Learning",
    accent: "accent",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Statistical Analysis",
      "Feature Engineering",
      "Predictive Analytics",
    ],
  },
  {
    category: "DevOps",
    accent: "primary",
    skills: [
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "APIs",
      "Microservices",
    ],
  },
  {
    category: "Automation",
    accent: "accent",
    skills: [
      "Playwright",
      "Selenium",
      "Browser Automation",
      "Workflow Automation",
      "Web Scraping",
      "AI Automation",
    ],
  },
];

export type Project = {
  title: string;
  tag: string;
  description: string;
  features: string[];
  tech: string[];
  repo?: string;
  highlight: string;
};

export const PROJECTS: Project[] = [
  {
    title: "LinkedIn Outreach Automation",
    tag: "Automation · LLM",
    description:
      "Production-ready LinkedIn outreach automation using Playwright, Google Sheets, SQLite, and multiple LLM providers including OpenAI, Anthropic, OpenRouter, and Ollama.",
    features: [
      "AI personalization",
      "AI comments",
      "AI connection requests",
      "Follow-up scheduling",
      "Browser automation",
      "LLM orchestration",
    ],
    tech: [
      "Python",
      "Playwright",
      "SQLite",
      "OpenAI",
      "Anthropic",
      "Ollama",
      "Automation",
    ],
    repo: "https://github.com/MohammedRayees25/linkedin-outreach-automation",
    highlight: "01",
  },
  {
    title: "AI Data Platform",
    tag: "Data Engineering",
    description:
      "End-to-end lakehouse platform unifying ingestion, transformation, and AI serving across a medallion architecture.",
    features: [
      "Data Lake",
      "Data Warehouse",
      "Databricks",
      "Airflow",
      "PySpark",
      "AI Models",
    ],
    tech: ["Databricks", "PySpark", "Delta Lake", "Airflow", "Azure"],
    highlight: "02",
  },
  {
    title: "LLM Workflow Automation",
    tag: "GenAI · Agents",
    description:
      "Agentic AI architecture orchestrating multi-step LLM workflows, tool calling, and autonomous task execution.",
    features: [
      "Multi-agent orchestration",
      "Tool calling",
      "RAG pipelines",
      "Autonomous workflows",
      "Provider routing",
      "Observability",
    ],
    tech: ["Anthropic", "OpenAI", "LangGraph", "FastAPI", "Vector DB"],
    highlight: "03",
  },
  {
    title: "Analytics Dashboard Platform",
    tag: "Analytics · BI",
    description:
      "Power BI-inspired analytics suite delivering real-time KPIs, executive dashboards, and self-service insights.",
    features: [
      "Real-time KPIs",
      "Executive dashboards",
      "DAX modeling",
      "Drill-down analytics",
      "Data storytelling",
      "Automated refresh",
    ],
    tech: ["Power BI", "DAX", "Power Query", "SQL", "Azure Synapse"],
    highlight: "04",
  },
];

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    value: "MohammedRayees25",
    href: SITE.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "in/mohammedrayees",
    href: SITE.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
