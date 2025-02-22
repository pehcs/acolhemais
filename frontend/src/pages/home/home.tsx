import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useQuery } from "react-query";
import { Ong } from "@/pages/ong/@types/Ong.ts";
import { api, serverURI } from "@/utils/api.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CardX } from "@/components/ui/cardX";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { SearchAndFilters } from "@/components/SearchAndFilters.tsx";

export default function HomePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [causePosition, setCausePosition] = useState("");
    const [regionPosition, setRegionPosition] = useState("");
    const [sortPosition, setSortPosition] = useState("");

 
    const ongQuery = useQuery({
        queryKey: "ong_list",
        queryFn: async (): Promise<Ong[]> => {
            const { data } = await api.get<Ong[]>("/v1/ong/");
            console.log(data);
            return data;
        },
    });

    const { data: ongList } = ongQuery;
    const filteredOngs = ongList?.filter((ong) =>
        ong.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const ongId = localStorage.getItem("ongId");

    // funções para GARANTIR que tem apenas um filtro ativo
    const handleCauseChange = (value: string) => {
        setCausePosition(value);
        setRegionPosition("");
        setSortPosition("");
    };

    const handleRegionChange = (value: string) => {
        setRegionPosition(value);
        setCausePosition("");
        setSortPosition("");
    };

    const handleSortChange = (value: string) => {
        setSortPosition(value);
        setCausePosition("");
        setRegionPosition("");
    };

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
        );
    }

    return (
        <>
            <header className="w-full h-20 bg-[#2F49F3] bg-contain">
                <div className={`${ongId ? "w-full " : "w-2/3 "} flex justify-between items-center p-2`}>
                    <Button onClick={() => navigate("/login")}>
                        <TbLogout2 className="h-6 w-6" />
                    </Button>
                    <img
                        className={`h-20 w-20 ${!ongId && "mr-4 "}`}
                        src="/images/logo-white.svg"
                        alt={"Logo acolhe+"}
                    />
                    {ongId && (
                        <Button onClick={() => navigate(`/ong/admin/${ongId}`)}>
                            <CgProfile className="h-6 w-6" />
                        </Button>
                    )}
                </div>
            </header>

            <main className={"p-4 max-w-screen"}>
                <div className="flex -mt-2">
                    <Tabs defaultValue="ONGs" className="w-full bg-white">
                        <TabsList>
                            <TabsTrigger value="ONGs">ONGs</TabsTrigger>
                            <TabsTrigger value="Ações e Eventos">Ações e Eventos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="ONGs">
                            <SearchAndFilters
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                causePosition={causePosition}
                                onCauseChange={handleCauseChange}
                                regionPosition={regionPosition}
                                onRegionChange={handleRegionChange}
                                sortPosition={sortPosition}
                                onSortChange={handleSortChange}
                            />

                            {ongList?.length === 0 && (
                                <p className={"text-[#61646B] w-full text-center py-4"}>
                                    Não há ONGs disponíveis
                                </p>
                            )}

                            {filteredOngs?.map((ong: Ong, key) => (
                                <div
                                    key={key}
                                    className={"pt-4"}
                                    onClick={() => {
                                        if (localStorage.getItem("ongId") === ong.id) {
                                            navigate(`/ong/admin/${ong.id}`);
                                        } else {
                                            navigate(`/ong/${ong.id}`);
                                        }
                                    }}
                                >
                                    <CardX
                                        image={
                                            ong.images?.length > 0
                                                ? `${serverURI}/v1/ong-image/${ong.images[0]}`
                                                : undefined
                                        }
                                        nome={ong.nome}
                                        endereco={ong.endereco}
                                        descricao={ong.descricao}
                                        publicoAlvo={ong.publico_alvo?.map((p) => p.tipo) || []}
                                        necessidades={ong.necessidades?.map((n) => n.tipo) || []}
                                    />
                                </div>
                            ))}
                        </TabsContent>

                        <TabsContent value="Ações e Eventos">
                            <SearchAndFilters
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                causePosition={causePosition}
                                onCauseChange={handleCauseChange}
                                regionPosition={regionPosition}
                                onRegionChange={handleRegionChange}
                                sortPosition={sortPosition}
                                onSortChange={handleSortChange}
                            />

                            {/* LISTA DE AÇÕES E EVENTOS VEM AQUI */}
                            <p className={"text-[#61646B] w-full text-center py-4"}>
                                Ações e Eventos serão exibidos aqui.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    );
}