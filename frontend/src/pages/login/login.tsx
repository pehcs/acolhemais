import { Button } from "@/components/ui/button.tsx";
import { GoArrowLeft } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export default function LoginApp() {
    const circle = {
        svg: (
            <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="250" cy="-50" rx="410" ry="410" fill="#2F49F3" />
            </svg>
        ),
    };

    const [viewPassword, setViewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: { login: string; senha: string }) => {
        console.log("Dados submetidos:", data);
    };

    const [checked, setChecked] = useState(false);

    return (
        <div className="h-screen px-4 overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-[440px] z-[-1] pointer-events-none">
                {circle.svg}
            </div>

            <div className="flex flex-row items-center w-full mt-8 gap-4">
                <Button className="p-0 w-2/12 text-[#FAFAFA]" variant="icon" type="button">
                    <GoArrowLeft className="w-7 h-7" />
                </Button>
                <h1 className="text-[#FAFAFA] text-xl w-8/12 text-center">Acolhe +</h1>
                <div className="w-2/12"></div>
            </div>

            <div className="flex flex-col items-center w-full mt-3 mb-12 gap-4">
                <h1 className="text-[#FAFAFA] text-3xl text-center mb-4">Bem-vindo!</h1>
                <img src="/images/img-1.png" alt="" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <Label>Email</Label>
                    <Input
                        {...register("login", { required: "O email é obrigatório" })}
                    />
                    {errors.login && (
                        <span className="text-red-500 text-sm">{errors.login.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Label>Senha</Label>
                    <div className="relative">
                        <Input
                            type={viewPassword ? "text" : "password"}
                            {...register("senha", { required: "A senha é obrigatória" })}
                        />
                        {viewPassword ? (
                            <FiEyeOff
                                onClick={() => setViewPassword(false)}
                                className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6 cursor-pointer"
                            />
                        ) : (
                            <FiEye
                                onClick={() => setViewPassword(true)}
                                className="text-[#AFB1B6] absolute right-4 bottom-1/4 w-7 h-6 cursor-pointer"
                            />
                        )}
                    </div>
                    {errors.senha && (
                        <span className="text-red-500 text-sm">{errors.senha.message}</span>
                    )}
                </div>

                <div className="flex flex-row gap-1 justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox.Root
                            className="w-4 h-4 border-2 border-[#AFB1B6]"
                            checked={checked}
                            onCheckedChange={(checked) => setChecked(checked)}
                        >
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>

                        <Label>Lembrar de mim</Label>
                    </div>
                    <Label>Esqueci a senha</Label>
                </div>

                <Button className="mt-4" type="submit">
                    Entrar
                </Button>
            </form>

            <div className="flex flex-row items-center justify-center mt-12 gap-2">
                <p>Gostaria de se cadastrar?</p>
                <a href="" className="text-blue-500 underline">Clique aqui.</a>
            </div>

        </div>
    );
}
