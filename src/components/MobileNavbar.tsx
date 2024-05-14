'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "../../constants"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"

const MobileNavbar = () => {
    const pathname = usePathname();
    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="menu"
                        width={30}
                        height={30}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side='left' className="border-none bg-white">
                    <Link href="/" className="flex cursor-pointer items-center gap-1 px-4">
                        <Image
                            src="/icons/logo.svg"
                            alt="jb-bank logo"
                            height={34}
                            width={34}
                        />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Jb Bank</h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">

                                {sidebarLinks.map((ele, i) => {
                                    const isActive = pathname === ele.route || pathname.startsWith(`${ele.route}/`)
                                    return (
                                        <SheetClose asChild key={ele.route}>
                                            <Link href={ele.route} className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}>
                                                <Image src={ele.imgURL} alt={ele.label} className={cn({ 'brightness-[3] invert-0': isActive })} height={20} width={20} />
                                                <p className={cn('text-16 font-semibold text-black-2 ', { 'text-white': isActive })}>{ele.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNavbar