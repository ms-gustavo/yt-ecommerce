"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

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

    console.log("data", data);
  };

  return (
    <>
      <Heading title="Crie sua conta" />
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
