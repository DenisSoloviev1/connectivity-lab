import { appRouting } from "@/app/config";
import { Link } from "@heroui/react";

const Main = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={appRouting.rest.path}>rest</Link>
      <Link href={appRouting.socket.path}>socket</Link>
      <Link href={appRouting.sse.path}>sse</Link>
      <Link href={appRouting.webRTC.path}>webRTC</Link>
    </div>
  );
};

export default Main;
