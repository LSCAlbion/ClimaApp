import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-md bg-red-950/40 border border-red-800/60 text-red-200 p-4 rounded-2xl flex items-center gap-3 mt-6 animate-fade-in">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}