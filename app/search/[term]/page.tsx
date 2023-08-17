import ResultsList from "@/components/result-list";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { term: string };
  searchParams: SearchParams;
};

export const revalidate = 300;

async function SearchPage({ params: { term }, searchParams }: Props) {
  if (!term) {
    redirect("/");
  }

  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await response.json()) as PageResult[];

  console.log(results);

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;
