import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import VimTroubleshooting from './VimTroubleshooting';

describe('VimTroubleshooting component tests', () => {
  it('renders diagnostics dashboard title and details', () => {
    render(<VimTroubleshooting />);
    
    // Check main dashboard title
    expect(screen.getByText(/Workspace Diagnostics & Recovery Ledger/i)).toBeInTheDocument();
    
    // Check key diagnostics commands exist
    expect(screen.getByText(':checkhealth')).toBeInTheDocument();
    expect(screen.getByText(':messages')).toBeInTheDocument();
    expect(screen.getByText(':recover')).toBeInTheDocument();
    expect(screen.getByText(':AzwerksHealthCheck')).toBeInTheDocument();
  });

  it('can toggle between tabs in the right side panel', () => {
    render(<VimTroubleshooting />);

    // Initially, Terminal Console is active, and Reference Docs is not visible
    expect(screen.getByText(/TERMINAL CONSOLE/i)).toBeInTheDocument();
    expect(screen.queryByText(/Swap Files & Crash Recovery/i)).not.toBeInTheDocument();

    // Click on Reference Docs tab
    const docsTab = screen.getByText(/REFERENCE DOCS/i);
    fireEvent.click(docsTab);

    // Now reference docs content should be visible
    expect(screen.getByText(/Swap Files & Crash Recovery/i)).toBeInTheDocument();
    expect(screen.getByText(/Safe Swap Purge Routine/i)).toBeInTheDocument();
  });

  it('runs command in terminal when play button is clicked', async () => {
    vi.useFakeTimers();
    render(<VimTroubleshooting />);

    // Click checkhealth play button (first play button)
    const playButtons = screen.getAllByTitle(/Run in terminal simulator/i);
    fireEvent.click(playButtons[0]);

    // Advance timers for the command execution delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Check terminal contains checkhealth input command and checkhealth check headers
    expect(screen.getByText(/~ \$ :checkhealth/i)).toBeInTheDocument();
    expect(screen.getByText(/health#nvim#check/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('can progress through the recovery wizard steps', () => {
    render(<VimTroubleshooting />);

    // Switch to Recovery Wizard tab
    const wizardTab = screen.getByText(/RECOVERY WIZARD/i);
    fireEvent.click(wizardTab);

    // Step 1: Check it contains crash alert text
    expect(screen.getByText(/Crash Alert!/i)).toBeInTheDocument();

    // Click "Quick Fill" to advance to step 2
    let quickFillBtn = screen.getByText(/Quick Fill/i);
    fireEvent.click(quickFillBtn);

    // Step 2: ATTENTION screen
    expect(screen.getByText(/E325: ATTENTION/i)).toBeInTheDocument();

    // Click "Quick Fill" to advance to step 3
    fireEvent.click(screen.getByText(/Quick Fill/i));
    expect(screen.getByText(/Using swap file/i)).toBeInTheDocument();

    // Advance to step 4
    fireEvent.click(screen.getByText(/Quick Fill/i));
    expect(screen.getByText(/Exit Neovim now/i)).toBeInTheDocument();

    // Advance to step 5
    fireEvent.click(screen.getByText(/Quick Fill/i));
    expect(screen.getByText(/Delete the stale swap file/i)).toBeInTheDocument();

    // Advance to step 6 (Success)
    fireEvent.click(screen.getByText(/Quick Fill/i));
    expect(screen.getByText(/Mastery Unlocked!/i)).toBeInTheDocument();
  });
});
