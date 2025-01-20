import Block from "./Block";

export interface IBlockProps {
  events?: Record<string, (event: unknown) => void>;
  [key: string]: unknown;
  children?: Record<string, Block<IBlockProps>>;
  settings?: {
    withInternalID: boolean;
  }
}

export interface IBlockMeta {
  tagName: string;
  props: IBlockProps;
}
