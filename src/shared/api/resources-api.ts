import HTTPTransport from '@/shared/services/http';
import { IResourcesApi } from '@/shared/models/api/resources-api.interface';

const resourcesAPIInstance = new HTTPTransport('/resources');

export class ResourcesAPI implements IResourcesApi {
  request(data: unknown) {
    return resourcesAPIInstance.get(`/profile${data}`);
  }
}
