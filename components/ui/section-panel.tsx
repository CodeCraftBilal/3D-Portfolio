"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { sections } from "@/lib/room-config";
import { useRoomStore } from "@/store/room-store";
import { SectionContent } from "./section-content";
import { SectionIcon } from "./section-icon";

const titles = {
  about: "A little about me.",
  projects: "Built with intention.",
  skills: "My everyday toolkit.",
  journey: "The journey so far.",
  resume: "My story, on paper.",
  contact: "Let’s build something.",
};

export function SectionPanel() {
  const section = useRoomStore((s) => s.section);
  const close = useRoomStore((s) => s.close);
  const open = useRoomStore((s) => s.open);
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const index = sections.findIndex((item) => item.id === section);

  useEffect(() => {
    if (section && dialog.current && !dialog.current.open) {
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.current.showModal();
    } else if (!section && dialog.current?.open) {
      dialog.current.close();
      returnFocus.current?.focus();
    }
    scroller.current?.scrollTo({ top: 0 });
  }, [section]);

  useEffect(() => {
    if (!section) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [section]);

  return (
    <dialog
      ref={dialog}
      className="section-panel"
      aria-labelledby="panel-title"
      aria-describedby="panel-description"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }
      }}
    >
      {section && (
        <>
          <div className="panel-topbar">
            <button onClick={close} className="back-button">
              <ArrowLeft size={15} /> Back to the room
            </button>
            <button
              onClick={close}
              className="close-button"
              aria-label="Close section"
            >
              <X size={19} />
              <kbd>esc</kbd>
            </button>
          </div>
          <div
            className="panel-scroll"
            ref={scroller}
            tabIndex={0}
            role="region"
            aria-label={`${sections[index].label} content`}
          >
            <div className="panel-heading">
              <span className="panel-section-label">
                <SectionIcon section={section} size={15} />{" "}
                {sections[index].label} <span>0{index + 1}</span>
              </span>
              <h2 id="panel-title">{titles[section]}</h2>
              <p id="panel-description" className="sr-only">
                {sections[index].description}
              </p>
            </div>
            <SectionContent key={section} section={section} />
          </div>
          <div className="panel-footer">
            <span>Make yourself at home.</span>
            <button
              onClick={() => open(sections[(index + 1) % sections.length].id)}
            >
              Next: {sections[(index + 1) % sections.length].label}
              <ArrowRight size={15} />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
