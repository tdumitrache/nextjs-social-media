"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const q = (form.q as HTMLInputElement).value.trim();

    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input type="text" placeholder="Search" className="pe-10" name="q" />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};

export default SearchField;
