"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { publicMarketplaceApi } from "@/services/marketplace";

export function ProductSearchBar({
  value,
  onChange,
  onSubmit
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const [suggestions, setSuggestions] = useState<{ label: string; slug: string }[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(JSON.parse(localStorage.getItem("lankacart-recent-searches") ?? "[]"));
  }, []);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (value.trim()) publicMarketplaceApi.searchSuggestions(value).then(setSuggestions).catch(() => setSuggestions([]));
      else publicMarketplaceApi.popularSearches().then(setSuggestions).catch(() => setSuggestions([]));
    }, 250);
    return () => window.clearTimeout(handle);
  }, [value]);

  const submit = () => {
    const next = [value, ...recent.filter((item) => item !== value)].filter(Boolean).slice(0, 5);
    localStorage.setItem("lankacart-recent-searches", JSON.stringify(next));
    setRecent(next);
    onSubmit();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-md border bg-card p-2">
        <Search className="ml-2 h-5 w-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          className="border-0 focus-visible:ring-0"
          placeholder="Search products"
        />
        <Button onClick={submit}>Search</Button>
      </div>
      {(suggestions.length || recent.length) ? (
        <div className="absolute z-20 mt-2 w-full rounded-md border bg-card p-2 text-sm shadow-lg">
          {[...recent.map((label) => ({ label, slug: label })), ...suggestions].slice(0, 8).map((item, index) => (
            <button key={`${item.slug}-${index}`} className="block w-full rounded px-3 py-2 text-left hover:bg-muted" onClick={() => onChange(item.label)}>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
