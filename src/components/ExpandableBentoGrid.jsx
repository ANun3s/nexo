import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import "./ExpandableBentoGrid.css";

export default function ExpandableBentoGrid({ items, onAction }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
        requestAnimationFrame(() => previousFocusRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const openItem = (item, event) => {
    previousFocusRef.current = event.currentTarget;
    setActive(item);
  };

  const close = () => {
    setActive(null);
    requestAnimationFrame(() => previousFocusRef.current?.focus());
  };

  return (
    <>
      <div className="story-highlights">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            layout
            layoutId={`story-card-${item.id}-${id}`}
            className={`story-card story-expandable-card ${item.className || ""}`.trim()}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={active?.id === item.id}
            aria-labelledby={`story-card-title-${item.id}-${id}`}
            onClick={(event) => openItem(item, event)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openItem(item, event);
              }
            }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.985 }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
              delay: index * 0.08,
            }}
          >
            <motion.span layoutId={`story-card-icon-${item.id}-${id}`} className="story-card-icon">
              {item.icon}
            </motion.span>
            <small>{item.subtitle}</small>
            <motion.h3 id={`story-card-title-${item.id}-${id}`} layoutId={`story-card-heading-${item.id}-${id}`}>
              {item.title}
            </motion.h3>
            <div className="story-expandable-preview">{item.preview}</div>
            <span className="story-expand-cue" aria-hidden="true">
              Ver detalhes <ArrowUpRight size={15} />
            </span>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="story-expand-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="story-expand-positioner" onClick={close}>
            <motion.div
              ref={dialogRef}
              layout
              layoutId={`story-card-${active.id}-${id}`}
              className={`story-expand-dialog ${active.className || ""}`.trim()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`story-dialog-title-${active.id}-${id}`}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ type: "spring", stiffness: 230, damping: 27 }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div layoutId={`story-card-icon-${active.id}-${id}`} className="story-expand-visual">
                {active.icon}
              </motion.div>
              <button className="story-expand-close" type="button" aria-label="Fechar detalhes" onClick={close}>
                <X size={18} />
              </button>

              <div className="story-expand-copy">
                <small>{active.subtitle}</small>
                <motion.h3 id={`story-dialog-title-${active.id}-${id}`} layoutId={`story-card-heading-${active.id}-${id}`}>
                  {active.title}
                </motion.h3>
                <p>{active.description}</p>
              </div>

              <div className="story-expand-content" tabIndex={0} aria-label={`Mais sobre ${active.subtitle}`}>
                {active.content}
              </div>

              {onAction && (
                <button
                  className="story-expand-action"
                  type="button"
                  onClick={() => {
                    const selected = active;
                    close();
                    onAction(selected);
                  }}
                >
                  Conversar com a Nexo <ArrowUpRight size={16} />
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
