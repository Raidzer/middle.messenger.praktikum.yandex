export interface IBlockProps<TEvents = HTMLElementEventMap> {
  events?: {
    [K in keyof TEvents]?: (event: TEvents[K]) => void;
  };
  [key: string]: unknown;
  settings?: {
    withInternalID: boolean;
  };
}

export interface IBlockMeta {
  tagName: string;
  props: IBlockProps;
}
