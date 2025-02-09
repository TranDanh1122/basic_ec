import React from "react"
import { Slash } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
const BreadcrumbCPN = React.memo(({ items }: { items: { name: string, link: string }[] }) => {
    return <>
        <Breadcrumb className="pt-20 pb-12">
            <BreadcrumbList>
                {
                    items.map((el: Record<string, string>, index: number) => (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={el.link}>{el.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {index + 1 !== items.length && (
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                            )}
                        </>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    </>
})
BreadcrumbCPN.displayName = "BreadcrumbCPN"
export default BreadcrumbCPN