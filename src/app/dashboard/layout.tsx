import { ReactNode, Suspense } from "react";

import { SideBarProvider } from "~/context/sidebar-context";
import SheetMenu from "../_components/SheetMenu";
import Nav from "../_components/Nav";

const DahsboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col ">
      <Suspense>
        <SideBarProvider>
          <Nav>
            <SheetMenu />
          </Nav>

          <div className="flex  w-full">{children}</div>
        </SideBarProvider>
      </Suspense>
    </div>
  );
};
export default DahsboardLayout;
