import Block from "../models/Block/Block";
import { IBlockProps } from "../models/Block/IBlock";

export function render<T extends IBlockProps>(
  query: string,
  blocks: Block<T>[]
) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  blocks.forEach((block: Block<T>) => {
    const content = block.getContent();
    if (content) {
      root.appendChild(content);
    }
  });
  return root;
}

type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Indexed
  );
  return merge(object as Indexed, result);
}
