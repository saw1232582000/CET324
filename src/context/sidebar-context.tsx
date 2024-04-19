"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { boolean } from "zod";
import { SidebarType, route } from "~/lib/SidebarRoute";

interface Route {
  route: SidebarType;
  selected: [boolean, Dispatch<SetStateAction<boolean>>];
}

interface SideBarContextType {
  collapse: [boolean, Dispatch<SetStateAction<boolean>>];
  routes: Route[];
}

export const SidebarContext = createContext<SideBarContextType | null>(null);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapse, toggleCollapse] = useState<boolean>(false);
  const routes: SidebarType[] = route;
  const sideBarRoute: Route[] = routes.map((r) => {
    const currentRoute: SidebarType = r;
    const [isselected, setSelected] = useState<boolean>(false);
    return {
      route: currentRoute,
      selected: [isselected, setSelected],
    };
  });

  useEffect(()=>{
    sideBarRoute[0]?.selected[1](true)
  },[])
  return (
    <SidebarContext.Provider
      value={{
        collapse: [isCollapse, toggleCollapse],
        routes: sideBarRoute,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return context;
};
