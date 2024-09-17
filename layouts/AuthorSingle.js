import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Social from "./components/Social";
import MDXContent from "./partials/MDXContent";
import SeoMeta from "./partials/SeoMeta";

const NewsletterCTA = () => (
  <div style={{textAlign: "center", backgroundColor: "#f0f8f0", padding: "20px", margin: "30px 0", borderRadius: "8px"}}>
    <p style={{fontSize: "24px", color: "#333333", marginBottom: "15px"}}>
      <strong>Cultivez votre passion du jardinage !</strong>
    </p>
    <p style={{fontSize: "16px", color: "#555555", marginBottom: "20px"}}>
      Recevez nos meilleurs conseils de jardinage directement dans votre boîte mail.
    </p>
    <a href="https://www.fastercook.fr/letter-potager" target="_blank" rel="noopener noreferrer" style={{display: "inline-block", backgroundColor: "#099141", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold"}}>
      S'inscrire à la newsletter
    </a>
  </div>
);

const AuthorSingle = ({ frontmatter, content }) => {
  const { description, social, title, image } = frontmatter;

  return (
    <>
      <SeoMeta
        description={description ? description : content.slice(0, 120)}
      />
      <section className="section">
        <div className="container">
          <div className="md:px-24">
            {/* Image, titre et icônes sociales centrés */}
            <div className="mb-8 text-center">
              {image && (
                <div className="mb-4">
                  <Image
                    src={image}
                    className="mx-auto rounded-lg"
                    height={250}
                    width={250}
                    alt={title}
                  />
                </div>
              )}
              {markdownify(title, "h1", "h2 mb-4")}
              <Social source={social} className="social-icons-simple" />
            </div>
            {/* Contenu aligné à gauche */}
            <div className="content text-left">
              <MDXContent content={content} />
            </div>
            {/* CTA Newsletter */}
            <NewsletterCTA />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorSingle;