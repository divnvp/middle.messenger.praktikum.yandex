export interface IProp {
  events?: Record<string, EventListener>;
  attributes?: Record<string, string>;
  [key: string | symbol]: unknown;
}

export interface RouteProp {
  rootQuery: string;
}
