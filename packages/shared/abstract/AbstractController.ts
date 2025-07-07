import { Request, Response } from 'express';
import  NavigationContext  from '../navigation/NavigationContext';

export abstract class AbstractController {
  protected errorHandler = {
    handle: (error: any, req: Request, res: Response): void => {
      console.error('❌ Internal error:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message || 'Ocorreu um erro inesperado.',
      });
    },
  };

  protected sendResponse(
    navigationContext: NavigationContext,
    req: Request,
    res: Response
  ): void {
    if (navigationContext.getSuspendNavigation()) {
      const error = navigationContext.getError();
      res.status(400).json({ error });
      return;
    }

    res.status(200).json(navigationContext.getNavigationResult().getResult());
  }
}
