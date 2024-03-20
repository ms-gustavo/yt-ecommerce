"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
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
      <Heading title="Entre na sua conta" />
      <Button
        outline
        label="Entre com sua conta Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
        label={isLoading ? "Carregando..." : "Entrar"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Ainda não possui uma conta?{" "}
        <Link className="underline" href="/register">
          Registrar
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
