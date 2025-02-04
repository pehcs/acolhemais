import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {TbLogout2} from "react-icons/tb";
import {CiSearch} from "react-icons/ci";
import {IoLocationOutline} from "react-icons/io5";
import {useQuery} from "react-query";
import {Ong} from "@/pages/ong/@types/Ong.ts";
import {api, serverURI} from "@/utils/api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {CgProfile} from "react-icons/cg";

export default function HomePage() {
    const navigate = useNavigate()
    const ongQuery = useQuery(
        {
            queryKey: "ong_list",
            queryFn: async (): Ong[] => {
                const {data} = await api.get<Ong>(`/v1/ong/`);
                console.log(data);
                return data
            }
        })
    const {data: ongList} = ongQuery
    const [searchTerm, setSearchTerm] = useState("");
    const filteredOngs = ongList?.filter(ong =>
        ong.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const ongId = localStorage.getItem("ongId");
    if (ongQuery.isLoading) {
        return (
            <>
                <Skeleton className="h-24 w-full"/>
                <Skeleton className="h-12 w-[90%] rounded-full mx-4 my-4"/>
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4"/>
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4"/>
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4"/>
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4"/>
            </>
        )
    }
    return (
        <>
            <header className="w-full h-20 bg-[#2F49F3] bg-contain">
                <div className={`${ongId ? "w-full " : "w-2/3 "} flex justify-between items-center p-2`}>
                    <Button onClick={() => navigate(`/login`)}>
                        <TbLogout2 className="h-6 w-6"/>
                    </Button>
                    <img className={`h-20 w-20 ${!ongId && "mr-4 "}`} src="/images/logo-white.svg"
                         alt={"Logo acolhe+"}/>
                    {
                        ongId && (
                            <Button onClick={() => navigate(`/ong/admin/${ongId}`)}>
                                <CgProfile className="h-6 w-6"/>
                            </Button>
                        )
                    }
                </div>
            </header>
            <main className={"p-4"}>
                <section className={"flex gap-2"}>
                    <Input
                        className="rounded-full px-4 py-2 border border-gray-300"
                        placeholder="Pesquise"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button className={"h-8 w-12"}><CiSearch className={"h-6 w-6"}/></Button>
                </section>
                {
                    ongList.length === 0 && (
                        <p className={"text-[#61646B] w-full text-center py-4"}>Não há ONGs disponíveis</p>
                    )
                }
                {
                    filteredOngs.map((ong: Ong, key) => (
                        <article className={"py-4"} onClick={() => {
                            if (localStorage.getItem("ongId") === ong.id) {
                                navigate(`/ong/admin/${ong.id}`)
                            } else {
                                navigate(`/ong/${ong.id}`)
                            }
                        }}>
                            <article className={"flex flex-col gap-2 p-3 border border-[#EFEFF0] rounded-xl"}>
                                {
                                    ong?.images.length > 0 && (
                                        <img key={key} className="h-32 w-full max-h-32 rounded-xl"
                                             src={serverURI + `/v1/ong-image/${ong.images[0]}`}/>
                                    )
                                }
                                <h3 className={"text-sm font-medium"}>{ong.nome}</h3>
                                <div className={"flex gap-1 items-center"}>
                                    <IoLocationOutline className={"text-[#61646B]"}/>
                                    <span className={"text-sm text-[#61646B]"}>{ong.endereco}</span>
                                </div>
                                <p className={"text-sm py-4 max-h-16 overflow-y-scroll"}>
                                    {ong.descricao}
                                </p>
                                <div
                                    className={"flex gap-1 items-center max-h-12 overflow-x-scroll overflow-y-hidden"}>
                                    {
                                        ong?.publico_alvo.map((p, key) => (
                                            <div key={key}
                                                 className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                            >
                                                {p.tipo}
                                            </div>
                                        ))
                                    }
                                    {
                                        ong?.necessidades.map((p, key) => (
                                            <div key={key}
                                                 className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                            >
                                                {p.tipo}
                                            </div>
                                        ))
                                    }
                                </div>
                            </article>
                        </article>
                    ))
                }

            </main>
        </>
    )
}