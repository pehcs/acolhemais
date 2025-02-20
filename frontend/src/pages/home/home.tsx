import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "react-query";
import { Ong } from "@/pages/ong/@types/Ong.ts";
import { api, serverURI } from "@/utils/api.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { CgProfile } from "react-icons/cg";
import { CardX } from "@/components/ui/cardX";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"


export default function HomePage() {
    const navigate = useNavigate()
    const ongQuery = useQuery(
        {
            queryKey: "ong_list",
            queryFn: async (): Ong[] => {
                const { data } = await api.get<Ong>(`/v1/ong/`);
                console.log(data);
                return data
            }
        })
    const { data: ongList } = ongQuery
    const [searchTerm, setSearchTerm] = useState("");
    const filteredOngs = ongList?.filter(ong =>
        ong.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const ongId = localStorage.getItem("ongId");
    if (ongQuery.isLoading) {
        return (
            <>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-[90%] rounded-full mx-4 my-4" />
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4" />
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4" />
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4" />
                <Skeleton className="h-36 w-[90%] rounded-xl mx-4 my-4" />
            </>
        )
    }
    return (
        <>
            <header className="w-full h-20 bg-[#2F49F3] bg-contain">
                <div className={`${ongId ? "w-full " : "w-2/3 "} flex justify-between items-center p-2`}>
                    <Button onClick={() => navigate(`/login`)}>
                        <TbLogout2 className="h-6 w-6" />
                    </Button>
                    <img className={`h-20 w-20 ${!ongId && "mr-4 "}`} src="/images/logo-white.svg"
                        alt={"Logo acolhe+"} />
                    {
                        ongId && (
                            <Button onClick={() => navigate(`/ong/admin/${ongId}`)}>
                                <CgProfile className="h-6 w-6" />
                            </Button>
                        )
                    }
                </div>
            </header>

            <main className={"p-4"}>

                <div className="flex w-full">
                    <Tabs defaultValue="ONGs" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="ONGs">ONGs</TabsTrigger>
                            <TabsTrigger value="Ações e Eventos">Ações e Eventos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="ONGs">
                            <section className={"flex gap-2"}>
                                <Input
                                    className="rounded-full px-4 py-2 border border-gray-300"
                                    placeholder="Pesquise"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className={"h-8 w-12"}><CiSearch className={"h-6 w-6"} /></Button>
                            </section>



                        </TabsContent>

                        <TabsContent value="Ações e Eventos">
                            <section className={"flex gap-2"}>
                                <Input
                                    className="rounded-full px-4 py-2 border border-gray-300"
                                    placeholder="Pesquise"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className={"h-8 w-12"}><CiSearch className={"h-6 w-6"} /></Button>
                            </section>



                        </TabsContent>
                    </Tabs>
                </div>


                {
                    ongList.length === 0 && (
                        <p className={"text-[#61646B] w-full text-center py-4"}>Não há ONGs disponíveis</p>
                    )
                }
                {
                    filteredOngs?.map((ong: Ong, key) => (
                        <div
                            key={key}
                            className={"py-4"}
                            onClick={() => {
                                if (localStorage.getItem("ongId") === ong.id) {
                                    navigate(`/ong/admin/${ong.id}`);
                                } else {
                                    navigate(`/ong/${ong.id}`);
                                }
                            }}
                        >
                            <CardX
                                image={ong.images?.length > 0 ? `${serverURI}/v1/ong-image/${ong.images[0]}` : undefined}
                                nome={ong.nome}
                                endereco={ong.endereco}
                                descricao={ong.descricao}
                                publicoAlvo={ong.publico_alvo?.map((p) => p.tipo) || []}
                                necessidades={ong.necessidades?.map((n) => n.tipo) || []}
                            />
                        </div>
                    ))
                }

            </main>
        </>
    )
}