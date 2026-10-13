import { useCallback, useEffect, useRef, useState } from 'react';

/** Copia para a área de transferência e mantém `copied` ligado por 1.6s. */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback((text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }, []);
  return [copied, copy] as const;
}
