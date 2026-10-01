import { ClassicPortfolio } from "@/components/classic-portfolio";
import { PortfolioShell } from "@/components/portfolio-shell";
import { profile } from "@/content/portfolio";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: profile.website,
    sameAs: [profile.github, profile.linkedin],
    email: profile.email,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Mianwali",
    },
    knowsAbout: [
      "React Native",
      "TypeScript",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Full-stack Development",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioShell>
        <ClassicPortfolio />
      </PortfolioShell>
    </>
  );
}
