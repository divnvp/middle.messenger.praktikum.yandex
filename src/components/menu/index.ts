import './menu.scss';
import { Block } from '@/shared/utils/block';
import menuTemplate from '@/components/menu/menu';

export class Menu extends Block {
  override render() {
    return this.compile(menuTemplate);
  }
}
