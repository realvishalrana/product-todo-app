import { getErrors } from "@/utils/helper";
import React from "react";

const InputField = ({
  id,
  label,
  inputName,
  className,
  inputValue,
  formik = null,
  type = "text",
  isError = false,
  disabled = false,
  isPrivate = false,
  labelClass = "",
  isRequired = false,
  handleError = false,
  placeholder = false,
  onChange = () => {},
  isZeroNumberIncluded = true,
  ...other
}) => {
  const errors = isError && getErrors({ formik, inputName });

  const handleOnInputChange = (e) => {
    if (!isZeroNumberIncluded) {
      const value = Number(e.target.value);
      if (value <= -1) {
        e.target.value = "";
      }
      return e.target.value;
    }
    return false;
  };

  return (
    <div className="w-full text-left">
      <label htmlFor={id} className={`!block !mb-1 ${labelClass}`}>
        {label} {isRequired && "*"}
      </label>

      <div className="relative group !mt-0">
        <input
          id={id}
          name={inputName}
          disabled={disabled}
          placeholder={placeholder ? placeholder : `Enter ${label}`}
          type={isPrivate ? (show ? type : "password") : type}
          className={`py-2  pr-11 px-3 h-12 rounded-lg w-full border focus:outline-none transition flex !text-black placeholder:text-sm font-[400] !truncate ${
            handleError
              ? "focus:outline-none"
              : errors
              ? "border-red bg-rose-50 "
              : "focus:ring-2 focus:ring-primary"
          }`}
          onInput={(e) => handleOnInputChange(e)}
          onChange={onChange}
          {...(inputValue ? { value: inputValue } : {})}
          {...other}
        />
      </div>

      {errors ? (
        <p className="text-xs text-red mt-1">
          {getErrors({ formik, inputName })}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
