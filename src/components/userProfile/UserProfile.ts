import Block from "../../models/Block/Block"
import { IBlockProps } from "../../models/Block/IBlock"
import "./userProfile.css"
import userProfile from "./userProfile.hbs"

export class UserProfile extends Block<IBlockProps> {
    constructor(props: IBlockProps) {
        super("div", props);
    }

    render(): string {
        const element = userProfile(this.props);

        return element;
    }
}