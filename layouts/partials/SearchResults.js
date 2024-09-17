"use client";

import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useSearchParams } from "next/navigation";
import Posts from "./Posts";
import Head from "next/head";

const SearchResults = ({ authors }) => {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const keyword = slugify(key || "");
  const { posts } = useSearchContext();

  const searchResults = posts.filter((product) => {
    if (product.frontmatter.draft) {
      return !product.frontmatter.draft;
    }
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (
      product.frontmatter.tags.find((tag) => slugify(tag).includes(keyword))
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  // Générer un titre dynamique
  const pageTitle = `Résultats de recherche pour "${key}" | Jardins Passion`;

  // Générer une description dynamique
  const pageDescription = searchResults.length > 0
    ? `Découvrez ${searchResults.length} résultats pour votre recherche "${key}". Explorez nos articles pertinents sur ce sujet.`
    : `Désolé, aucun résultat trouvé pour "${key}". Essayez une autre recherche ou parcourez nos catégories populaires.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow" />
      </Head>
      <h1 className="h2 mb-8 text-center">
        Résultats de recherche pour <span className="text-primary">{key}</span>
      </h1>
      {searchResults.length > 0 ? (
        <Posts posts={searchResults} authors={authors} />
      ) : (
        <div className="py-24 text-center text-h3 shadow">Aucun résultat trouvé</div>
      )}
    </>
  );
};

export default SearchResults;