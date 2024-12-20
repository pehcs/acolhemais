import {GoArrowLeft} from "react-icons/go";
import {z} from "zod";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

import "leaflet/dist/leaflet.css";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useWatch} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label.tsx";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";
import Map from "@/components/ui/map/map.tsx"
import useMap from "@/hooks/useMap.tsx";

function isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDV = (cnpj: string, pos: number[]) =>
        cnpj
            .slice(0, pos.length)
            .split("")
            .reduce((sum, num, i) => sum + parseInt(num, 10) * pos[i], 0);

    const d1 = calcDV(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11;
    const d2 = calcDV(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11;

    return (
        parseInt(cnpj[12], 10) === (d1 < 2 ? 0 : 11 - d1) &&
        parseInt(cnpj[13], 10) === (d2 < 2 ? 0 : 11 - d2)
    );
}

const ongRegisterSchema = z.object({
    nome: z.string().min(1, "Informe o nome para continuar"),
    data_criacao: z.number().min(1900, "Ano inválido").max(new Date().getFullYear(), "Ano inválido"),
    cnpj: z
        .string()
        .optional()
        .refine((cnpj) => !cnpj || isValidCNPJ(cnpj), {message: "CNPJ inválido"}),
    localizacao: z.string().optional(),
    publico_alvo: z.string().optional(),
    necessidades: z.string().optional(),
    login: z.string().optional(),
    senha: z.string().optional(),
});

type OngRegisterSchema = z.infer<typeof ongRegisterSchema>

export default function OngRegister() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors, isValid},
        control
    } = useForm<OngRegisterSchema>({
        resolver: zodResolver(ongRegisterSchema),
        defaultValues: {
            nome: "",
            data_criacao: 2024,
            localizacao: "",
            publico_alvo: "",
            necessidades: "",
            cnpj: "",
            login: "",
            senha: ""
        }
    })

    const [finished, setFinished] = useState<boolean>(false);

    const options = [
        "Crianças",
        "Adolescentes",
        "Adultos",
        "Idosos",
        "Homens",
        "Mulheres",
        "População negra",
        "População Indígena",
        "LGBTQIA+",
        "Pessoas com Deficiência",
    ];

    const necessidades = [
        "Assistência Social",
        "Educação",
        "Saúde",
        "Saúde Mental",
        "Meio Ambiente",
        "Combate à Pobreza e Fome",
        "Cultura e Arte",
        "Igualdade de Gênero",
        "Direitos Humanos",
        "Justiça Social",
        "Esporte e Lazer",
        "Animais",
        "Desenvolvimento Comunitário",
        "Desastres e emergências",
        "Emprego",
    ];
    const [currentStep, setCurrentStep] = useState(3);


    const [error, setError] = useState<string | null>(null);


    const steps: any[] = [
        {
            image: "/images/img-4.svg",
            title: "Qual o nome da sua ONG?"
        },
        {
            image: "/images/img-5.svg",
            title: "Em que ano a ONG foi criada?"
        },
        {
            image: "/images/img-9.svg",
            title: "Por favor, informe o CNPJ da ONG, caso ela tenha um."
        },
        {
            image: "/images/img-6.svg",
            title: "Onde a ONG se localiza?"
        },
        // {
        //   id: "LOCALIZACAO",
        //
        //   label: "CEP",
        //   field: "localizacao",
        //
        //   input: (
        //     <Controller
        //       control={form.control}
        //       name="localizacao"
        //       render={({ field }) => (
        //
        //       )}
        //     />
        //   ),
        // },
        // {
        //   id: "PUBLICO_ALVO",
        //   title: "Selecione o(s) público(s) alvo da sua ONG.",
        //   field: "publico_alvo",
        //   image: "/images/img-7.svg",
        //   input: (
        //     <FormItem className="flex flex-col">
        //       <FormLabel>Selecione o(s) público(s) alvo da sua ONG.</FormLabel>
        //       <FormControl>
        //         <div className="flex gap-2 w-11/12 flex-wrap justify-center">
        //           {options.map((option) => (
        //             <Button
        //               onClick={() => {
        //                 setRegisterOng((prevState: any) => {
        //                   const updatedPublicoAlvo = new Set(
        //                     prevState.publico_alvo
        //                   );
        //
        //                   if (updatedPublicoAlvo.has(option)) {
        //                     updatedPublicoAlvo.delete(option);
        //                   } else {
        //                     updatedPublicoAlvo.add(option);
        //                   }
        //
        //                   return {
        //                     ...prevState,
        //                     publico_alvo: updatedPublicoAlvo,
        //                   };
        //                 });
        //               }}
        //               type="button"
        //               className={`w-auto py-0 hover:bg-${registerOng.publico_alvo.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} ${registerOng.publico_alvo.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} text-[#19191B] focus:outline-none hover:bg-none`}
        //             >
        //               {option}
        //             </Button>
        //           ))}
        //         </div>
        //       </FormControl>
        //     </FormItem>
        //   ),
        // },
        // {
        //   id: "NECESSIDADES",
        //   title: "Selecione a(s) causa(s) que sua ONG atende.",
        //   field: "necessidades",
        //   image: "/images/img-8.svg",
        //   input: (
        //     <FormItem className="flex flex-col">
        //       <FormControl>
        //         <div className="flex gap-2 w-11/12 flex-wrap justify-center h-[62%] overflow-y-scroll">
        //           {necessidades.map((option) => (
        //             <Button
        //               onClick={() => {
        //                 setRegisterOng((prevState: any) => {
        //                   const updatedPublicoAlvo = new Set(
        //                     prevState.necessidades
        //                   );
        //
        //                   if (updatedPublicoAlvo.has(option)) {
        //                     updatedPublicoAlvo.delete(option);
        //                   } else {
        //                     updatedPublicoAlvo.add(option);
        //                   }
        //
        //                   return {
        //                     ...prevState,
        //                     necessidades: updatedPublicoAlvo,
        //                   };
        //                 });
        //               }}
        //               type="button"
        //               className={`w-auto py-0 hover:bg-${registerOng.necessidades.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} ${registerOng.necessidades.has(option) ? "bg-[#FFCF33]" : "bg-[#EFEFF0]"} text-[#19191B] focus:outline-none hover:bg-none`}
        //             >
        //               {option}
        //             </Button>
        //           ))}
        //         </div>
        //       </FormControl>
        //     </FormItem>
        //   ),
        // },
        // {
        //   id: "login",
        //   title: "Quase lá! Informe um email e senha para acessar a conta.",
        //   field: "login",
        //   image: "/images/img-7-var.svg",
        //   input: (
        //     <div className="flex flex-col gap-4">
        //       <FormItem className="flex flex-col">
        //         <FormLabel>Email</FormLabel>
        //         <FormControl>
        //           <Input
        //             value={registerOng.login}
        //             onChange={(e) =>
        //               setRegisterOng((prevState: any) => ({
        //                 ...prevState,
        //                 login: e.target.value,
        //               }))
        //             }
        //           />
        //         </FormControl>
        //       </FormItem>
        //       <FormItem className="flex flex-col">
        //         <FormLabel>Senha</FormLabel>
        //         <FormControl>
        //           <div className="relative">
        //             <Input
        //               type={viewPassword ? "text" : "password"}
        //               value={registerOng.senha}
        //               onChange={(e) =>
        //                 setRegisterOng((prevState: any) => ({
        //                   ...prevState,
        //                   senha: e.target.value,
        //                 }))
        //               }
        //             />
        //             {viewPassword ? (
        //               <FiEyeOff
        //                 onClick={handleView}
        //                 className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6"
        //               />
        //             ) : (
        //               <FiEye
        //                 onClick={handleView}
        //                 className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6"
        //               />
        //             )}
        //           </div>
        //         </FormControl>
        //       </FormItem>
        //     </div>
        //   ),
        // },
    ];

    const totalSteps = 4;

    const onSubmit = (data: OngRegisterSchema) => {
        console.log(data);
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // onSubmit();
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
        if (finished) {
            setFinished(false);
        }
    };
    const cep = useWatch({control, name: "localizacao"})
    const {updateCep, updatePoint, coordinates} = useMap();
    useEffect(() => {
        updateCep(cep)
        setValue("localizacao", coordinates.address);
    }, [cep]);

    useEffect(() => {
        console.log("Algo mudou aq pra: " + coordinates.latitude)
        console.log(coordinates.address)
        setValue("localizacao", coordinates.address);
        console.log(coordinates.address)
    }, [updatePoint, coordinates]);

    return (
        <div className="h-screen px-4 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center w-full mt-8 mb-12 gap-4">
                    <Button
                        className="p-0"
                        variant="icon"
                        onClick={handlePreviousStep}
                        disabled={currentStep === 0}
                    >
                        <GoArrowLeft className="w-7 h-7"/>
                    </Button>
                    <div className="h-2 w-3/4">
                        <Progress value={(currentStep / (totalSteps - 1)) * 100}/>
                    </div>
                </div>
                <div className="mt-8 h-[44%] p-4 flex flex-col justify-between">
                    <div className="flex flex-col gap-10 w-full">
                        <div className="text-[#19191B] text-2xl flex flex-col items-center gap-10">
                            <h2 className="text-center">{steps[currentStep].title}</h2>
                            <div className="w-full h-64 flex justify-center">
                                <img src={steps[currentStep].image}/>
                            </div>
                        </div>
                        {currentStep === 0 && (
                            <div className="flex flex-col">
                                <Label>
                                    Nome
                                </Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    {...register("nome")}
                                />
                                {errors.nome && (
                                    <p className="text-red-500">{errors.nome.message}</p>
                                )}
                            </div>
                        )}
                        {
                            currentStep === 1 && (
                                <>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        <Button
                                            className="p-0 w-12"
                                            variant="icon"
                                            type="button"
                                            onClick={() => {
                                                const currentValue = getValues("data_criacao") || new Date().getFullYear();
                                                if (currentValue < new Date().getFullYear()) {
                                                    setValue("data_criacao", currentValue + 1);
                                                }
                                            }}
                                        >
                                            <RiArrowUpSLine
                                                className="w-7 h-7 text-[#AFB1B6] hover:text-[#2F49F3] transition-colors duration-300"/>
                                        </Button>
                                        <div className="flex flex-col w-1/2">
                                            <Input
                                                min={1900}
                                                max={new Date().getFullYear()}
                                                className="text-center"
                                                type="number"
                                                {...register("data_criacao", {valueAsNumber: true})}
                                            />
                                            {errors.data_criacao && (
                                                <p className="text-red-500">{errors.data_criacao.message}</p>
                                            )}
                                        </div>
                                        <Button
                                            className="p-0 w-12"
                                            variant="icon"
                                            type="button"
                                            onClick={() => {
                                                const currentValue = getValues("data_criacao") || new Date().getFullYear();
                                                if (currentValue > 1900) {
                                                    setValue("data_criacao", currentValue - 1);
                                                }
                                            }}
                                        >
                                            <RiArrowDownSLine
                                                className="w-7 h-7 text-[#AFB1B6] hover:text-[#2F49F3] transition-colors duration-300"/>
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    {
                        currentStep === 2 && (
                            <div className="flex flex-col">
                                <Label>
                                    CNPJ
                                </Label>
                                <Input
                                    type="text"
                                    {...register("cnpj")}
                                />
                                {errors.cnpj && (
                                    <p className="text-red-500">{errors.cnpj.message}</p>
                                )}
                            </div>
                        )
                    }
                    {
                        currentStep === 3 && (
                            <>
                                <div>
                                    <Label>CEP da ONG</Label>
                                    {getValues("localizacao")}
                                    <Input
                                        id="localizacao"
                                        {...register("localizacao")}
                                    />
                                    {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
                                    <div className={error ? "h-48 mt-2" : "h-52 mt-4"}>
                                        <Map latitude={coordinates.latitude} longitude={coordinates.longitude}/>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <Button
                        disabled={!isValid}
                        className="w-10/12 absolute bottom-12"
                        type={currentStep === totalSteps - 1 ? "submit" : "button"}
                        onClick={handleNextStep}
                    >
                        {currentStep === totalSteps - 1 ? "Finalizar" : "Continuar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
