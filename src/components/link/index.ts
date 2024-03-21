import './link.scss';
import { Block } from '@/shared/utils/block';
import { template } from './link';

export class Link extends Block {
  override render() {
    return this.compile(template);
  }
}
