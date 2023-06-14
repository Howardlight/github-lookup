import * as React from "react";
import { SvgIconConstituentValues } from "@/types";

export interface SvgIcon extends React.FC<SvgIconConstituentValues> { }


const MessageQuestion: SvgIcon = (props): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill={props.fillColor}
        stroke={props.strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="icon icon-tabler icon-tabler-message-question"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M8 9h8M8 13h6M14 18h-1l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4.5M19 22v.01M19 19a2.003 2.003 0 0 0 .914-3.782 1.98 1.98 0 0 0-2.414.483" />
    </svg>
)
export default MessageQuestion;