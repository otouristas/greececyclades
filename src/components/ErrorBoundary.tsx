import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail, X } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

type ErrorType = 'network' | 'render' | 'unknown';

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    retryCount: 0
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('Uncaught error:', error, errorInfo);
    
    // Report error if callback provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Optional: Send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }
  }

  private getErrorType = (): ErrorType => {
    const { error } = this.state;
    if (!error) return 'unknown';
    
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'network';
    }
    if (message.includes('render') || message.includes('component')) {
      return 'render';
    }
    return 'unknown';
  };

  private handleRetry = () => {
    if (this.state.retryCount < 3) {
      this.setState((prev) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prev.retryCount + 1
      }));
    } else {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleDismiss = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorType = this.getErrorType();
      const { retryCount } = this.state;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {errorType === 'network' 
                      ? 'Connection Problem'
                      : errorType === 'render'
                      ? 'Display Error'
                      : 'Something Went Wrong'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Error #{retryCount + 1}
                  </p>
                </div>
              </div>
              {retryCount === 0 && (
                <button
                  onClick={this.handleDismiss}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                {errorType === 'network'
                  ? "We're having trouble connecting to our servers. Please check your internet connection and try again."
                  : errorType === 'render'
                  ? "There was a problem displaying this content. Our team has been notified."
                  : "We're sorry, but something unexpected happened. Our team has been notified and is working on a fix."}
              </p>

              {this.props.showDetails && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800 mb-2">
                    Technical Details
                  </summary>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                    <pre className="text-xs text-gray-700 overflow-auto max-h-48">
                      {this.state.error.toString()}
                      {this.state.errorInfo && (
                        <>
                          {'\n\n'}
                          {this.state.errorInfo.componentStack}
                        </>
                      )}
                    </pre>
                  </div>
                </details>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <RefreshCw className="h-5 w-5" />
                {retryCount < 3 ? 'Try Again' : 'Reload Page'}
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Home className="h-5 w-5" />
                Go Home
              </button>
              <a
                href="mailto:support@discovercyclades.gr?subject=Error Report"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Mail className="h-5 w-5" />
                Report Issue
              </a>
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                If this problem persists, please contact our support team at{' '}
                <a href="mailto:support@discovercyclades.gr" className="text-blue-600 hover:underline">
                  support@discovercyclades.gr
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
