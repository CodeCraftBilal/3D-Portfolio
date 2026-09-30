import {
  BookOpen,
  Check,
  File,
  FolderLock,
  Leaf,
  LockKeyhole,
  Plus,
  Sparkles,
} from "lucide-react";

// Small original editorial illustrations, not screenshots of the projects.
export function ProjectArt({ id }: { id: string }) {
  return (
    <div className={`project-art art-${id}`} aria-hidden="true">
      <div className="art-window">
        <div className="art-window-bar">
          <i />
          <i />
          <i />
          <span>
            {id === "ecostudent"
              ? "a little less waste. a lot more possibility."
              : id === "secureshare"
                ? "a private place for your files."
                : "make space for your best work."}
          </span>
        </div>
        {id === "ecostudent" ? (
          <div className="eco-art-content">
            <div className="art-wordmark">
              <Leaf size={14} /> EcoStudent
            </div>
            <div className="art-greeting">
              Good things.
              <br />
              New beginnings.
            </div>
            <div className="art-products">
              <div>
                <BookOpen />
                <span>Read it. Pass it on.</span>
              </div>
              <div>
                <span className="art-pencil">✎</span>
                <span>Made for learning.</span>
              </div>
              <div>
                <Leaf />
                <span>A greener campus.</span>
              </div>
            </div>
          </div>
        ) : id === "secureshare" ? (
          <div className="secure-art-content">
            <div className="art-lock">
              <FolderLock size={38} strokeWidth={1.4} />
            </div>
            <strong>Keep it yours.</strong>
            <div className="art-file">
              <File size={15} />
              <span>something-important.pdf</span>
              <LockKeyhole size={12} />
            </div>
            <span className="art-encrypted">
              <span /> End-to-end encrypted
            </span>
          </div>
        ) : (
          <div className="nexa-art-content">
            <div className="art-wordmark">
              <Sparkles size={13} /> NexaPlan <Plus size={12} />
            </div>
            <div className="art-board">
              {["To do", "In progress", "Done"].map((label, i) => (
                <div key={label}>
                  <span>
                    {label} <i>{i === 2 ? "3" : "2"}</i>
                  </span>
                  {[0, 1].map((card) => (
                    <div className="art-task" key={card}>
                      <div className={`art-task-tag tag-${i}`} />
                      <span />
                      <span />
                      {i === 2 ? (
                        <Check size={10} />
                      ) : (
                        <div className="art-avatar" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="art-caption">PROJECT CONCEPT</span>
    </div>
  );
}
