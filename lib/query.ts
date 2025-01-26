"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useSetSearchParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const push = useCallback(
    (name: string, value: string) => {
      router.push(pathname + "?" + createQueryString(name, value));
    },
    [createQueryString, pathname, router],
  );

  const replace = useCallback(
    (name: string, value: string) => {
      router.replace(pathname + "?" + createQueryString(name, value));
    },
    [createQueryString, pathname, router],
  );

  return useMemo(() => ({ push, replace }), [push, replace]);
}
