import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps {
  label: string;
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'date' | 'number';
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const {
    label = 'You Label',
    placeholder = 'Placeholder',
    type = 'text',
    value,
    onChange,
    name,
    className,
    onBlur,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  if (type === 'password') {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex justify-between items-center">
          <label className="font-poppins font-thin text-base text-gray-500">
            {label}
          </label>
          {showPassword ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowPassword(false)}
            >
              <FiEyeOff className="cursor-pointer text-gray-500" />
              <p className="font-poppins text-gray-500">Hide</p>
            </div>
          ) : (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowPassword(true)}
            >
              <FiEye className="cursor-pointer text-gray-500" />
              <p className="font-poppins text-gray-500">Show</p>
            </div>
          )}
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
          placeholder={placeholder}
          onBlur={onBlur}
          {...rest}
        />
      </div>
    );
  } else if (type === 'email') {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="font-poppins font-thin text-base text-gray-500">
          {label}
        </label>
        <input
          type="email"
          value={value}
          name={name}
          onChange={onChange}
          className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-poppins font-thin text-base text-gray-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
