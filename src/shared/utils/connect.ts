import store, { StoreEvents } from '@/shared/storage/store';
import { Block } from '@/shared/utils/block';
import { IState } from '@/shared/models/state.interface';

export function connect(Component: typeof Block, mapStateToProps: (state: IState) => IState) {
  return class extends Component {
    constructor(props: NonNullable<unknown>) {
      super('', { ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => this.setProps({ ...mapStateToProps(store.getState()) }));
    }
  };
}
