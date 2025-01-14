export interface IBlockProps {
  events?: Record<string, (event: unknown) => void>;
  [key: string]: unknown;
}

export interface IBlockMeta {
  tagName: string;
  props: IBlockProps;
}
