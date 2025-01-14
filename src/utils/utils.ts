function render(query: string, block: any) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  root.appendChild(block.getContent());
  return root;
}

export default render;
