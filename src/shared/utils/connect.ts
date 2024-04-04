import store, { StoreEvents } from '@/shared/storage/store';
import { Block } from '@/shared/utils/block';
import { isEquals } from '@/shared/utils/custom-utils/is-equals';
import { IState } from '@/shared/models/state.interface';

export function connect(mapStateToProps: (state: IState) => IState) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: NonNullable<unknown>) {
        let state = mapStateToProps(store.getState());

        super('', { ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEquals(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}
