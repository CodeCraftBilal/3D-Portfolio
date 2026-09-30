import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin } from "./ui/brand-icons";
import { profile } from "@/content/portfolio";
import { sections } from "@/lib/room-config";
import { SectionContent } from "./ui/section-content";

export function ClassicPortfolio() {
  return (
    <div className="classic-portfolio" id="classic-portfolio">
      <div className="classic-intro">
        <span className="eyebrow">THE PERSON BEHIND THE SCREEN</span>
        <h1>
          Hi, I’m Bilal<span>.</span>
          <br />I turn ideas into experiences.
        </h1>
        <p>{profile.intro}</p>
        <div className="classic-intro-links">
          <a className="primary-button" href="#classic-projects">
            Explore my work <ArrowUpRight size={17} />
          </a>
          <a className="secondary-button" href={profile.resume} download>
            <ArrowDownToLine size={16} /> Résumé
          </a>
        </div>
      </div>
      <nav className="classic-nav" aria-label="Portfolio sections">
        {sections.map((item) => (
          <a href={`#classic-${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
      </nav>
      {sections.map((section, index) => (
        <section
          className={`classic-section classic-section-${section.id}`}
          id={`classic-${section.id}`}
          key={section.id}
        >
          <div className="classic-section-heading">
            <span className="eyebrow">
              0{index + 1} / {section.object}
            </span>
            <h2>
              {section.label}
              <span>.</span>
            </h2>
            <p>{section.description}</p>
          </div>
          <div className="classic-section-body">
            <SectionContent section={section.id} />
          </div>
        </section>
      ))}
      <div className="classic-ending">
        <h2>
          Good things start
          <br />
          with a conversation<span>.</span>
        </h2>
        <a href={`mailto:${profile.email}`}>
          Let’s talk <ArrowUpRight size={28} />
        </a>
        <div className="text-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={17} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={17} /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
