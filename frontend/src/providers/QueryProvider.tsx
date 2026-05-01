"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { queryClient } from "../lib/query/queryClient";

type QueryProviderProps = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};