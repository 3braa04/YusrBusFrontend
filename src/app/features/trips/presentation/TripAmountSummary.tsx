"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { Ticket } from "../data/ticket";

interface TripAmountSummaryProps {
  tickets: Ticket[];
  discountPercentage?: number;
  className?: string;
}

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current === value) return;
    setIsAnimating(true);
    const start = prevValue.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else {
        setDisplayed(end);
        setIsAnimating(false);
        prevValue.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span
      className={cn(
        "tabular-nums transition-all duration-300",
        isAnimating && "scale-105"
      )}
      style={{ display: "inline-block" }}
    >
      {prefix}{displayed.toLocaleString()}
    </span>
  );
}

function StatCard({
  label,
  value,
  discountedValue,
  discountPercentage,
  accent,
  icon,
  delay,
}: {
  label: string;
  value: number;
  discountedValue?: number;
  discountPercentage?: number;
  accent: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const hasDiscount = discountPercentage != null && discountPercentage > 0 && discountedValue != null;

  return (
    <div
      className={cn(
        "relative flex-1 min-w-0 rounded-2xl border bg-card px-5 py-4 overflow-hidden",
        "transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 group",
        "animate-in slide-in-from-top-2 fade-in"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both", animationDuration: "400ms" }}
    >
      <div
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}, transparent 70%)` }}
      />
      <div className="absolute top-0 left-0 h-0.5 w-full rounded-t-2xl" style={{ background: accent }} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-1xs flex-1">
          <p className="text-xs font-medium text-muted-foreground mb-1 truncate">{label}</p>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            {hasDiscount ? (
              <>
                <span className="text-sm text-muted-foreground line-through opacity-60">
                  <AnimatedNumber value={value} />
                </span>
                <span className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
                  <AnimatedNumber value={discountedValue!} />
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
                <AnimatedNumber value={value} />
              </span>
            )}
          </div>
          {hasDiscount && (
            <div
              className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ background: `${accent}18`, color: accent }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 7L5 3L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              خصم {discountPercentage}%
            </div>
          )}
        </div>

        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}15`, color: accent }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function TripAmountSummary({
  tickets,
  discountPercentage,
  className,
}: TripAmountSummaryProps) {
  const totalAmount = tickets.reduce((s, t) => s + (t.amount ?? 0), 0);
  const totalPaid = tickets.reduce((s, t) => s + (t.paidAmount ?? 0), 0);
  const count = tickets.length;

  const applyDiscount = (v: number) =>
    discountPercentage != null && discountPercentage > 0
      ? Math.round(v * (1 - discountPercentage / 100))
      : undefined;

  const discountedAmount = applyDiscount(totalAmount);
  const discountedPaid = applyDiscount(totalPaid);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 w-fit m-auto",
        "bg-background/90 backdrop-blur-md border-b border-border/60",
        "px-4 py-3 mb-4",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="shrink-0 flex items-center gap-2 rounded-xl border bg-muted/50 px-3 py-2 animate-in fade-in slide-in-from-top-2"
          style={{ animationDuration: "300ms", animationFillMode: "both" }}
        >
          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-primary">
              <rect x="1" y="4" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 4V3a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="6.5" cy="8" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground leading-none mb-0.5">التذاكر</p>
            <p className="text-sm font-bold text-foreground tabular-nums">
              <AnimatedNumber value={count} />
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 flex-1 min-w-0">
          <StatCard
            label="إجمالي المبلغ"
            value={totalAmount}
            discountedValue={discountedAmount}
            discountPercentage={discountPercentage}
            accent="#3b82f6"
            delay={50}
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v14M5 5.5C5 4.12 6.34 3 8 3h2c1.66 0 3 1.12 3 2.5S11.66 8 10 8H8C6.34 8 5 9.12 5 10.5S6.34 13 8 13h2c1.66 0 3-1.12 3-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />
          <StatCard
            label="إجمالي المدفوع"
            value={totalPaid}
            discountedValue={discountedPaid}
            discountPercentage={discountPercentage}
            accent="#22c55e"
            delay={120}
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 8h14" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="6" cy="11.5" r="1" fill="currentColor"/>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}