import { Block } from '@/shared/utils/block';
import { isEquals } from '@/shared/utils/custom-utils/is-equals';
import { RouteProp } from '@/shared/models/prop.interface';

class Route {
  private readonly blockClass: typeof Block;
  private pathname: string;
  private block: Block | null = null;
  private props: RouteProp;

  constructor(pathname: string, view: typeof Block, props: RouteProp) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  getPath(): string {
    return this.pathname;
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEquals(pathname, this.pathname);
  }

  render(): void {
    const root = document.querySelector(this.props.rootQuery);
    if (root) {
      root.innerHTML = '';
      this.block = new this.blockClass();
      this.block!.dispatchComponentDidMount();
      root.append(this.block!.getElement() as string | Node);
    }
  }
}

export default Route;
