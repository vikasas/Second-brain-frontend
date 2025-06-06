import { ReactElement } from "react"

interface sidebarprops{
    text : string,
    icon : ReactElement,
    onClick? :() => void
}

export function SidebarItem(props : sidebarprops){
    return(
        <div>
            <div onClick={props.onClick} className="flex text-black font-normal dark:text-white justify-start gap-x-5">
                <span className="dark:fill-white">{props.icon}</span>
                <span className="text-black dark:text-white">{props.text}</span>
            </div>
        </div>
    )
}