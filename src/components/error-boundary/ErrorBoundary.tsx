import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "../button";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      error: error instanceof Error ? error : new Error("Произошла неизвестная ошибка."),
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main className={styles.root}>
          <div className={styles.content}>
            <h1>Не удалось отобразить приложение</h1>
            <div>Произошла ошибка. Попробуйте перезагрузить страницу.</div>
            <div className={styles.message}>{this.state.error.message}</div>
            <Button tone="accent" onClick={() => window.location.reload()}>
              Перезагрузить страницу
            </Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
