import { createContext, useState } from 'react';

type BinaryContext = {
  name?: string;
  data?: Uint8Array;
  setBinary: (name?: string, data?: Uint8Array) => void;
};

export const BinaryContext = createContext<BinaryContext>({
  setBinary: (_name?: string, _data?: Uint8Array) => {
    return;
  },
});

export const BinaryProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string | undefined>();
  const [data, setData] = useState<Uint8Array | undefined>();

  const setBinary = (name?: string, data?: Uint8Array) => {
    setName(name);
    setData(data);
  };

  return (
    <BinaryContext.Provider
      value={{
        name,
        data,
        setBinary,
      }}
    >
      {children}
    </BinaryContext.Provider>
  );
};
