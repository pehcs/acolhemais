import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {api} from "@/utils/api.ts";
import {Ong} from "@/pages/ong/@types/Ong.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import {TbEdit} from "react-icons/tb";

const ongDataSchema = z.object({
    nome: z.string().min(2, "Nome inválido")
})
type OngUpdateSchema = z.infer<typeof ongDataSchema>

export default function OngProfileUpdate() {
    const [address, setAddress] = useState("");
    const {id} = useParams()
    const navigate = useNavigate()
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
    const {
        register,
        reset,
        errors,
        setValue,
    } = useForm<OngUpdateSchema>({
        resolver: zodResolver(ongDataSchema),
        defaultValues: {
            nome: ongData?.nome
        }
    })
    useEffect(() => {
        if (ongData) {
            setValue("nome", ongData.nome || "");
        }
    }, [ongData, reset]);

    if (ongQuery.isLoading) {
        return (
            <>
                <div>
                    <div className="flex w-full flex-col justify-center items-center gap-4">
                        <Skeleton className="h-24 w-full"/>
                        <Skeleton className="h-6 w-36 "/>
                    </div>
                    <div className="py-4 px-4 mt-4 flex flex-col justify-start w-full gap-4">
                        <Skeleton className="w-1/3 h-6 rounded-xl mb-4"/>
                        <Skeleton className="w-full h-16 rounded-xl"/>
                        <Skeleton className="w-full h-16 rounded-xl"/>
                        <Skeleton className="w-full h-16 rounded-xl"/>
                    </div>
                    <div className="mt-4 flex flex-col content-start items-start gap-4 px-4">
                        <Skeleton className="h-6 w-36 "/>
                        <div className="flex gap-4 flex-wrap">
                            <Skeleton className="h-8 w-24 rounded-full"/>
                            <Skeleton className="h-8 w-24 rounded-full"/>
                            <Skeleton className="h-8 w-24 rounded-full"/>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col content-start items-start gap-4 px-4">
                        <Skeleton className="h-6 w-36 "/>
                        <div className="flex gap-4 flex-wrap">
                            <Skeleton className="h-8 w-24 rounded-full"/>
                            <Skeleton className="h-8 w-24 rounded-full"/>
                            <Skeleton className="h-8 w-24 rounded-full"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-16">
                    <Skeleton className="h-12 w-9/12 rounded-full"/>
                </div>
            </>
        )
    }

    return (
        <main>
            <header className="w-full h-20 bg-[#2F49F3] bg-contain">
                <div className="w-full flex justify-between items-center p-2">
                    <Button onClick={() => navigate(`/ong/admin/${id}`)}>
                        <FaArrowLeft className="h-6 w-6"/>
                    </Button>
                    <img className="h-20 w-20" src="/images/logo-white.svg" alt={"Logo acolhe+"}/>
                    <Button>
                        <FiLogOut className="h-6 w-6"/>
                    </Button>
                </div>
            </header>
            <main className="px-4">
                <h1 className="w-full text-center text-2xl mt-6 text-[#19191B]">
                    Configurações
                </h1>
                <div className="overflow-scroll mt-6">
                    <article>
                        <h3 className="mb-2 font-medium">Editar informações</h3>
                        <div className="flex flex-col gap-4">
                            <div className="relative w-full">
                                <label
                                    className="absolute top-2 left-3 text-gray-500 text-sm transition-all duration-200"
                                >
                                    Nome
                                </label>
                                <TbEdit className="absolute top-6 right-4 h-6 w-6 text-[#61646B]"/>
                                <Input
                                    {...register("nome")}
                                    id="nome"
                                    className="px-3 pt-[2.6rem] pb-6"
                                />
                                {errors?.nome && (
                                    <p className="text-red-500">{errors.nome.message}</p>
                                )}
                            </div>
                            <div className="relative w-full">
                                <label
                                    className="absolute top-2 left-3 text-gray-400 text-sm transition-all duration-200"
                                >
                                    Localização
                                </label>
                                <Input
                                    disabled
                                    value={address}
                                    className="px-3 pt-[2.6rem] pb-6"
                                />
                            </div>
                            <div className="relative w-full">
                                <label
                                    className="absolute top-2 left-3 text-gray-400 text-sm transition-all duration-200"
                                >
                                    Login
                                </label>
                                <Input
                                    disabled
                                    value={ongData?.login}
                                    className="px-3 pt-[2.6rem] pb-6"
                                />
                            </div>
                        </div>
                    </article>
                    <article className="mt-6 w-full">
                        <div className="flex w-full justify-between">
                            <h3 className="mb-2 font-medium">Público alvo</h3>
                            <TbEdit className="h-6 w-6 text-[#61646B]"/>
                        </div>
                        {
                            ongData?.publico_alvo.map((p, key) => (
                                <div key={key}
                                     className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                >
                                    {p.tipo}
                                </div>
                            ))
                        }
                    </article>
                    <article className="mt-6 w-full">
                        <div className="flex w-full justify-between">
                            <h3 className="mb-2 font-medium">Necessidades</h3>
                            <TbEdit className="h-6 w-6 text-[#61646B]"/>
                        </div>
                        {
                            ongData?.necessidades.map((p, key) => (
                                <div key={key}
                                     className={"bg-[#EFEFF0] text-sm text-[#19191B] w-auto py-2  px-6 rounded-full inline-block"}
                                >
                                    {p.tipo}
                                </div>
                            ))
                        }
                    </article>
                    <article className="flex mt-6 w-full justify-between">
                        <h3 className="mb-4 font-medium">Alterar senha</h3>
                        <TbEdit className="h-6 w-6 text-[#61646B]"/>
                    </article>
                </div>
                <div className="flex justify-center mt-12">
                    <Button className="w-11/12">Salvar</Button>
                </div>

            </main>
        </main>
    )
}