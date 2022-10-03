import { useState } from 'react';

export default function useSign(): [{}, Function] {
  const [inputData, setInputData] = useState({});

  function setInputForm(key: string, value: string) {
    const object: any = { ...inputData };
    object[key] = value;

    setInputData(object);
  }

  return [inputData, setInputForm];
}
