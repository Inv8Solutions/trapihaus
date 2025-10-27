"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Search from "./Search";
import Accomodation from "./Accomodation";
import type { SearchParams } from "./page";

// Map URL category to search property type format
const getCategoryDisplayName = (category: string | null) => {
  if (!category) return 'Hotels';
  
  const categoryMap: Record<string, string> = {
    'hotel': 'Hotels',
    'apartment': 'Apartments',
    'transient': 'Transients',
  };
  
  return categoryMap[category.toLowerCase()] || 'Hotels';
};

export default function BrowseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchParamsState, setSearchParamsState] = useState<SearchParams>({
    propertyType: getCategoryDisplayName(categoryParam),
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  // Update property type when URL category changes
  useEffect(() => {
    if (categoryParam) {
      setSearchParamsState(prev => ({
        ...prev,
        propertyType: getCategoryDisplayName(categoryParam),
      }));
    }
  }, [categoryParam]);

  return (
    <>
      <Search onSearch={setSearchParamsState} />
      <Accomodation searchParams={searchParamsState} />
    </>
  );
}