import Sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './http';

describe('HTTP Transport', () => {
  const xhr = Sinon.useFakeXMLHttpRequest();
  const http = new HTTPTransport('/chats');
  let fakeRequests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      fakeRequests.push(request);
    };
  });

  afterEach(() => {
    fakeRequests = [];
  });

  it('Content-Type в headers должен быть равен application/json', () => {
    http.post('', { title: '' });
    expect(fakeRequests[0].requestHeaders['Content-Type']).to.include('application/json');
  });

  it('Параметр responseType должен быть равен json', () => {
    http.post('', { title: '' });
    expect((fakeRequests[0] as unknown as { responseType: '' }).responseType).to.include('json');
  });

  it('Метод GET должен отправлять GET-запрос', () => {
    http.get('/user');
    expect(fakeRequests[0].method).to.eq('GET');
  });

  it('Метод GET должен отправлять GET-запрос c query-параметрами', () => {
    http.get('/user', { a: '1', b: '2' });
    expect(fakeRequests[0].url).to.include('?a=1&b=2');
  });

  it('Метод PUT должен отправлять PUT-запрос', () => {
    http.put('/users', { users: ['1'], chatId: 0 });
    expect(fakeRequests[0].method).to.eq('PUT');
  });

  it('Метод PUT должен формировать requestBody с заданными параметрами', () => {
    http.put('/users', { users: ['1'], chatId: 0 });
    expect(fakeRequests[0].requestBody).to.eq(JSON.stringify({ users: ['1'], chatId: 0 }));
  });

  it('Метод POST должен отправлять POST-запрос', () => {
    http.post('', { title: '' });
    expect(fakeRequests[0].method).to.eq('POST');
  });

  it('Метод POST должен формировать requestBody с заданными параметрами', () => {
    http.post('', { title: 'a' });
    expect(fakeRequests[0].requestBody).to.eq(JSON.stringify({ title: 'a' }));
  });

  it('Метод DELETE должен отправлять DELETE-запрос', () => {
    http.delete('/users', { users: ['1'], chatId: 0 });
    expect(fakeRequests[0].method).to.eq('DELETE');
  });
});
