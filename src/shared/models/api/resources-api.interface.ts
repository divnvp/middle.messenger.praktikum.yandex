export interface IResourcesApi {
  request: (data: unknown) => Promise<XMLHttpRequest>;
}
