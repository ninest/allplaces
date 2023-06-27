import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  textarea?: boolean;
}

export function FormInput({
  control,
  name,
  label,
  wrapperClassName,
  inputClassName,
  textarea,
  ...props
}: FormInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const fieldProps = {
    name,
    id: name,
    placeholder: props.placeholder,
    required: props.required,
    value: field.value || "",
    onChange: (e: any) => field.onChange(e.target.value),
  };

  return (
    <fieldset className={clsx(wrapperClassName)}>
      {label && (
        <label htmlFor={name} className="block font-semibold text-gray-600 mb-1">
          {label}
        </label>
      )}
      {/* TODO: description */}

      {textarea ? (
        <textarea className={clsx(inputClassName, "block w-full")} {...fieldProps}></textarea>
      ) : (
        <input type={props.type} className={clsx(inputClassName, "block w-full")} {...props} {...fieldProps} />
      )}

      {error && <div className="mt-2 text-sm text-red-500">{error.message}</div>}
    </fieldset>
  );
}
