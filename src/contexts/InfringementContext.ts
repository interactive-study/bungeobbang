import { createContext } from 'react';

type InfringementContext = {
  infringedParts?: [string, string, string, string];
  infringe: (parts: [string, string, string, string]) => void;
  encountered: boolean;
  encounter: () => void;
};

const InfringementContext = createContext<InfringementContext>({
  infringedParts: undefined,
  infringe: () => {},
  encountered: false,
  encounter: () => {},
});

export { InfringementContext };
