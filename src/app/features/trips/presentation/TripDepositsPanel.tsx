import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Box,
  Package,
  PackagePlus,
  Trash2,
  Weight,
} from "lucide-react";
import { useState } from "react";
import type { Deposit } from "../data/deposit";
import ChangeDepositDialog from "./changeDepositDialog";

type TripDepositsPanelProps = {
  deposits: Deposit[];
  onDepositAdded: (d: Deposit) => void;
  onDepositDeleted: (index: number) => void;
};

const CRATE_COLORS = [
  {
    bg: "bg-amber-950/40",
    border: "border-amber-700/60",
    badge: "bg-amber-700",
    glow: "shadow-amber-900/40",
  },
  {
    bg: "bg-stone-800/40",
    border: "border-stone-600/60",
    badge: "bg-stone-600",
    glow: "shadow-stone-900/40",
  },
  {
    bg: "bg-orange-950/40",
    border: "border-orange-800/60",
    badge: "bg-orange-800",
    glow: "shadow-orange-900/40",
  },
  {
    bg: "bg-yellow-950/40",
    border: "border-yellow-800/50",
    badge: "bg-yellow-700",
    glow: "shadow-yellow-900/40",
  },
];

function WoodPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="wood"
        x="0"
        y="0"
        width="4"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <line x1="2" y1="0" x2="2" y2="40" stroke="#92400e" strokeWidth="1.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#wood)" />
    </svg>
  );
}

function CrossBrace() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-amber-700/40 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-amber-700/40 to-transparent" />
    </div>
  );
}

function DepositCard({
  deposit: dep,
  index,
  onDelete,
}: {
  deposit: Deposit;
  index: number;
  onDelete: () => void;
}) {
  const color = CRATE_COLORS[index % CRATE_COLORS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`
        relative rounded-xl border-2 ${color.border} ${color.bg}
        p-4 cursor-default overflow-hidden
        shadow-lg ${color.glow}
        transition-shadow duration-300
        ${hovered ? "shadow-xl" : ""}
      `}
    >
      <WoodPattern />
      <CrossBrace />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {dep.image?.url || dep.image?.base64File ? (
              <img
                src={
                  dep.image.url ||
                  `data:${dep.image.contentType};base64,${dep.image.base64File}`
                }
                alt="صورة الأمانة"
                className="w-10 h-10 rounded-lg object-cover border border-amber-700/50 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-amber-900/50 border border-amber-700/40 flex items-center justify-center flex-shrink-0">
                <Box className="w-5 h-5 text-amber-500/70" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-amber-100 truncate leading-tight">
                {dep.description || "أمانة"}
              </p>
              <p className="text-xs text-amber-400/70 truncate">
                {dep.fromCityName} ← {dep.toCityName}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-900/40 border border-red-700/40 flex items-center justify-center text-red-400 hover:bg-red-800/60 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-900/60 border border-amber-700/40 text-xs text-amber-200">
            <span className="font-semibold">{dep.sender}</span>
          </span>
          <span className="text-amber-600/50 text-xs">←</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-900/60 border border-amber-700/40 text-xs text-amber-200">
            <span className="font-semibold">{dep.recipient}</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-amber-400/80">
            <Weight className="w-3 h-3" />
            <span dir="ltr">
              {dep.paidAmount ?? 0} / {dep.amount} ر.س
            </span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${color.badge}`}
          >
            #{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TripDepositsPanel({
  deposits,
  onDepositAdded,
  onDepositDeleted,
}: TripDepositsPanelProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 h-full" dir="rtl">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-900/50 border border-amber-700/50 flex items-center justify-center">
            <Archive className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-100 leading-tight">
              الأمانات
            </h3>
            <p className="text-[10px] text-amber-500/70">
              {deposits.length} {deposits.length === 1 ? "أمانة" : "أمانات"}
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 border border-amber-500/50 text-white text-xs font-bold transition-colors shadow-lg shadow-amber-900/40"
            >
              <PackagePlus className="w-3.5 h-3.5" />
              إضافة
            </motion.button>
          </DialogTrigger>
          <ChangeDepositDialog
            onSuccess={(dep: Deposit) => {
              onDepositAdded(dep);
              setIsDialogOpen(false);
            }}
          />
        </Dialog>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 pr-0.5">
        <AnimatePresence mode="popLayout">
          {deposits.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full min-h-[160px] gap-3 text-center px-4"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border-2 border-dashed border-amber-800/50 flex items-center justify-center">
                  <Package className="w-7 h-7 text-amber-700/60" />
                </div>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-700/40 border border-amber-600/40 flex items-center justify-center"
                >
                  <span className="text-[9px] text-amber-300">0</span>
                </motion.div>
              </div>
              <p className="text-xs text-amber-600/70 leading-relaxed">
                لا توجد أمانات
                <br />
                اضغط &quot;إضافة&quot; لإضافة أمانة جديدة
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 pb-2">
              {deposits.map((dep, i) => (
                <DepositCard
                  key={i}
                  deposit={dep}
                  index={i}
                  onDelete={() => onDepositDeleted(i)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {deposits.length > 0 && (
        <motion.div
          layout
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-950/50 border border-amber-800/40"
        >
          <span className="text-xs text-amber-400/80">إجمالي الأمانات</span>
          <span className="text-sm font-bold text-amber-200" dir="ltr">
            {deposits.reduce((s, d) => s + (d.amount || 0), 0)} ر.س
          </span>
        </motion.div>
      )}
    </div>
  );
}
