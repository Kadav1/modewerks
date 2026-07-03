import { describe, it, expect } from 'vitest';
import {
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  wordForward,
  wordBackward,
  deleteChar,
  appendRowBelow,
  sanitizeCoordinates
} from './vimEngine';

describe('Vim Engine movement and buffer utilities', () => {
  const testBuffer = [
    "line one",
    "line two word",
    ""
  ];

  describe('sanitizeCoordinates', () => {
    it('bounds coordinates to buffer range', () => {
      const res = sanitizeCoordinates(5, 50, testBuffer, 'normal');
      expect(res.row).toBe(2);
      expect(res.col).toBe(0);
    });

    it('bounds col for normal mode (length - 1)', () => {
      const res = sanitizeCoordinates(0, 10, testBuffer, 'normal');
      expect(res.row).toBe(0);
      expect(res.col).toBe(7); // "line one" length is 8, normal mode max col is 7
    });

    it('bounds col for insert mode (length)', () => {
      const res = sanitizeCoordinates(0, 10, testBuffer, 'insert');
      expect(res.row).toBe(0);
      expect(res.col).toBe(8); // "line one" length is 8, insert mode max col is 8
    });
  });

  describe('moveLeft', () => {
    it('decrements col but stops at 0', () => {
      expect(moveLeft(5)).toBe(4);
      expect(moveLeft(0)).toBe(0);
    });
  });

  describe('moveRight', () => {
    it('increments col up to line limits in normal mode', () => {
      expect(moveRight(0, 0, testBuffer, 'normal')).toBe(1);
      expect(moveRight(7, 0, testBuffer, 'normal')).toBe(7); // capped at length-1
    });

    it('increments col up to line limits in insert mode', () => {
      expect(moveRight(7, 0, testBuffer, 'insert')).toBe(8); // capped at length
      expect(moveRight(8, 0, testBuffer, 'insert')).toBe(8);
    });
  });

  describe('moveDown', () => {
    it('increments row and maintains col bounds', () => {
      const res = moveDown(0, 5, testBuffer, 'normal');
      expect(res.row).toBe(1);
      expect(res.col).toBe(5);
    });

    it('clips col when transitioning to a shorter line', () => {
      const res = moveDown(1, 10, testBuffer, 'normal');
      expect(res.row).toBe(2);
      expect(res.col).toBe(0); // empty line has 0 max col
    });
  });

  describe('moveUp', () => {
    it('decrements row and maintains col bounds', () => {
      const res = moveUp(1, 5, testBuffer, 'normal');
      expect(res.row).toBe(0);
      expect(res.col).toBe(5);
    });
  });

  describe('wordForward', () => {
    it('moves to next word start', () => {
      const res = wordForward(1, 0, testBuffer); // "line two word"
      expect(res.row).toBe(1);
      expect(res.col).toBe(5); // index of 't' in "two"
    });

    it('moves to next line when at end of line', () => {
      const res = wordForward(0, 7, testBuffer);
      expect(res.row).toBe(1);
      expect(res.col).toBe(0);
    });
  });

  describe('wordBackward', () => {
    it('moves to previous word start', () => {
      const res = wordBackward(1, 5, testBuffer); // cursor at 't' in "line two word"
      expect(res.col).toBe(0); // moves to start of "line"
    });

    it('moves to previous line end when at col 0', () => {
      const res = wordBackward(1, 0, testBuffer);
      expect(res.row).toBe(0);
      expect(res.col).toBe(7);
    });
  });

  describe('deleteChar', () => {
    it('deletes char at cursor index and adjusts cursor if at end', () => {
      const res = deleteChar(testBuffer, 0, 7); // delete 'e' in "line one"
      expect(res.buffer[0]).toBe("line on");
      expect(res.col).toBe(6);
    });
  });

  describe('appendRowBelow', () => {
    it('inserts an empty line below and enters insert mode', () => {
      const res = appendRowBelow(testBuffer, 0);
      expect(res.buffer.length).toBe(4);
      expect(res.buffer[1]).toBe("");
      expect(res.row).toBe(1);
      expect(res.col).toBe(0);
      expect(res.mode).toBe('insert');
    });
  });
});
