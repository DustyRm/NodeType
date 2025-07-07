import NavigationContext from '../navigation/NavigationContext';

export abstract class AbstractStrategy<T = any> {
  abstract execute(domain: T, navigationContext: NavigationContext): Promise<any>;

  disseminateSubNavigationResult(
    navigationContext: NavigationContext,
    subNavigationContext: NavigationContext,
    suspend = true
  ): void {
    if (suspend) {
      navigationContext.setSuspendNavigation(
        subNavigationContext.getSuspendNavigation() ?? false
      );
    }

    for (const message of subNavigationContext.getNavigationResult().getMessages()) {
      navigationContext
        .getNavigationResult()
        .addMessage(message.getText(), message.getCriticalLevel());
    }
  }
}
