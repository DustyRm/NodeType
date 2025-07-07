import { CriticalLevel } from './CriticalLevelEnum';

export default class NavigationMessage {
  private text: string;
  private criticalLevel: CriticalLevel;

  constructor(text: string, criticalLevel: string | number = 'info') {
    this.text = text;
    this.criticalLevel = String(criticalLevel).toLowerCase() as CriticalLevel;
  }

  getText(): string {
    return this.text;
  }

  getCriticalLevel(): CriticalLevel {
    return this.criticalLevel;
  }
}
