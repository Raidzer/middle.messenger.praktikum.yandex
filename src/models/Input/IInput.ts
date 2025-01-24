import { InputType } from "zlib";
import { IBlockProps } from "../Block/IBlock";

interface IValidate {
  rule: RegExp;
  errorMessage: string;
}

export default interface IInputProps extends IBlockProps {
  name?: string;
  type?: InputType;
  placeholder?: string;
  validate?: IValidate;
  value?: string;
  infoName?: string;
  isEditable?: boolean;
  infoData?: string;
}
