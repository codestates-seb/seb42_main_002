import React from 'react';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: error };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <ErrorBoundaryFallback />;
    }

    return children;
  }
}

export default ErrorBoundary;
