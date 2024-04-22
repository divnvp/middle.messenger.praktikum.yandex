import store, { StoreEvents } from '../storage/store';
import Block from '../utils/block';
import isEquals from '../utils/custom-utils/is-equals';
import { IState } from '../models/state.interface';
import { PlainObject } from '../models/plain-object.type';

export const connect = (mapStateToProps: (state: IState) => object) => (Comp: typeof Block) => {
  const oldState = mapStateToProps(store.getState());
  return class extends Comp {
    constructor(props: object) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEquals(oldState as PlainObject, newState as PlainObject)) {
          this.setProps({ ...mapStateToProps(store.getState()) });
        }
      });
    }
  };
};
