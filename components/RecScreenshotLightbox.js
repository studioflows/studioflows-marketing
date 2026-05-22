"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export default function RecScreenshotLightbox({ open, imageSrc, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={alt ? `Expanded view: ${alt}` : "Expanded screenshot"}
      className="fixed inset-0 z-[200] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/85 open:backdrop:bg-black/85"
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex w-full max-w-6xl items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">{alt}</p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>
            <img
              src={imageSrc}
              alt={alt}
              className="max-h-[82vh] w-full max-w-6xl rounded-xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}

export function RecScreenshotExpandHint() {
  return (
    <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
      <ZoomIn className="h-3.5 w-3.5" aria-hidden />
      Click to expand
    </span>
  );
}
