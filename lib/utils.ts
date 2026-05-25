import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function getDifficultyColor(difficulty: string): string {
  const colors = {
    iniciante: "text-success",
    intermediario: "text-primary",
    avancado: "text-orange-500",
  };
  return colors[difficulty as keyof typeof colors] || "text-secondary";
}

export function getDifficultyLabel(difficulty: string): string {
  const labels = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };
  return labels[difficulty as keyof typeof labels] || difficulty;
}
