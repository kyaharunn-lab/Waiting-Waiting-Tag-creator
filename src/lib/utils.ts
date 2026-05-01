
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parsePrice(val: string | undefined | number): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return val;
  const cleanVal = val.toString()
    .replace(/[₺\s\.]/g, '')
    .replace(',', '.');
  return parseFloat(cleanVal) || 0;
}

export function formatPrice(val: number): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}
