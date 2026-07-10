import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { MasteryNotification } from '../hooks/useMasteryProgress';

interface MasteryNotificationsOverlayProps {
  toasts: MasteryNotification[];
  dismissToast: (id: string) => void;
}

export default function MasteryNotificationsOverlay({ toasts, dismissToast }: MasteryNotificationsOverlayProps) {
  return (
    <div className="fixed bottom-14 right-4 z-50 flex flex-col gap-3 max-w-sm w-[90%] xs:w-80 sm:w-96 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const percent = Math.round((toast.count / 16) * 100);
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className="bg-az-bg-workarea/95 rounded-xl border border-az-active/30 p-4 shadow-2xl pointer-events-auto flex flex-col gap-2.5 text-az-text-primary font-sans"
            >
              <div className="flex items-center justify-between border-b border-az-border-subtle pb-1.5 text-[10px] font-mono tracking-wider text-az-text-muted">
                <div className="flex items-center gap-1.5 text-az-active font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-az-active animate-ping inline-block" />
                  <span>CINNAMON SYSTEM ALERT</span>
                </div>
                <button 
                  onClick={() => dismissToast(toast.id)}
                  className="hover:text-az-text-heading transition-colors p-0.5 rounded hover:bg-az-bg-soft"
                  title="Dismiss"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-3xl p-1 bg-az-active/15 rounded-lg border border-az-active/20 shrink-0">
                  {toast.badge}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-az-text-heading tracking-wide">
                      Mastery Level Up!
                    </h4>
                    <span className="text-[10px] bg-az-active/20 text-az-active font-mono font-bold px-1.5 py-0.5 rounded border border-az-active/25">
                      {toast.levelName}
                    </span>
                  </div>
                  <p className="text-[11px] text-az-text-muted leading-relaxed">
                    {toast.description}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-az-text-muted">
                  <span>Overall Proficiency</span>
                  <span className="text-az-active font-bold">{percent}% ({toast.count}/16)</span>
                </div>
                <div className="w-full bg-az-bg-canvas rounded-full h-1.5 overflow-hidden border border-az-border-subtle relative">
                  <div 
                    className="bg-az-active h-full rounded-full" 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
