"use client";

import { usePathname } from "next/navigation";
import DashboardLayout from "./DashboardLayout";

/** Rotas da plataforma que não usam sidebar/header (ex.: certificado para impressão). */
const ROTAS_SEM_SHELL = ["/certificado"];

interface PlatformShellProps {
  children: React.ReactNode;
}

export default function PlatformShell({ children }: PlatformShellProps) {
  const pathname = usePathname();
  const semShell = ROTAS_SEM_SHELL.some((rota) => pathname?.startsWith(rota));

  if (semShell) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
