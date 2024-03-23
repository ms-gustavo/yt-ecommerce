"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then((response) => {
        toast.success("Conta criada");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Login com sucesso, redirecionando...");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        toast.error("Houve um erro");
      })
      .finally(() => setIsLoading(false));
  };

  if (currentUser) {
    return (
      <p className="text-center">Você já está conectado. Redirecionando...</p>
    );
  }

  return (
    <>
      <Heading title="Crie sua conta" />
      <Button
        outline
        label="Cadastre-se com sua conta Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Carregando..." : "Criar conta"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Já possui uma conta?{" "}
        <Link className="underline" href="/login">
          Entrar
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
