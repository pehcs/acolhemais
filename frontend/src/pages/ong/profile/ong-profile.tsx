import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {FiEdit} from "react-icons/fi";
import {IoHomeOutline, IoSettingsOutline} from "react-icons/io5";
import {MdArrowForwardIos} from "react-icons/md";
import {FaInstagram} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import api from "@/utils/api.ts";
import {Ong} from "@/pages/ong/@types/Ong.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export default function OngProfile() {

    const [address, setAddress] = useState("");
    const {id} = useParams()

    const ongQuery = useQuery(
        {
            queryKey: "ong_profile",
            queryFn: async (): Ong => {
                const {data} = await api.get<Ong>(`/v1/ong/${id}`);
                return data
            },
            onSuccess: async (data: Ong) => {
                const reverseGeoResponse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${data.localizacao.latitude}&lon=${data.localizacao.longitude}&format=jsonv2`
                );
                const reverseGeoData = await reverseGeoResponse.json();
                const address = `${reverseGeoData.address.suburb}, ${reverseGeoData.address.city} - ${reverseGeoData.address.state}` || "Endereço não encontrado";
                setAddress(address);
            }
        })

    const {data: ongData} = ongQuery
    console.log(ongData)
    if (ongQuery.isLoading) {
        return (
            <>
                <div className="mt-24 flex w-full flex-col justify-center items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full"/>
                    <Skeleton className="h-6 w-36 "/>
                    <Skeleton className="h-4 w-28 "/>
                    <div className="mt-8 flex gap-4">
                        <Skeleton className="h-8 w-24 rounded-full"/>
                        <Skeleton className="h-8 w-24 rounded-full"/>
                        <Skeleton className="h-8 w-24 rounded-full"/>
                    </div>
                </div>
                <div className="py-4 px-4 mt-6">
                    <Skeleton className="w-full h-36 rounded-xl"/>
                    <div className="flex gap-4 py-4">
                        <Skeleton className="w-32 h-24 rounded-xl"/>
                        <Skeleton className="w-32 h-24 rounded-xl"/>
                        <Skeleton className="w-32 h-24 rounded-xl"/>
                    </div>
                    <Skeleton className="w-36 h-12 rounded-full"/>
                </div>
                <div className="mt-10 flex flex-col content-start items-start gap-4 px-4">
                    <Skeleton className="h-6 w-36 "/>
                    <Skeleton className="h-4 w-28 "/>
                    <Skeleton className="h-4 w-28 "/>
                </div>
            </>
        )
    }

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
                            {ongData?.nome}
                        </h2>
                        <p className="text-xs">
                            {address ? address : (
                                <AiOutlineLoading3Quarters className="animate-spin"/>
                            )}
                        </p>
                    </div>
                    <div className="p-2 flex items-center justify-center flex-wrap py-6 gap-2">
                        {
                            ongData?.publico_alvo.map((p, key) => (
                                <div key={key}
                                     className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                >
                                    {p.tipo}
                                </div>
                            ))
                        }
                        {
                            ongData?.necessidades.map((p, key) => (
                                <div key={key}
                                     className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                >
                                    {p.tipo}
                                </div>
                            ))
                        }
                    </div>
                </header>
                <div className="overflow-scroll pb-20">
                    <article>
                        <h3 className="mb-2 font-medium">SOBRE</h3>
                        <p className="overflow-scroll text-sm ">
                            {ongData.descricao}
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