import { Block } from '@/shared/utils/block';
import { IRouter } from '@/shared/models/router.interface';
import Route from '@/shared/router/route';

const APP_QUERY = '#app';

class Router {
  private readonly _rootQuery: string = APP_QUERY;
  private currentRoute: Route | null = null;
  private routes: Route[] = [];
  private history: History = window.history;

  constructor() {
    if ((Router as unknown as IRouter).__instance) {
      return (Router as unknown as IRouter).__instance;
    }
    (Router as unknown as IRouter).__instance = this;
  }

  use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const currentTarget = event.currentTarget as Window;
      this._onRoute(currentTarget.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }
    this.currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}
export default Router;
