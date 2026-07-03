/**
 * Pure functions to calculate cursor coordinates and text buffer edits in a Vim-like editor.
 * Extracted to resolve code duplication (P3) and enable robust unit testing (P2).
 */

import { VimMode } from '../types';

export function sanitizeCoordinates(row: number, col: number, buffer: string[], mode: VimMode): { row: number; col: number } {
  const r = Math.max(0, Math.min(row, buffer.length - 1));
  const line = buffer[r] || '';
  const c = Math.max(0, Math.min(col, Math.max(0, line.length - (mode === 'insert' ? 0 : 1))));
  return { row: r, col: c };
}

export function moveLeft(col: number): number {
  return Math.max(0, col - 1);
}

export function moveRight(col: number, row: number, buffer: string[], mode: VimMode): number {
  const lineLen = buffer[row]?.length || 0;
  const maxCol = Math.max(0, lineLen - (mode === 'insert' ? 0 : 1));
  return Math.min(col + 1, maxCol);
}

export function moveDown(row: number, col: number, buffer: string[], mode: VimMode): { row: number; col: number } {
  const nextRow = Math.min(buffer.length - 1, row + 1);
  const nextLineLen = buffer[nextRow]?.length || 0;
  const newCol = Math.min(col, Math.max(0, nextLineLen - (mode === 'insert' ? 0 : 1)));
  return { row: nextRow, col: newCol };
}

export function moveUp(row: number, col: number, buffer: string[], mode: VimMode): { row: number; col: number } {
  const prevRow = Math.max(0, row - 1);
  const prevLineLen = buffer[prevRow]?.length || 0;
  const newCol = Math.min(col, Math.max(0, prevLineLen - (mode === 'insert' ? 0 : 1)));
  return { row: prevRow, col: newCol };
}

export function wordForward(row: number, col: number, buffer: string[]): { row: number; col: number; details: string } {
  const currentLine = buffer[row] || '';
  if (col >= currentLine.length - 1) {
    if (row < buffer.length - 1) {
      return { row: row + 1, col: 0, details: 'Moved to start of next line' };
    }
    return { row, col: Math.max(0, currentLine.length - 1), details: 'End of buffer reached' };
  }

  const sliced = currentLine.slice(col + 1);
  const match = sliced.match(/\s+\S/);
  if (match && match.index !== undefined) {
    const nextCol = col + 1 + match.index + (match[0].length - 1);
    return { row, col: nextCol, details: 'Moved forward to start of next word' };
  }
  return { row, col: Math.max(0, currentLine.length - 1), details: 'End of line reached' };
}

export function wordBackward(row: number, col: number, buffer: string[]): { row: number; col: number } {
  if (col === 0) {
    if (row > 0) {
      const prevRow = row - 1;
      return { row: prevRow, col: Math.max(0, (buffer[prevRow]?.length || 0) - 1) };
    }
    return { row, col };
  }

  const currentLine = buffer[row] || '';
  const reversed = Array.from(currentLine.slice(0, col)).reverse().join('');
  const match = reversed.match(/[^\s]\s+/);
  if (match && match.index !== undefined) {
    const nextCol = col - (match.index + match[0].length);
    return { row, col: nextCol };
  }
  return { row, col: 0 };
}

export function deleteChar(buffer: string[], row: number, col: number): { buffer: string[]; col: number } {
  const currentLine = buffer[row] || '';
  if (!currentLine) return { buffer, col: 0 };

  const newLine = currentLine.slice(0, col) + currentLine.slice(col + 1);
  const updated = [...buffer];
  updated[row] = newLine;

  const maxCol = Math.max(0, newLine.length - 1);
  return { buffer: updated, col: Math.min(col, maxCol) };
}

export function appendRowBelow(buffer: string[], row: number): { buffer: string[]; row: number; col: number; mode: VimMode } {
  const updated = [...buffer];
  updated.splice(row + 1, 0, "");
  return {
    buffer: updated,
    row: row + 1,
    col: 0,
    mode: 'insert'
  };
}
