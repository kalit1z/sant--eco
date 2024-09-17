import SearchResults from "@layouts/partials/SearchResults";
import { getSinglePage } from "@lib/contentParser";
import { Suspense } from "react";
import SeoMeta from "@layouts/partials/SeoMeta";

const SearchPage = async () => {
  const authors = await getSinglePage("content/authors");

  // Définition statique des métadonnées SEO
  const pageTitle = "Recherche | Jardins Passion";
  const metaTitle = "Recherchez du contenu sur Jardins Passion";
  const metaDescription = "Utilisez notre fonction de recherche pour trouver rapidement les articles, auteurs et sujets qui vous intéressent sur Jardins Passion. Découvrez notre contenu varié et informatif.";

  return (
    <>
      <SeoMeta 
        title={pageTitle}
        meta_title={metaTitle}
        description={metaDescription}
      />
      <div className="section">
        <div className="container">
          <Suspense
            fallback={
              <h1 className="h2 mb-8 text-center">
                Recherche <span className="text-primary">...</span>
              </h1>
            }
          >
            <SearchResults authors={authors} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SearchPage;