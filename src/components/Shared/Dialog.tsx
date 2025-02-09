import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
interface Props<T> {
    children: React.ReactNode,
    title: string,
    desc: string,
    callback: (...args: unknown[]) => T,
}
const Dialog = <T,>({ children, title, desc, callback }: Props<T>) => {
    return <>
        <AlertDialog >
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{desc}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#DB4444] text-white" onClick={() => callback()}> Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog></>
}
Dialog.displayName = "Dialog"
export default React.memo(Dialog) as <T, >(props: Props<T>) => React.JSX.Element