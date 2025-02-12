import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {api, serverURI} from "@/utils/api.ts";
import {Ong} from "@/pages/ong/@types/Ong.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useState} from "react";
import {ChevronLeftIcon} from '@radix-ui/react-icons';
import {FiPlusSquare} from "react-icons/fi";
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {CardY} from "@/components/ui/cardY.tsx";

const acaoOngSchema = z.object({
    nome: z.string().min(3, {message: "Insira um nome maior"}),
    dia: z.number().min(1, {message: "Escolha uma data válida"}).max(31, {message: "Escolha uma data válida"}),
    mes: z.string(),
    ano: z.number().min(2025, {message: "Escolha uma data válida"}),
    hora_inicio: z.string(),
    hora_termino: z.string(),
    cep: z.string(),
    bairro: z.string(),
    endereco: z.string(),
    numero: z.string(),
    complemento: z.string(),
})

type AcaoOngSchema = z.infer<typeof acaoOngSchema>

export default function AcoesOng() {

    const [logoURL, setLogoURL] = useState<string>('');
    const {id} = useParams();
    const navigate = useNavigate();

    // Consulta para o perfil da ONG
    const ongQuery = useQuery(
        {
            queryKey: ["ong_profile", id],
            queryFn: async (): Promise<Ong> => {
                const {data} = await api.get<Ong>(`/v1/ong/${id}`);
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

    {/* CRIAR QUERY DAS ACOES DA ONG EM QUESTÃO*/
    }

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
                <div className="flex justify-between items-center p-2">
                    <Button onClick={() => navigate(`/`)}>
                        <ChevronLeftIcon className="h-6 w-6"/>
                    </Button>
                    <img className="h-20 w-20" src="/images/logo-white.svg" onClick={() => navigate(`/ong/${id}`)}
                         alt={"Logo acolhe+"}/>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <FiPlusSquare className="h-6 w-6"/>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="w-11/12 bg-white rounded-xl">
                            <DialogHeader className="flex items-start">
                                <DialogTitle>Criar novo evento</DialogTitle>
                            </DialogHeader>
                            <div className={"flex flex-col gap-2"}>
                                <Label className={"text-[#191918]"}>
                                    Nome
                                </Label>
                                <div className={"relative"}>
                                    <Label className={"absolute text-[12px] left-3"}>
                                        Título do evento
                                    </Label>
                                    <Input className={"pt-10 pb-6"}/>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <Label className={"text-[#191918]"}>
                                    Data
                                </Label>
                                <div className={"flex justify-between"}>
                                    <div className={"relative"}>
                                        <Label className={"absolute text-[12px] left-3"}>
                                            Dia
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-20 border-[#AFB1B6] rounded-xl pt-10 pb-6">
                                                <SelectValue defaultValue={1}/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {Array.from({length: 31}, (_, i) => (
                                                    <SelectItem key={i + 1} value={String(i + 1)}>
                                                        {i + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={"relative"}>
                                        <Label className={"absolute text-[12px] left-3"}>
                                            Dia
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-20 border-[#AFB1B6] rounded-xl pt-10 pb-6">
                                                <SelectValue defaultValue={1}/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {Array.from({length: 31}, (_, i) => (
                                                    <SelectItem key={i + 1} value={String(i + 1)}>
                                                        {i + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={"relative"}>
                                        <Label className={"absolute text-[12px] left-3"}>
                                            Dia
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-20 border-[#AFB1B6] rounded-xl pt-10 pb-6">
                                                <SelectValue defaultValue={1}/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {Array.from({length: 31}, (_, i) => (
                                                    <SelectItem key={i + 1} value={String(i + 1)}>
                                                        {i + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">

                                    <Input/>
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button>
                                        Adicionar
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex items-center justify-center w-full">
                    <input
                        className={"hidden"}
                        type="file"
                    />
                    <Avatar className="w-28 h-28 mt-2 border-2 border-[#2F49F3]">
                        {
                            logoURL ? (
                                <AvatarImage src={serverURI + `/v1/ong/${id}/logo`}/>
                            ) : (
                                <AvatarImage src={"/images/invalidLogo.png"}/>
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
                            {ongQuery.data?.nome}
                        </p>
                    </div>
                </header>

                {/* MOCKUP GENERICO DO CARD DAS ACOES, ADICIONAR CHAMADA QUANDO FIZER A QUERY DAS ACOES DA ONG*/}
                <div className="overflow-scroll pb-20 p-4">
                    <section className={"flex gap-2"}>
                        <Input
                            className="rounded-full px-4 py-2 border border-gray-300"
                            placeholder="Pesquise"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button className={"h-8 w-12"}>
                            <CiSearch className={"h-6 w-6"}/>
                        </Button>
                    </section>

                    {/* Mock de ações */}
                    <div className="py-4">
                        <CardY
                            image="http://cdn.wallpapersafari.com/64/4/bzPjgi.jpg"
                            nomeAcao="Ação 1"
                            nomeOng="Rua Mockada, 123"
                            dataAcao="13/10/1999"
                            endereco="Rua tese, 123"
                            publicoAlvo={["Crianças", "Idosos"]}
                            necessidades={["Alimentos", "Roupas"]}
                        />
                    </div>
                    <div className="py-4">
                        <CardY
                            image="https://files.usef.org/assets/gB-FFCmn8ug/herdadobestock58776709jpeg_articleshare.jpg"
                            nomeAcao="Ação 2"
                            nomeOng="Rua Mockada, 123"
                            dataAcao="13/10/1999"
                            endereco="Rua tese, 123"
                            publicoAlvo={["Crianças", "Idosos"]}
                            necessidades={["Alimentos", "Roupas"]}
                        />
                    </div>
                </div>
            </main>
        </main>
    )
}