type Props = {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ placeholder, value, type, disabled, onChange }: Props) => {
  return (
    <input
      className="w-full p-4 text-lg bg-white border-2 border-neutral-800 rounded-md outline-none text-black focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
