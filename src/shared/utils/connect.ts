import store, { StoreEvents } from '@/shared/storage/store';
import Block from '@/shared/utils/block';
import isEquals from '@/shared/utils/custom-utils/is-equals';
import { IState } from '@/shared/models/state.interface';
import { PlainObject } from '@/shared/models/plain-object.type';

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
