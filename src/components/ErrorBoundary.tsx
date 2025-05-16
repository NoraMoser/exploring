import React, { Component, ReactNode } from "react";
//react error boundary documentation https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

type ErrorBoundaryProps = {
  children: ReactNode; // built into error boundaries - expects nested children props
};

type ErrorBoundaryState = {
  hasError: boolean; // tracks whether an error has occured and updates the state
  error?: Error; //if there is an error, what is it?
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  //this has to be a class
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; //so the initial state is false bc no error yet
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    //updates state when there is an error
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //this is a lifecycle method that used to be common react back when it was still all class componentw! it logs error details
    console.error("Error caught by error boundary", error, errorInfo); //would add some logging for a bigger app but this is fine for this small one
  }

  render() {
    //the fallback UI if there is an error
    if (this.state.hasError) {
      return (
        <div role="alert" aria-live="assertive" className="error-boundary">
          <h2 tabIndex={-1}>Something Unexpected Happened</h2>
          <p>
            {this.state.error?.message ??
              "Sorry about that, calculating what went wrong. Please try to refresh the page."}
          </p>
        </div>
      );
    }
    return this.props.children; //return all the nested components as usual if no error
  }
}

export default ErrorBoundary;
