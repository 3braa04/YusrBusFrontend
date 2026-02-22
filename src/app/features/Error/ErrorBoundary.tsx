//https://legacy.reactjs.org/docs/error-boundaries.html

import React from "react";
import ErrorFallback from "./ErrorFallback";

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode; 

}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.    
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {    
    // call reporting service
  }

  render() {    
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback reset={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

