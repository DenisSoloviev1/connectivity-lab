import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Providers } from "./providers";
import { Spinner } from "@heroui/react";

import "./styles/globals.css";

const App: FC = () => {
  return (
    <Providers>
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-background flex h-screen w-full items-center justify-center">
            <Spinner className="m-auto w-full h-full" label="Загрузка ..." />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Providers>
  );
};

export default App;
