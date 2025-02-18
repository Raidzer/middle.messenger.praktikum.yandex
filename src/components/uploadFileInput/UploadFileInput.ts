import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import uploadFileInput from "./uploadFileInput.hbs?raw";
import "./uploadFileInput.css";

class UploadFileInput extends Block<IBlockProps> {
  private _file: File | null = null;
  private _fileName: string = "Выберите аватар";

  constructor(props: IBlockProps) {
    super(props);
  }

  get value(): File | null {
    return this._file;
  }

  private _handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this._file = file;
      this._fileName = file.name;
      this.setProps({ fileName: this._fileName });
    }
  }

  init(): void {
    this.props.events = {
      ...this.props.events,
      change: {
        cb: this._handleFileChange.bind(this),
      },
    };
  }

  render(): DocumentFragment {
    const fileName = this._fileName;

    if (!fileName) {
      this._fileName = "Выберите аватар";
    }

    return this.compile(uploadFileInput, {
      ...this.props,
      fileName: this._fileName,
    });
  }
}

export default UploadFileInput;
