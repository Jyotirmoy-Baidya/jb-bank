'use client'
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "../../constants"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname();
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
                    <Image
                        src="/icons/logo.svg"
                        alt="jb-bank logo"
                        height={34}
                        width={34}
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">Jb Bank</h1>
                </Link>

                {sidebarLinks.map((ele, i) => {
                    const isActive = pathname === ele.route || pathname.startsWith(`${ele.route}/`)
                    return (
                        <Link href={ele.route} key={i} className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}>
                            <div className="relative size-6">
                                <Image src={ele.imgURL} alt={ele.label} fill className={cn({ 'brightness-[3] invert-0': isActive })} />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>{ele.label}</p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}

export default Sidebar