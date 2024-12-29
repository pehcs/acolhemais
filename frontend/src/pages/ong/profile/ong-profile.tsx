import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {FiEdit} from "react-icons/fi";
import {IoHomeOutline, IoSettingsOutline} from "react-icons/io5";
import {MdArrowForwardIos} from "react-icons/md";
import {FaInstagram} from "react-icons/fa";


export default function OngProfile() {
    return (
        <main>
            <header className="bg-[url(/images/circle.svg)] w-full h-52 bg-no-repeat bg-contain">
                <div className="w-full flex justify-between items-center p-2">
                    <Button>
                        <IoSettingsOutline className="h-6 w-6"/>
                    </Button>
                    <img className="h-20 w-20" src="/images/logo-white.svg" alt={"Logo acolhe+"}/>
                    <Button>
                        <FiEdit className="h-6 w-6"/>
                    </Button>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Avatar className="w-24 h-24 mt-2 border-2 border-[#2F49F3]">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                    </Avatar>
                </div>
            </header>
            <main className="px-4">
                <header>
                    <div className="mt-2 flex flex-col items-center justify-center w-full">
                        <h2 className="font-semibold text-[#19191B]">
                            ONG Saluz
                        </h2>
                        <p className="text-xs">
                            Recife, PE
                        </p>
                    </div>
                    <div className="p-2 flex items-center justify-center flex-wrap py-6 gap-2">
                        <div
                            className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                        >
                            Crianças
                        </div>
                        <div
                            className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                        >
                            Crianças
                        </div>
                    </div>
                </header>
                <div className="overflow-scroll pb-20">
                    <article>
                        <h3 className="mb-2 font-medium">SOBRE</h3>
                        <p className="overflow-scroll text-sm ">
                            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation
                            exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut.
                            Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya
                            charming
                            Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat
                            discerning.
                        </p>
                        <div className="flex items-center justify-start w-full overflow-scroll py-4 gap-3">
                            <img className="h-42 w-52 rounded-xl" src={"/images/Wombat-Habitats.jpg"}/>
                            <img className="h-42 w-52 rounded-xl" src={"/images/Wombat-Habitats.jpg"}/>
                            <img className="h-42 w-52 rounded-xl" src={"/images/Wombat-Habitats.jpg"}/>
                        </div>
                        <Button className="mt-2 px-6">
                            Eventos e ações <MdArrowForwardIos className="ml-6 h-4 w-4"/>
                        </Button>
                    </article>
                    <article className="mt-8 flex flex-col items-start justify-start w-full">
                        <h3 className="mb-2 font-medium">CONTATO</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <IoHomeOutline className="h-4 w-4"/> www.saluz.com.br
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FaInstagram className="h-4 w-4"/> Saluz
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <IoHomeOutline className="h-4 w-4"/> www.saluz.com.br
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FaInstagram className="h-4 w-4"/> Saluz
                            </div>
                        </div>
                    </article>
                </div>
            </main>
        </main>
    )
}