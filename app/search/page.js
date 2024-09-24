import SearchResults from "@layouts/partials/SearchResults";
import { getSinglePage } from "@lib/contentParser";
import { Suspense } from "react";
import SeoMeta from "@layouts/partials/SeoMeta";

const SearchPage = async () => {
  const authors = await getSinglePage("content/authors");

  // Définition statique des métadonnées SEO
const pageTitle = "Recherche | Éco vrac";
const metaTitle = "Découvrez des astuces de bien-être naturel sur Éco vrac";
const metaDescription = "Explorez nos articles sur le bien-être, les modes de vie durables et les solutions écologiques pour une vie plus équilibrée. Éco vrac : votre source d'inspiration pour un quotidien naturel et épanoui.";
  return (
    <>
      <SeoMeta 
        title={pageTitle}
        meta_title={metaTitle}
        description={metaDescription}
        noindex={true}
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