import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import VimrcConfigurator from './VimrcConfigurator';

describe('VimrcConfigurator component tests', () => {
  it('renders configurator options and header', () => {
    render(<VimrcConfigurator />);

    // Configurator header should be present
    expect(screen.getByText('Vim Configuration Generator')).toBeInTheDocument();
    
    // Configurator presets should be visible
    expect(screen.getByRole('button', { name: /MINIMALIST/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /MODERN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /WEBDEV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /COMPETITIVE/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /WRITER/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /TUTOR/i })).toBeInTheDocument();
  });

  it('generates the appropriate .vimrc preview text block', () => {
    render(<VimrcConfigurator />);
    
    const preview = screen.getByTestId('vimrc-preview');
    expect(preview).toHaveTextContent(/Custom .vimrc generated/i);
    expect(preview).toHaveTextContent(/--- General \/ Environment Settings ---/i);
  });

  it('updates settings on preset toggle selection', () => {
    render(<VimrcConfigurator />);
    
    // Click on Minimalist preset
    const minimalistButton = screen.getByRole('button', { name: /MINIMALIST/i });
    fireEvent.click(minimalistButton);
    
    const preview = screen.getByTestId('vimrc-preview');
    
    // Check that minimalist values are active in the preview
    expect(preview).toHaveTextContent(/set number/i);
    expect(preview).not.toHaveTextContent(/set relativenumber/i);
  });

  it('can toggle format switcher to init.lua and output Lua syntax', () => {
    render(<VimrcConfigurator />);

    // Click on init.lua button in format switcher
    const luaBtn = screen.getByRole('button', { name: /init.lua/i });
    fireEvent.click(luaBtn);

    const preview = screen.getByTestId('vimrc-preview');
    
    // Should now generate Lua syntax
    expect(preview).toHaveTextContent(/Custom init.lua generated/i);
    expect(preview).toHaveTextContent(/vim.opt.number = true/i);
    expect(preview).toHaveTextContent(/vim.opt.relativenumber = true/i);
  });

  it('injects lazy.nvim plugin block when bootstrapper is enabled', () => {
    render(<VimrcConfigurator />);

    // Switch to Lua format first
    fireEvent.click(screen.getByRole('button', { name: /init.lua/i }));

    // Click on bootstrap toggle
    const bootstrapSwitch = screen.getByText(/BOOTSTRAP:/i);
    fireEvent.click(bootstrapSwitch);

    const preview = screen.getByTestId('vimrc-preview');
    
    // Check for lazy.nvim loader blocks
    expect(preview).toHaveTextContent(/local lazypath = vim.fn.stdpath/i);
    expect(preview).toHaveTextContent(/require\("lazy"\).setup\({/i);
  });

  it('can select competitive programming preset and generate compilation mapping', () => {
    render(<VimrcConfigurator />);

    // Click on Competitive preset
    fireEvent.click(screen.getByRole('button', { name: /COMPETITIVE/i }));

    const preview = screen.getByTestId('vimrc-preview');

    // Should include F5 compile mapping in Vimscript
    expect(preview).toHaveTextContent(/g\+\+ -std=c\+\+17/i);
  });

  it('can select motion tutor preset and disable arrow keys', () => {
    render(<VimrcConfigurator />);

    // Click on Tutor preset
    fireEvent.click(screen.getByRole('button', { name: /TUTOR/i }));

    const preview = screen.getByTestId('vimrc-preview');

    // Should include arrow key disable maps in Lua (TUTOR default switches to Lua)
    expect(preview).toHaveTextContent(/vim.keymap.set\({"n", "v"}, "<Up>", "<Nop>"\)/i);
  });
});
