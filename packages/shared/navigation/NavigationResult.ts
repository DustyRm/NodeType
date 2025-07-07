import NavigationMessage from './NavigationMessage';
import  CriticalLevelEnum, { CriticalLevel } from './CriticalLevelEnum';

export default class NavigationResult {
  private messages: NavigationMessage[] = [];
  private result: any = null;

  addMessage(text: string, criticalLevel: CriticalLevel = CriticalLevelEnum.INFO): void {
    this.messages.push(new NavigationMessage(text, criticalLevel));
  }

  getMessages(): NavigationMessage[] {
    return this.messages;
  }

  setResult(result: unknown): void {
    this.result = result;
  }

  getResult<T = unknown>(): T {
    return this.result as T;
  }
}
