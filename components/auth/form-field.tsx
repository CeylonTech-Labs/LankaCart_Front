"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

type BaseProps = {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

type TextFieldProps = BaseProps & InputProps;

export function TextField({ label, error, registration, ...props }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={registration.name}>{label}</Label>
      <Input id={registration.name} {...registration} {...props} />
      {error ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
}

type TextAreaFieldProps = BaseProps & TextareaProps;

export function TextAreaField({ label, error, registration, ...props }: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={registration.name}>{label}</Label>
      <Textarea id={registration.name} {...registration} {...props} />
      {error ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
}
