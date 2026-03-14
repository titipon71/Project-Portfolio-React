import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasNav?: boolean;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.15;

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  onPrev,
  onNext,
  hasNav = false,
}: ImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    lastOffset.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    resetZoom();
  }, [imageSrc, isOpen, resetZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (scale !== 1) {
          resetZoom();
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowLeft" && onPrev && scale === 1) onPrev();
      if (e.key === "ArrowRight" && onNext && scale === 1) onNext();
      if (e.key === "+" || e.key === "=") {
        setScale((s) => Math.min(s + ZOOM_STEP * 2, MAX_SCALE));
      }
      if (e.key === "-") {
        setScale((s) => {
          const next = Math.max(s - ZOOM_STEP * 2, MIN_SCALE);
          if (next <= 1) {
            setOffset({ x: 0, y: 0 });
            lastOffset.current = { x: 0, y: 0 };
          }
          return next;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, scale, resetZoom]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;

    setScale((prevScale) => {
      const nextScale = Math.min(Math.max(prevScale + delta, MIN_SCALE), MAX_SCALE);
      if (nextScale === prevScale) return prevScale;

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cursorX = e.clientX - rect.left - rect.width / 2;
        const cursorY = e.clientY - rect.top - rect.height / 2;
        const scaleDiff = nextScale - prevScale;
        const newOffsetX = lastOffset.current.x - (cursorX * scaleDiff) / prevScale;
        const newOffsetY = lastOffset.current.y - (cursorY * scaleDiff) / prevScale;

        if (nextScale <= 1) {
          setOffset({ x: 0, y: 0 });
          lastOffset.current = { x: 0, y: 0 };
        } else {
          setOffset({ x: newOffsetX, y: newOffsetY });
          lastOffset.current = { x: newOffsetX, y: newOffsetY };
        }
      }

      return nextScale;
    });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (scale <= 1) return;
      e.preventDefault();
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - lastOffset.current.x,
        y: e.clientY - lastOffset.current.y,
      };
    },
    [scale]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const newOffset = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    setOffset(newOffset);
    lastOffset.current = newOffset;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const lastTouchDist = useRef<number | null>(null);
  const lastTouchMid = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist.current = Math.hypot(dx, dy);
        lastTouchMid.current = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      } else if (e.touches.length === 1 && scale > 1) {
        isDragging.current = true;
        dragStart.current = {
          x: e.touches[0].clientX - lastOffset.current.x,
          y: e.touches[0].clientY - lastOffset.current.y,
        };
      }
    },
    [scale]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / lastTouchDist.current;
      lastTouchDist.current = dist;

      setScale((prev) => {
        const next = Math.min(Math.max(prev * ratio, MIN_SCALE), MAX_SCALE);
        if (next <= 1) {
          setOffset({ x: 0, y: 0 });
          lastOffset.current = { x: 0, y: 0 };
        }
        return next;
      });
    } else if (e.touches.length === 1 && isDragging.current) {
      const newOffset = {
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      };
      setOffset(newOffset);
      lastOffset.current = newOffset;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    lastTouchDist.current = null;
    lastTouchMid.current = null;
  }, []);

  if (!isOpen) return null;

  const isZoomed = scale > 1;
  const cursorStyle = isZoomed
    ? isDragging.current
      ? "cursor-grabbing"
      : "cursor-grab"
    : "cursor-zoom-in";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in select-none">

      {/* Backdrop — only rendered when not zoomed, click to close */}
      {!isZoomed && (
        <div className="absolute inset-0 z-0" onClick={onClose} />
      )}

      {/* Close button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors z-30"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      {/* Zoom controls — each button has its own stopPropagation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 bg-muted/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
        <button
          className="p-1.5 rounded-full hover:bg-background/50 text-foreground transition-colors disabled:opacity-40"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => {
              const next = Math.max(s - ZOOM_STEP * 2, MIN_SCALE);
              if (next <= 1) {
                setOffset({ x: 0, y: 0 });
                lastOffset.current = { x: 0, y: 0 };
              }
              return next;
            });
          }}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </button>

        <span className="text-xs font-medium text-foreground min-w-[3rem] text-center tabular-nums">
          {Math.round(scale * 100)}%
        </span>

        <button
          className="p-1.5 rounded-full hover:bg-background/50 text-foreground transition-colors disabled:opacity-40"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => Math.min(s + ZOOM_STEP * 2, MAX_SCALE));
          }}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </button>

        {isZoomed && (
          <button
            className="p-1.5 rounded-full hover:bg-background/50 text-foreground transition-colors ml-1 border-l border-foreground/20 pl-3"
            onClick={(e) => {
              e.stopPropagation();
              resetZoom();
            }}
            aria-label="Reset zoom"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      {/* Nav buttons — hidden when zoomed */}
      {hasNav && onPrev && !isZoomed && (
        <button
          className="absolute left-4 p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors z-30"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {hasNav && onNext && !isZoomed && (
        <button
          className="absolute right-4 p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors z-30"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Image container — z-10 sits above backdrop (z-0) but below controls (z-30) */}
      <div
        ref={containerRef}
        className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden ${cursorStyle}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging.current ? "none" : "transform 0.1s ease-out",
            willChange: "transform",
          }}
          className="max-w-4xl mx-4"
          onDoubleClick={() => {
            if (isZoomed) {
              resetZoom();
            } else {
              setScale(2);
            }
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
            draggable={false}
          />
        </div>
      </div>


    </div>
  );
};

export default ImageModal;