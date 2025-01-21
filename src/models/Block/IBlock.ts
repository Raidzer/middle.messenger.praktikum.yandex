export interface IBlockProps {
  events?: Record<string, (event: unknown) => void>;
  [key: string]: unknown;
  settings?: {
    withInternalID: boolean;
  }
}

export interface IBlockMeta {
  tagName: string;
  props: IBlockProps;
}
