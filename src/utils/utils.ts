import Block from "../models/Block/Block";
import { IBlockProps } from "../models/Block/IBlock";

function render<T extends IBlockProps>(query: string, blocks: Block<T>[]) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  blocks.forEach((block: Block<T>) => {
    const content = block.getContent();
    if (content) {
      root.appendChild(content);
    }
  })
  return root;
}

export default render;
