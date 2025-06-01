import { ReactElement } from "react"

interface sidebarprops{
    text : string,
    icon : ReactElement,
    onClick? :() => void
}

export function SidebarItem(props : sidebarprops){
    return(
        <div>
            <div onClick={props.onClick} className="flex justify-start gap-x-5">
                {props.icon}
                {props.text}
            </div>
        </div>
    )
}