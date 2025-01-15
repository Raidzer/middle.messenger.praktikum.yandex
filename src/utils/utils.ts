import Block from "../models/Block/Block";
import { IBlockProps } from "../models/Block/IBlock";

function render(query: string, blocks: Block<IBlockProps>[]) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  blocks.forEach((block: Block<IBlockProps>) => {
    const content = block.getContent();
    if (content) {
      root.appendChild(content);
    }
  })
  return root;
}

export default render;
