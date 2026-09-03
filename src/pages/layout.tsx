import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-700 p-2 space-y-2 overflow-hidden">
      <Outlet />

      <div className="mt-auto space-y-4 flex flex-col items-center">
        <Separator />

        <p className="">Flashysnail</p>
      </div>
    </div>
  );
}
