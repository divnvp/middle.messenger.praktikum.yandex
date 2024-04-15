import Block from '@/shared/utils/block';
import Route from '@/shared/router/route';
import { RouteOrNull } from '@/shared/models/types';
import { Routes } from '@/shared/const/routes';

const APP_QUERY = '#app';

class Router {
  private static __instance: Router;

  private _currentRoute: RouteOrNull = null;
  private routes: Route[] = [];
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    Router.__instance = this;
  }

  get currentRoute() {
    return window.location.pathname;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const currentTarget = event.currentTarget as Window;
      this.onRoute(currentTarget.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private onRoute = (pathname: string) => {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  };

  private getRoute = (pathname: string) => {
    const route = this.routes.find(route => route.match(pathname));

    if (route) {
      return route;
    }

    return this.onErrorPage();
  };

  private onErrorPage() {
    this.go(Routes.Error400);
    return this.routes.find(el => el.match(Routes.Error400));
  }
}
export default new Router(APP_QUERY);
