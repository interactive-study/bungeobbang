import { InfringementContext } from '@/contexts/InfringementContext';
import { useState } from 'react';
import { Outlet } from 'react-router';

export default function RootLayout() {
  const [encountered, setEncountered] = useState(false);
  const [infringedParts, setInfringedParts] =
    useState<InfringementContext['infringedParts']>(undefined);

  return (
    <InfringementContext.Provider
      value={{
        infringedParts,
        infringe: setInfringedParts,
        encountered,
        encounter: () => setEncountered(true),
      }}
    >
      <Outlet />
    </InfringementContext.Provider>
  );
}
