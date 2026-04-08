import Image from "next/image";
import { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import UplaodImagePreview from "@/public/UploadImagePreview.svg";
interface UploadProps {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  accept?: string;
  preview?: boolean;
  onChange?: (file: File | null) => void; // <-- new
}

export default function Upload({
  label,
  error,
  registration,
  accept = "image/*",
  preview = true,
  onChange,
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageName, setImageName] = useState("");
  const [fileSize, setFileSize] = useState<null | number>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<null | string>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  function beforeUpload(file: File): boolean {
    // check mime type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError("Only JPG, JPEG, PNG, and WEBP files are allowed.");
      return false;
    }

    return true;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    // nothing selected
    if (!file) {
      onChange?.(null);
      return;
    }

    if (!beforeUpload(file)) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    // call RHF change
    registration?.onChange(e);

    // custom change
    setImageName(file.name);
    setFileSize(file.size);

    onChange?.(file);

    // preview
    if (preview) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleChangeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent parent click behavior
    inputRef.current?.click();
  };

  return (
    <div className="w-full ">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}

      <div
        onClick={!imagePreview ? handleClick : undefined}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:bg-light-purple ${
          error ? "border-red-500" : "border-gray-300"
        } relative`}
      >
        {imagePreview ? (
          <div className="relative flex gap-2">
            <Image
              src={imagePreview}
              alt="preview"
              width={54}
              height={54}
              className="min-w-13.5 max-w-13.5 aspect-square rounded-full object-fill"
            />
            <div className="space-y-0.5">
              <h2 className="text-dark-gray">{imageName}</h2>
              <h2 className="text-medium-gray">Size - {fileSize}MB</h2>
              <button
                type="button"
                onClick={handleChangeClick}
                className="text-sm text-primary-purple underline hover:opacity-80"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Image
              src={UplaodImagePreview}
              alt="upload"
              className="mx-auto h-32 object-contain"
            />
            <div>
              <p className="font-medium">
                Drag and drop or{" "}
                <span className="text-dark-puple underline">Upload file</span>
              </p>
              <p className="text-medium-gray">JPG, PNG or WebP</p>
            </div>
            {validationError && (
              <p className="text-red-500 font-medium">{validationError}</p>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept={accept}
        hidden
        ref={(el) => {
          inputRef.current = el;
          registration?.ref(el);
        }}
        name={registration?.name}
        onBlur={registration?.onBlur}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
