import NavigationContext from '../navigation/NavigationContext';
import NavigationResult from '../navigation/NavigationResult';

type Action<T = any> = {
  execute: (domain: T, context: NavigationContext) => Promise<void>;
};

export abstract class AbstractFactory<T = any> {
  private actions: Action<T>[] = [];

  getActions(): Action<T>[] {
    return this.actions;
  }

  setActions(actions: Action<T>[]): void {
    this.actions = actions;
  }

  async navigate(
    domain: T,
    navigationContext: NavigationContext | null = null
  ): Promise<NavigationResult> {
    if (navigationContext == null) {
      navigationContext = new NavigationContext(new NavigationResult());
    }

    for (const action of this.actions) {
      if (navigationContext.getSuspendNavigation()) {
        return navigationContext.getNavigationResult();
      }
      await action.execute(domain, navigationContext);
    }

    return navigationContext.getNavigationResult();
  }
}
