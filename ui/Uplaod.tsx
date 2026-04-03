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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    // call RHF's onChange
    registration?.onChange(e);

    // call custom onChange to set form value
    if (onChange) onChange(file);

    if (file && preview) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      registration?.onChange({
        target: { name: registration.name, value: null },
      });
      if (onChange) onChange(null);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}

      <div
        onClick={!imagePreview ? handleClick : undefined}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:bg-gray-50 ${
          error ? "border-red-500" : "border-gray-300"
        } relative`}
      >
        {imagePreview ? (
          <div className="relative inline-block">
            <Image
              src={imagePreview}
              alt="preview"
              width={300}
              height={300}
              className="mx-auto h-32 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
            >
              Remove
            </button>
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
