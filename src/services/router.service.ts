class RouterService {
  private _routes: Route[];
  
  private set routes(value: Route[]) {
    this._routes = value;
  }

  private get routes() {
    return this._routes;
  }

  private backPageEvent(props?: object) {
    return new CustomEvent('backpage', {
      detail: { props }
    });
  }

  private changePageEvent(id: string, props?: object) {
    const route = this.routes.find(r => r.id === id);
    return new CustomEvent('changepage', {
      detail: {
        ...route,
        props
      }
    });
  }
  
  private replacePageEvent(id: string, props?: object) {
    const route = this.routes.find(r => r.id === id);
    return new CustomEvent('replacepage', {
      detail: {
        ...route,
        props,
        replace: true
      }
    });
  }

  public register(routes: Route[]) {
    this.routes = routes;
  }

  public get home() {
    const home = this.routes.find(r => r.home);
    return home || this.routes[0];
  }

  public to = (id: string, props?: object) => {
    window.dispatchEvent(this.changePageEvent(id, props));
  };

  public replace = (id: string, props?: object) => {
    window.dispatchEvent(this.replacePageEvent(id, props));
  };

  public back = (props?: object) => window.dispatchEvent(this.backPageEvent(props));
}

export const router = new RouterService();
