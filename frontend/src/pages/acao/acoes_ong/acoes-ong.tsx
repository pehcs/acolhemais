import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api, serverURI } from "@/utils/api.ts";
import { Ong } from "@/pages/ong/@types/Ong.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { FiPlusSquare } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { CardX } from "@/components/ui/cardX";


export default function AcoesOng() {

    const [logoURL, setLogoURL] = useState<string>('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Consulta para o perfil da ONG
    const ongQuery = useQuery(
        {
            queryKey: ["ong_profile", id],
            queryFn: async (): Promise<Ong> => {
                const { data } = await api.get<Ong>(`/v1/ong/${id}`);
                try {
                    await api.get(`/v1/ong/${id}/logo`);
                    setLogoURL(`/v1/ong/${id}/logo`);
                } catch (e) {
                    setLogoURL("");
                }
                return data;
            }
        }
    );

    // Consulta para a lista de ONGs
    const ongQueryList = useQuery(
        {
            queryKey: "ong_list",
            queryFn: async (): Promise<Ong[]> => {
                const { data } = await api.get<Ong[]>('/v1/ong/');
                return data;
            }
        }
    );

    const { data: ongData } = ongQuery;
    const { data: ongList } = ongQueryList;
    const [searchTerm, setSearchTerm] = useState("");
    const filteredOngs = ongList?.filter(ong =>
        ong.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const ongId = localStorage.getItem("ongId");

    if (ongQuery.isLoading) {
        return (
            <>
                <div className="mt-24 flex w-full flex-col justify-center items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-6 w-36 " />
                    <Skeleton className="h-4 w-28 " />
                    <div className="mt-8 flex gap-4">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                </div>
                <div className="py-4 px-4 mt-6">
                    <Skeleton className="w-full h-36 rounded-xl" />
                    <div className="flex gap-4 py-4">
                        <Skeleton className="w-32 h-24 rounded-xl" />
                        <Skeleton className="w-32 h-24 rounded-xl" />
                        <Skeleton className="w-32 h-24 rounded-xl" />
                    </div>
                    <Skeleton className="w-36 h-12 rounded-full" />
                </div>
                <div className="mt-10 flex flex-col content-start items-start gap-4 px-4">
                    <Skeleton className="h-6 w-36 " />
                    <Skeleton className="h-4 w-28 " />
                    <Skeleton className="h-4 w-28 " />
                </div>
            </>
        )
    }

    return (
        <main>
            <header className="bg-[url(/images/circle.svg)] w-full h-52 bg-no-repeat bg-contain">
                <div className="flex justify-between items-center p-2">
                    <Button onClick={() => navigate(`/`)}>
                        <ChevronLeftIcon className="h-6 w-6" />
                    </Button>
                    <img className="h-20 w-20" src="/images/logo-white.svg" onClick={() => navigate("/")}
                        alt={"Logo acolhe+"} />
                    <Button onClick={() => navigate(`/`)}>
                        <FiPlusSquare className="h-6 w-6" />
                    </Button>
                </div>

                <div className="flex items-center justify-center w-full">
                    <input
                        className={"hidden"}
                        type="file"
                    />
                    <Avatar className="w-28 h-28 mt-2 border-2 border-[#2F49F3]">
                        {
                            logoURL ? (
                                <AvatarImage src={serverURI + `/v1/ong/${id}/logo`} />
                            ) : (
                                <AvatarImage src={"/images/invalidLogo.png"} />
                            )
                        }
                    </Avatar>
                </div>
            </header>
            <main>
                <header>
                    <div className="mt-3 flex flex-col items-center justify-center w-full">
                        <h1 className="text-[#19191B] text-2xl">
                            Ações e Eventos
                        </h1>
                        <p className="text-[#61646B]">
                            {ongData?.nome}
                        </p>
                    </div>
                </header>

                <div className="overflow-scroll pb-20 p-4">
                    <section className={"flex gap-2"}>
                        <Input
                            className="rounded-full px-4 py-2 border border-gray-300"
                            placeholder="Pesquise"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button className={"h-8 w-12"}>
                            <CiSearch className={"h-6 w-6"} />
                        </Button>
                    </section>
                    {
                        ongList?.length === 0 && (
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
                </div>
            </main>
        </main>
    )
}