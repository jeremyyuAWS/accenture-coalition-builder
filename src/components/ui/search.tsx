import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
}

export function SearchInput({ className, onSearch, ...props }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        className={cn("pl-10", className)}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}