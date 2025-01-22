export interface IBlockProps<TEvents = HTMLElementEventMap> {
  events?: {
    [K in keyof TEvents]?: {
      cb: (event: TEvents[K]) => void;
      option?: boolean;
    };
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
