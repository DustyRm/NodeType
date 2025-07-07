import NavigationResult from './NavigationResult';
import CriticalLevelEnum, { CriticalLevel } from './CriticalLevelEnum';
import NavigationMessage from './NavigationMessage';

export default class NavigationContext {
  private navigationResult: NavigationResult;
  private error: string | null = null;
  private suspendNavigation = false;
  private messages: NavigationMessage[] = [];
  private values: Map<string, unknown> = new Map();

  constructor(navigationResult: NavigationResult) {
    this.navigationResult = navigationResult;
  }

  addMessage(text: string, criticalLevel: string | number = 'info'): void {
    const message = new NavigationMessage(text, criticalLevel);
    this.messages.push(message);
  }

  getMessages(): NavigationMessage[] {
    return this.messages;
  }

  setError(message: string): void {
    this.suspendNavigation = true;
    this.error = message;
    this.navigationResult.addMessage(message, CriticalLevelEnum.HIGH);
  }

  hasError(): boolean {
    return this.error !== null;
  }

  getError(): string | null {
    return this.error;
  }

  setValue(key: string, value: unknown): void {
    this.values.set(key, value);
  }

  getValue<T>(key: string): T | undefined {
    return this.values.get(key) as T | undefined;
  }

  getNavigationResult(): NavigationResult {
    return this.navigationResult;
  }

  setNavigationResult(navigationResult: NavigationResult): void {
    this.navigationResult = navigationResult;
  }

  getSuspendNavigation(): boolean {
    return this.suspendNavigation;
  }

  setSuspendNavigation(value: boolean): void {
    this.suspendNavigation = value;
  }
}
