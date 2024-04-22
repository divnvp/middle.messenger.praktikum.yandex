import Block from '../utils/block';
import { expect } from 'chai';
import Router from './router';
import sinon from 'sinon';

describe('Роутер', () => {
  const mock: typeof Block = class {
    getContent = sinon.fake(() => document.createElement('div'));
  } as unknown as typeof Block;

  it('Проверяем создание корректного инстанса роута', () => {
    const routerInstance = Router.use('/', mock);
    expect(routerInstance).to.eq(Router);
  });

  it('Проверяем корректное создание страницы на старте роутера', () => {
    Router.use('/', mock).start();
    expect(window.history.length).to.eq(1);
  });

  it('Проверяем корректное возвращение назад', () => {
    Router.use('/', mock).start();
    Router.back();
    expect(window.history.length).to.eq(1);
  });

  it('Проверяем корректное возвращение вперед', () => {
    Router.use('/', mock).start();
    Router.forward();
    expect(window.history.length).to.eq(1);
  });

  it('Проверяем корректное изменение URL при переходе по страницам', () => {
    Router.use('/profile', mock);
    Router.go('/profile');
    expect(window.location.pathname).to.eq('/profile');
  });

  it('Проверяем вывод корректного пути при взятии текущего роута', () => {
    Router.use('/profile', mock);
    expect(Router.currentRoute).to.eq('/profile');
  });
});
