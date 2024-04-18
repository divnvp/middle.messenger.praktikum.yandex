import Block from './block';
import { expect } from 'chai';
import { findDeep } from './custom-utils/find-deep';
import sinon from 'sinon';
import { TProp } from '../models/prop.type';

describe('Компонент', () => {
  let block: Block<TProp>;

  it('Компонент должен инициализироваться с заданными свойствами', () => {
    block = new Block<TProp>({
      events: {
        onClick: () => {}
      }
    });
    expect(!!findDeep(block.props, 'events.onClick')).to.eq(true);
  });

  it('Обновление свойств компонента должно обновлять первоначальные свойства', () => {
    block.setProps({
      events: {
        onBlur: () => {}
      }
    });
    expect(!!findDeep(block.props, 'events.onBlur')).to.eq(true);
  });

  it('Обновление свойств компонента должно запускать хук componentDidUpdate', () => {
    const spyFunc = sinon.spy(block, 'componentDidUpdate');
    block.setProps({
      events: {
        onBlur: () => {}
      }
    });
    expect(spyFunc.calledOnce).to.eq(true);
  });
});
