"use client";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

// const FormInput = ({
//   name,
//   type,
//   size,
//   value,
//   id,
//   placeholder,
//   validation,
//   label,
// }: IInput) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const errorMessage = getErrorMessageByPropertyName(errors, name);
//   return (
//     <>
//       {label ? label : null}
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) =>
//           type === "password" ? (
//             <Input.Password
//               type={type}
//               size={size}
//               placeholder={placeholder}
//               {...field}
//               value={value ? value : field.value}
//             />
//           ) : (
//             <Input
//               type={type}
//               size={size}
//               placeholder={placeholder}
//               {...field}
//               value={value ? value : field.value}
//             />
//           )
//         }
//       />
//       <small style={{ color: "red" }}>{errorMessage}</small>
//     </>
//   );
// };

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  if (type === "file") {
    return (
      <>
        {label && <label>{label}</label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Upload
              beforeUpload={() => false} // To prevent actual file upload before form submission
              onChange={(file) => field.onChange([file.file])}
              fileList={field.value}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          )}
        />
        <small style={{ color: "red" }}>{errorMessage}</small>
      </>
    );
  }

  return (
    <>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            type={type}
            size={size}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
