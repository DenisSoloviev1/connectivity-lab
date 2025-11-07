import { FC, ReactNode } from "react";

import { HeroUIProvider } from "@heroui/react";
import { QueryProvider } from "./query";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </QueryProvider>
  );
};
