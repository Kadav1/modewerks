import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import VimSandbox from './VimSandbox';

describe('VimSandbox component tests', () => {
  it('renders terminal sandbox layout and displays original header details', () => {
    render(<VimSandbox />);
    
    // Check main header title
    expect(screen.getByText('Interactive Vim Terminal Sandbox')).toBeInTheDocument();
    
    // Toggle button should be off initially
    expect(screen.getByText('Capture Keys: OFF')).toBeInTheDocument();
  });

  it('can toggle key interception mode', () => {
    render(<VimSandbox />);
    const toggleButton = screen.getByRole('button', { name: /Capture Keys: OFF/i });
    
    // Enable capture
    fireEvent.click(toggleButton);
    expect(screen.getByText('Intercepting Keys: ON')).toBeInTheDocument();

    // Disable capture
    fireEvent.click(screen.getByText('Intercepting Keys: ON'));
    expect(screen.getByText('Capture Keys: OFF')).toBeInTheDocument();
  });

  it('intercepts h/j/k/l movement keys when key interception is active', () => {
    const onRecordCommandMock = vi.fn();
    render(<VimSandbox onRecordCommand={onRecordCommandMock} />);
    
    // Click toggle button to activate capture
    const toggleButton = screen.getByRole('button', { name: /Capture Keys: OFF/i });
    fireEvent.click(toggleButton);

    // Initial log state should match
    expect(screen.getByText(/Keyboard hook captured/i)).toBeInTheDocument();

    // Fire keydown events on window wrapped in act
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j' }));
    });
    
    // Check if onRecordCommand was called with 'j'
    expect(onRecordCommandMock).toHaveBeenCalledWith('j');
    
    // Move up with 'k' wrapped in act
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    });
    expect(onRecordCommandMock).toHaveBeenCalledWith('k');
  });

  it('handles insert mode transitions and single character deletions', () => {
    const onRecordCommandMock = vi.fn();
    render(<VimSandbox onRecordCommand={onRecordCommandMock} />);
    
    // Activate key capture
    const toggleButton = screen.getByRole('button', { name: /Capture Keys: OFF/i });
    fireEvent.click(toggleButton);

    // Transition to insert mode by pressing 'i' wrapped in act
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'i' }));
    });
    expect(onRecordCommandMock).toHaveBeenCalledWith('i');
    expect(screen.getByText('-- INSERT --')).toBeInTheDocument();

    // Escape back to normal mode wrapped in act
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(screen.getByText('-- NORMAL --')).toBeInTheDocument();

    // Delete character with 'x' wrapped in act
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
    });
    expect(onRecordCommandMock).toHaveBeenCalledWith('x');
  });
});
