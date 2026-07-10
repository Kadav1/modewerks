import { useState } from 'react';

export interface MasteryNotification {
  id: string;
  levelName: string;
  badge: string;
  count: number;
  description: string;
}

export function useMasteryProgress() {
  const [completedCommands, setCompletedCommands] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vim_sandbox_completed_commands');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<MasteryNotification[]>([]);

  const handleRecordCommand = (cmd: string) => {
    if (completedCommands.includes(cmd)) return;

    const updated = [...completedCommands, cmd];
    setCompletedCommands(updated);
    try {
      localStorage.setItem('vim_sandbox_completed_commands', JSON.stringify(updated));
    } catch {}

    const newCount = updated.length;
    let levelName = '';
    let badge = '';
    let desc = '';

    if (newCount === 4) {
      levelName = 'Vim Apprentice';
      badge = '🎓';
      desc = "First milestone achieved! You've mastered basic movements and navigations.";
    } else if (newCount === 8) {
      levelName = 'Vim Scholar';
      badge = '📚';
      desc = "Double figures! Commands and structural edits are becoming intuitive.";
    } else if (newCount === 12) {
      levelName = 'Vim Specialist';
      badge = '⚡';
      desc = "Excellent dexterity! Splits, case changes, and commands list completed.";
    } else if (newCount === 16) {
      levelName = 'Vim Grandmaster';
      badge = '👑';
      desc = "Elite efficiency! 100% of all sandbox editor commands successfully mastered.";
    }

    if (levelName) {
      const id = Date.now().toString();
      const newToast = { id, levelName, badge, count: newCount, description: desc };
      setToasts((active) => [...active, newToast]);
      
      setTimeout(() => {
        setToasts((active) => active.filter((t) => t.id !== id));
      }, 6500);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((active) => active.filter((t) => t.id !== id));
  };

  const resetProgress = () => {
    setCompletedCommands([]);
    setToasts([]);
    try {
      localStorage.removeItem('vim_sandbox_completed_commands');
    } catch {}
  };

  return { completedCommands, toasts, handleRecordCommand, dismissToast, resetProgress };
}
