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
  root.innerHTML = "";

  blocks.forEach((block: Block<T>) => {
    const content = block.getContent();
    if (content) {
      root.appendChild(content);
    }
  });
  return root;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function getAvatarUrl(path: string): string {
  if (!path) {
    return "";
  }
  const baseUrl = "https://ya-praktikum.tech/api/v2/resources";
  return baseUrl + path;
}

export function omit<T extends object>(obj: T, fields: (keyof T)[]) {
  const result: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (!fields.includes(key as keyof T)) {
      result[key] = value;
    }
  });

  return result;
}

export function classNames(...args: unknown[]): string {
  const resultClass: string[] = [];
  args.forEach((arg) => {
    if (Array.isArray(arg)) {
      resultClass.push(classNames(...arg));
    } else if (typeof arg === "string") {
      resultClass.push(arg);
    } else if (typeof arg === "object" && arg !== null && arg !== undefined) {
      resultClass.push(
        Object.entries(arg)
          .reduce((acc, [key, value]) => {
            if (value) {
              acc.push(key as never);
            }
            return acc;
          }, [])
          .join(" ")
      );
    } else if (typeof arg === "number" && arg > 0) {
      resultClass.push(`${arg}`);
    }
  });

  return resultClass.join(" ");
}
