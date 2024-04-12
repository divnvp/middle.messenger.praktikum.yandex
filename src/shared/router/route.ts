import Block from '@/shared/utils/block';
import isEquals from '@/shared/utils/custom-utils/is-equals';
import { PlainObject } from '@/shared/models/plain-object.type';

class Route {
  private readonly blockClass!: typeof Block;
  private pathName?: string;
  private readonly query!: string;
  private block: Block | null = null;

  constructor(pathName: string, componentClass: typeof Block, query: string) {
    this.pathName = pathName;
    this.blockClass = componentClass;
    this.query = query;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathName = pathname;
      this.render();
    }
  }

  getPath(): string {
    return <string>this.pathName;
  }

  leave() {
    if (this.block) {
      this.block = null;
    }
  }

  match(pathname: string) {
    return isEquals(pathname as unknown as PlainObject, this.pathName as unknown as PlainObject);
  }

  render() {
    const root = document.querySelector(this.query);

    if (!this.block) {
      this.block = new this.blockClass({});

      if (root) {
        root.innerHTML = '';
        root.append(this.block.getContent()!);
        return root;
      }

      return null;
    }
    return null;
  }
}

export default Route;
