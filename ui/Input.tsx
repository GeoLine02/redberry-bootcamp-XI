import Image from "next/image";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  iconAlt?: string;
};

export default function Input({ icon, ...props }: InputProps) {
  return (
    <div className="space-y-1 w-full">
      <label className="inline-block" htmlFor={props.id}>
        {props.placeholder}
      </label>
      <div className="border-2 border-light-gray w-full">
        <input className="w-full p-2" {...props} />
        {icon && <Image src={icon} alt={props.iconAlt || "Input icon"} />}
      </div>
    </div>
  );
}
