"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
  onGoHome?: () => void;
  variant?: "default" | "minimal" | "card";
}

export function ErrorFallback({ 
  error, 
  onRetry, 
  onGoHome,
  variant = "default" 
}: ErrorFallbackProps) {
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center p-4 text-gray-400">
        <FaExclamationTriangle className="mr-2" />
        <span>Something went wrong</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-2 text-cyan-400 hover:text-cyan-300 underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6 text-center"
      >
        <FaExclamationTriangle className="text-red-400 text-3xl mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Failed to load</h3>
        <p className="text-gray-400 text-sm mb-4">
          This component couldn't be loaded properly
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm transition-colors"
          >
            <FaRedo className="inline mr-2" />
            Try Again
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <FaExclamationTriangle className="text-red-400 text-6xl mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Oops! Something went wrong
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-6 leading-relaxed"
        >
          We encountered an unexpected error. Don't worry, it's not your fault.
        </motion.p>

        {process.env.NODE_ENV === "development" && error && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 text-left bg-gray-900/50 rounded-lg p-4 border border-gray-700"
          >
            <summary className="cursor-pointer text-gray-300 font-medium mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-red-300 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </motion.details>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <FaRedo />
              Try Again
            </button>
          )}
          
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <FaHome />
              Go Home
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Specific error boundaries for different components
export function ProjectErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback variant="card" />}
      onError={(error) => {
        console.error("Project component error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function ThreeDErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="h-48 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <FaExclamationTriangle className="text-2xl mx-auto mb-2" />
            <p className="text-sm">3D model failed to load</p>
          </div>
        </div>
      }
      onError={(error) => {
        console.error("3D component error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}