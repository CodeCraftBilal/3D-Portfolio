"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Box,
  HelpCircle,
  House,
  LayoutList,
  Mail,
  MapPin,
  Moon,
  MousePointer2,
  MoveUpRight,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";
import { Github, Linkedin } from "./ui/brand-icons";
import { profile } from "@/content/portfolio";
import { sections } from "@/lib/room-config";
import { useRoomStore } from "@/store/room-store";
import { SectionIcon } from "./ui/section-icon";
import { SectionPanel } from "./ui/section-panel";

const RoomCanvas = dynamic(() => import("./room/room-canvas"), {
  ssr: false,
  loading: () => (
    <div className="room-loading" role="status">
      <span className="loading-symbol">
        bk<span>.</span>
      </span>
      <p>Opening the door…</p>
      <div className="loading-track loading-indeterminate">
        <span />
      </div>
    </div>
  ),
});

function LocalTime() {
  const [time, setTime] = useState("PKT · UTC +05:00");
  useEffect(() => {
    const update = () =>
      setTime(
        `${new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())} PKT`,
      );
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="local-time">{time}</span>;
}

function HelpDialog({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog
      className="help-dialog"
      ref={dialogRef}
      aria-labelledby="help-title"
    >
      <div className="help-top">
        <span className="eyebrow">MAKE YOURSELF AT HOME</span>
        <button
          className="icon-link"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close room guide"
        >
          <X size={20} />
        </button>
      </div>
      <h2 id="help-title">A room worth exploring.</h2>
      <p>
        Every object is a little piece of my story. Select one to take a closer
        look.
      </p>
      <div className="help-grid">
        {sections.map((section, i) => (
          <div key={section.id}>
            <SectionIcon section={section.id} size={20} />
            <span>
              <strong>{section.object}</strong>
              <span>{section.label}</span>
            </span>
            <kbd>{i + 1}</kbd>
          </div>
        ))}
      </div>
      <div className="help-controls">
        <p>
          <MousePointer2 size={15} /> Drag to look around · Tap or click to
          explore
        </p>
        <p>
          <kbd>esc</kbd> Return to the room <kbd>0</kbd> Reset the view
        </p>
      </div>
      <button
        className="primary-button full-width"
        onClick={() => dialogRef.current?.close()}
      >
        Let’s explore <ArrowRight size={16} />
      </button>
    </dialog>
  );
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const section = useRoomStore((s) => s.section);
  const mode = useRoomStore((s) => s.mode);
  const theme = useRoomStore((s) => s.theme);
  const open = useRoomStore((s) => s.open);
  const reset = useRoomStore((s) => s.reset);
  const setMode = useRoomStore((s) => s.setMode);
  const toggleTheme = useRoomStore((s) => s.toggleTheme);
  const setReducedMotion = useRoomStore((s) => s.setReducedMotion);
  const helpDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [setReducedMotion]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.target instanceof HTMLElement &&
          (event.target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))) ||
        document.querySelector("dialog[open]")
      )
        return;
      if (event.key === "0" || event.key === "Escape") reset();
      const index = Number(event.key) - 1;
      if (index >= 0 && index < sections.length) open(sections[index].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, reset]);

  function goHome() {
    reset();
    setMode("room");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function switchView() {
    setMode(mode === "room" ? "list" : "room");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div
      className={`portfolio-app ${section ? "is-inspecting" : ""} view-${mode}`}
      data-theme={theme}
    >
      <a
        className="skip-link"
        href={mode === "room" ? "#room-navigation" : "#classic-portfolio"}
      >
        Skip to portfolio navigation
      </a>
      <header className="site-header">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
          aria-label="Bilal Khan — home"
        >
          <span className="brand-mark">
            bk<span>.</span>
          </span>
          <span className="brand-description">
            BILAL KHAN<span>Developer & creative thinker</span>
          </span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <button onClick={() => open("about")}>About me</button>
          <button onClick={() => open("projects")}>
            Selected work <span>03</span>
          </button>
          <button onClick={() => open("contact")}>
            Let’s talk <ArrowUpRight size={14} />
          </button>
        </nav>
        <a
          className="header-resume"
          href={profile.resume}
          download
          aria-label="Download Bilal’s résumé"
        >
          <ArrowDownToLine size={15} />
          <span>Résumé</span>
        </a>
      </header>
      <main id="main-content">
        <div className="room-layout" hidden={mode !== "room"}>
          <div className="hero-copy">
            <div className="hello-line">
              <span className="small-line" /> HELLO, WORLD. I’M BILAL.
            </div>
            <h1>
              A little space.
              <br />A lot of{" "}
              <span className="ideas-word">
                ideas
                <svg viewBox="0 0 180 12" aria-hidden="true">
                  <path d="M3 8C47 1 126 1 176 6" />
                </svg>
              </span>
              <span className="accent-period">.</span>
            </h1>
            <p className="hero-role">
              Developer by craft.
              <br /> Curious by nature.
            </p>
            <p className="hero-description">{profile.intro}</p>
            <button
              className="primary-button explore-button"
              onClick={() => open("projects")}
            >
              Explore my work <ArrowUpRight size={18} />
            </button>
            <div className="hero-socials">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email Bilal">
                <Mail size={18} />
              </a>
              <span className="social-divider" />
              <span>LET’S CONNECT</span>
            </div>
          </div>
          <div className="room-stage">
            <div className="room-stage-top">
              <span>
                <span className="status-dot" /> A SMALL CORNER OF MY WORLD
              </span>
              <span className="room-number">ROOM 01 / 01</span>
            </div>
            {mode === "room" && <RoomCanvas />}
            <div className="room-annotation">
              <span className="annotation-arrow" aria-hidden="true">
                ⤴
              </span>
              <span>Go on, click something.</span>
            </div>
          </div>
          <div className="scene-controls">
            <button
              className="scene-control"
              onClick={toggleTheme}
              aria-label={
                theme === "day"
                  ? "Switch to evening lighting"
                  : "Switch to daylight"
              }
              title={theme === "day" ? "Evening lighting" : "Daylight"}
            >
              {theme === "day" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <span />
            <button
              className="scene-control"
              onClick={reset}
              aria-label="Reset room view"
              title="Reset view (0)"
            >
              <RotateCcw size={17} />
            </button>
            <span />
            <button
              className="scene-control"
              onClick={() => helpDialog.current?.showModal()}
              aria-label="How to explore the room"
              title="Room guide"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <div className="room-bottom-note">
            <MousePointer2 size={14} />
            <span>
              Drag to look around<span className="hint-divider">·</span>Click an
              object to discover
            </span>
          </div>
        </div>
        <div
          className="classic-view"
          style={{ display: mode === "list" ? "block" : "none" }}
        >
          {children}
        </div>
      </main>
      <div className="room-navigation-wrap" hidden={mode !== "room"}>
        <div className="navigation-intro">
          <span className="eyebrow">A WORKSPACE, A STORY.</span>
          <span>
            Pick a place to start <MoveUpRight size={14} />
          </span>
        </div>
        <nav
          className="room-navigation"
          id="room-navigation"
          aria-label="Explore the room"
        >
          <button
            className={`nav-object nav-home ${!section ? "active" : ""}`}
            onClick={reset}
            aria-label="Room overview"
            aria-current={!section ? "page" : undefined}
          >
            <House size={19} />
            <span>Room</span>
          </button>
          <span className="nav-separator" />
          {sections.map((item, i) => (
            <button
              key={item.id}
              className={`nav-object ${section === item.id ? "active" : ""}`}
              onClick={() => open(item.id)}
              aria-label={`Open ${item.label}`}
              aria-keyshortcuts={String(i + 1)}
              aria-current={section === item.id ? "page" : undefined}
            >
              <SectionIcon section={item.id} size={19} />
              <span>{item.label}</span>
              <span className="nav-key">{i + 1}</span>
            </button>
          ))}
        </nav>
        <div className="navigation-end">
          <span className="tiny-orbit" aria-hidden="true">
            <span />
          </span>
          <span>MADE TO BE EXPLORED</span>
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-location">
          <MapPin size={13} />
          <span>{profile.location}</span>
          <span className="footer-dot">·</span>
          <LocalTime />
        </div>
        <span className="footer-signoff">
          Built with intention. A little coffee, too.
        </span>
        <button className="view-toggle" onClick={switchView}>
          {mode === "room" ? <LayoutList size={14} /> : <Box size={15} />}
          <span>
            {mode === "room" ? "Prefer a classic view?" : "Back to the 3D room"}
          </span>
          <ArrowUpRight size={13} />
        </button>
      </footer>
      <SectionPanel />
      <HelpDialog dialogRef={helpDialog} />
      <noscript>
        <style>{`.room-layout,.room-navigation-wrap,.header-nav,.view-toggle,.contact-form{display:none!important}.classic-view{display:block!important}.portfolio-app{min-height:100vh}.site-footer{position:static}`}</style>
        <p className="noscript-note">
          You’re viewing the accessible HTML portfolio. Enable JavaScript to
          explore the 3D room.
        </p>
      </noscript>
    </div>
  );
}
