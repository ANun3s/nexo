import { useEffect, useMemo, useRef } from "react";
import { gsap } from "../motion.js";
import "./AnimatedFooter.css";

const DEFAULT_ASCII_CHARS = "........:::=+xX#0369";
const DEFAULT_HEADING_LINES = ["NEXO."];
const HIGHLIGHT_LIFETIME = 300;
const CLUSTER_SIZE = 10;
const PARALLAX_EASE = 0.05;

function buildHandCells(image, columns, asciiChars) {
  const ratio = image.naturalWidth / image.naturalHeight || 1;
  const rows = Math.max(1, Math.round(columns / ratio));
  const sampler = document.createElement("canvas");
  sampler.width = columns;
  sampler.height = rows;
  const context = sampler.getContext("2d");
  const cells = new Map();
  if (!context) return { rows, cells };

  context.drawImage(image, 0, 0, columns, rows);
  const pixels = context.getImageData(0, 0, columns, rows).data;
  const backgroundCharIndex = asciiChars.lastIndexOf(".");

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const offset = (row * columns + col) * 4;
      const brightness =
        (pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114) / 255;
      const charIndex = Math.min(asciiChars.length - 1, Math.floor((1 - brightness) * asciiChars.length));
      if (charIndex <= backgroundCharIndex) continue;
      cells.set(`${col},${row}`, {
        col,
        row,
        char: asciiChars[charIndex],
        highlightEndTime: 0,
      });
    }
  }

  return { rows, cells };
}

function highlightCluster(cells, startCell) {
  const now = Date.now();
  startCell.highlightEndTime = now + HIGHLIGHT_LIFETIME;
  const steps = Math.floor(Math.random() * CLUSTER_SIZE) + 1;
  const litCells = [startCell];
  let current = startCell;

  for (let step = 0; step < steps; step += 1) {
    const neighbours = [];
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) continue;
        const neighbour = cells.get(`${current.col + dx},${current.row + dy}`);
        if (neighbour && !litCells.includes(neighbour)) neighbours.push(neighbour);
      }
    }
    if (!neighbours.length) break;
    const next = neighbours[Math.floor(Math.random() * neighbours.length)];
    next.highlightEndTime = now + HIGHLIGHT_LIFETIME + step * 10;
    litCells.push(next);
    current = next;
  }
}

function getScrollParent(node) {
  for (let element = node?.parentElement; element; element = element.parentElement) {
    const overflowY = getComputedStyle(element).overflowY;
    if (["auto", "scroll", "overlay"].includes(overflowY)) return element;
  }
  return null;
}

export default function AnimatedFooter({
  headingLines = DEFAULT_HEADING_LINES,
  leftImage,
  rightImage,
  asciiChars = DEFAULT_ASCII_CHARS,
  columns = 56,
  cellSize = 12,
  fontSize = 10,
  parallaxStrength = 14,
  hoverRadius = 7,
  charColor = "#b5befc",
  hoverColor = "#707ff5",
  hoverCharColor = "#ffffff",
  revealOnScroll = true,
  onRevealChange,
  className = "",
}) {
  const rootRef = useRef(null);
  const leftWrapRef = useRef(null);
  const rightWrapRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const callbackRef = useRef(onRevealChange);
  const revealActiveRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onRevealChange;
  }, [onRevealChange]);

  const signature = useMemo(
    () => JSON.stringify({ leftImage, rightImage, columns, cellSize, fontSize, asciiChars, revealOnScroll, headingLines }),
    [leftImage, rightImage, columns, cellSize, fontSize, asciiChars, revealOnScroll, headingLines],
  );

  useEffect(() => {
    const root = rootRef.current;
    const leftWrap = leftWrapRef.current;
    const rightWrap = rightWrapRef.current;
    if (!root || !leftWrap || !rightWrap) return undefined;

    const hands = [];
    const wrappers = [leftWrap, rightWrap];
    const curtain = { offset: revealOnScroll ? 125 : 0 };

    const setupHand = (image, canvas, direction) => {
      const { rows, cells } = buildHandCells(image, columns, asciiChars);
      if (!cells.size) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = columns * cellSize * dpr;
      canvas.height = rows * cellSize * dpr;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `${fontSize}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "alphabetic";
      const metrics = context.measureText("X");
      const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baselineOffset = cellSize / 2 + glyphHeight / 2 - metrics.actualBoundingBoxDescent;

      hands.push({ canvas, context, cells, cellList: [...cells.values()], rows, columns, cellSize, baselineOffset, direction });
    };

    const loadHand = (src, canvas, direction) => {
      if (!src || !canvas) return;
      const image = new Image();
      image.crossOrigin = "anonymous";
      let initialized = false;
      const init = () => {
        if (initialized) return;
        initialized = true;
        try {
          setupHand(image, canvas, direction);
        } catch {
          // A failed canvas read should not block the footer text reveal.
        }
      };
      image.onload = init;
      image.src = src;
      if (image.complete && image.naturalWidth) init();
    };

    loadHand(leftImage, leftCanvasRef.current, 1);
    loadHand(rightImage, rightCanvasRef.current, -1);

    const renderHand = (hand, now) => {
      const { context, cellList, cellSize: size, baselineOffset, columns: cols, rows } = hand;
      context.clearRect(0, 0, cols * size, rows * size);
      for (const cell of cellList) {
        const x = cell.col * size;
        const y = cell.row * size;
        const highlighted = cell.highlightEndTime > now;
        if (highlighted) {
          context.fillStyle = hoverColor;
          context.fillRect(x, y, size, size);
        }
        context.fillStyle = highlighted ? hoverCharColor : charColor;
        context.fillText(cell.char, x + size / 2, y + baselineOffset);
      }
    };

    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const hoverHand = (hand, clientX, clientY) => {
      const rect = hand.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const mouseCol = ((clientX - rect.left) / rect.width) * hand.columns;
      const mouseRow = ((clientY - rect.top) / rect.height) * hand.rows;
      let closest = null;
      let closestDistance = Infinity;
      for (const cell of hand.cellList) {
        const distance = Math.hypot(mouseCol - cell.col, mouseRow - cell.row);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = cell;
        }
      }
      if (closest && closestDistance <= hoverRadius) highlightCluster(hand.cells, closest);
    };

    const onMouseMove = (event) => {
      const rect = root.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / (rect.width || 1) - 0.5) * parallaxStrength * 2;
      pointer.y = ((event.clientY - rect.top) / (rect.height || 1) - 0.5) * parallaxStrength * 2;
      hands.forEach((hand) => hoverHand(hand, event.clientX, event.clientY));
    };
    root.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    let lastFrame = 0;
    const frame = (time) => {
      rafId = requestAnimationFrame(frame);
      if (time - lastFrame < 30) return;
      lastFrame = time;
      const now = Date.now();
      hands.forEach((hand) => renderHand(hand, now));
      drift.x += (pointer.x - drift.x) * PARALLAX_EASE;
      drift.y += (pointer.y - drift.y) * PARALLAX_EASE;
      const scale = 1 + (parallaxStrength * 2) / 200;
      wrappers.forEach((wrapper, index) => {
        const direction = index === 0 ? 1 : -1;
        const revealX = index === 0 ? -curtain.offset : curtain.offset;
        wrapper.style.transform = `translateX(${revealX}%) translate(${drift.x * direction}px, ${-drift.y}px) scale(${scale})`;
      });
    };
    rafId = requestAnimationFrame(frame);

    const chars = gsap.utils.toArray(root.querySelectorAll("[data-af-char]"));
    const animateIn = () => {
      revealActiveRef.current = true;
      gsap.to(curtain, { offset: 0, duration: 1, ease: "power3.out", overwrite: true });
      gsap.to(chars, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.055, from: "center" },
        overwrite: true,
        onComplete: () => callbackRef.current?.(true),
      });
    };
    const animateOut = () => {
      revealActiveRef.current = false;
      callbackRef.current?.(false);
      gsap.to(curtain, { offset: 125, duration: 0.4, ease: "power2.in", overwrite: true });
      gsap.to(chars, {
        yPercent: 125,
        duration: 0.4,
        ease: "power2.in",
        stagger: { each: 0.012, from: "center" },
        overwrite: true,
      });
    };
    const showAll = () => gsap.set(chars, { yPercent: 0 });
    const maskAll = () => gsap.set(chars, { yPercent: 125 });

    let observer;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !revealOnScroll) {
      curtain.offset = 0;
      showAll();
      revealActiveRef.current = true;
      callbackRef.current?.(true);
    } else {
      maskAll();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !revealActiveRef.current) animateIn();
            else if (!entry.isIntersecting && revealActiveRef.current) animateOut();
          }
        },
        { root: getScrollParent(root), threshold: 0.35 },
      );
      observer.observe(root);
    }

    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener("mousemove", onMouseMove);
      observer?.disconnect();
      gsap.killTweensOf([curtain, ...chars]);
    };
  }, [signature, leftImage, rightImage, asciiChars, columns, cellSize, fontSize, parallaxStrength, hoverRadius, charColor, hoverColor, hoverCharColor, revealOnScroll]);

  const hiddenAtStart = revealOnScroll && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const offEdge = hiddenAtStart ? 125 : 0;

  return (
    <div ref={rootRef} className={`animated-footer-stage ${className}`.trim()}>
      <div className="animated-footer-art" aria-hidden="true">
        <div ref={leftWrapRef} className="animated-footer-hand" style={{ transform: `translateX(-${offEdge}%)` }}>
          <canvas ref={leftCanvasRef} />
        </div>
        <div ref={rightWrapRef} className="animated-footer-hand" style={{ transform: `translateX(${offEdge}%)` }}>
          <canvas ref={rightCanvasRef} />
        </div>
      </div>
      <div className="animated-footer-heading">
        {headingLines.map((word, wordIndex) => (
          <h2 key={`${word}-${wordIndex}`} aria-label={word}>
            {Array.from(word).map((character, characterIndex) => (
              <span key={characterIndex} data-af-char aria-hidden="true">
                {character === " " ? " " : character}
              </span>
            ))}
          </h2>
        ))}
      </div>
      <span className="animated-footer-caption" aria-hidden="true">DESENVOLVIDO EM CONJUNTO. EVOLUÍDO COM VOCÊ.</span>
    </div>
  );
}
