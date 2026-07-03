import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in modewerks:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-950 border border-red-500 rounded-lg text-red-100 font-mono text-sm space-y-4 max-w-lg mx-auto mt-20">
          <h2 className="text-lg font-bold">Something went wrong in the Desklet.</h2>
          <pre className="p-3 bg-red-900/50 rounded overflow-auto max-h-40 border border-red-800 text-xs select-text">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded text-xs cursor-pointer font-bold transition-colors"
          >
            Reload Desklet
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
