
import React from 'react';

export default function InputForSign(props) {
  const { onChange, errorMessage, id, isValid,  ...inputProps } = props;

  return (
    <div>
      <input
        {...inputProps}
        onChange={onChange}
        className={`shadow appearance-none border px-1.5 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          isValid ? 'border-slate-700' : 'border-red-500'
        }`}
      />
      <br />
      <span className={`mt-2 text-sm ${isValid ? 'hidden' : 'text-red-500'}`}>{errorMessage}</span>
    </div>
  );
}