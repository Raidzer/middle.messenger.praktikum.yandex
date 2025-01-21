import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import userSearchList from "./userSearchList.hbs?raw";
import "./userSearchList.css"


export class UserSearchList extends Block<IBlockProps> {
    constructor(props: IBlockProps) {
        super(props);
    }

    render(): DocumentFragment {
        return this.compile(userSearchList, this.props)
    }
}