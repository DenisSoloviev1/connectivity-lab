import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { appRouting } from "../config";

const App = lazy(() => import("../index"));
const Main = lazy(() => import("@/shared/main.page"));
const Rest = lazy(() => import("@/shared/rest/page"));
const Socket = lazy(() => import("@/shared/socket/page"));
const SSE = lazy(() => import("@/shared/sse/page"));
const WebRTC = lazy(() => import("@/shared/webRTC/page"));

export const router = createBrowserRouter([
  {
    path: appRouting.main.path,
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: appRouting.rest.path,
        element: <Rest />,
      },
      {
        path: appRouting.socket.path,
        element: <Socket />,
      },
      {
        path: appRouting.sse.path,
        element: <SSE />,
      },
      {
        path: appRouting.webRTC.path,
        element: <WebRTC />,
      },
    ],
  },
]);
