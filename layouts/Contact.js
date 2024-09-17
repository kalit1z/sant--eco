import config from "@config/config";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container max-w-[700px]">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <form
          className="contact-form mb-10"
          method="POST"
          action={contact_form_action}
        >
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="name">
              Nom
            </label>
            <input
              className="form-input w-full"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="email">
              Email
            </label>
            <input
              className="form-input w-full"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="subject">
              Sujet
            </label>
            <input
              className="form-input w-full"
              name="subject"
              type="text"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="message">
              Message
            </label>
            <textarea className="form-textarea w-full" rows="7" />
          </div>
          <button className="btn btn-outline-primary">Envoyer</button>
        </form>

        <div className="mt-10 text-center">
          <h3 className="mb-4">Bienvenue sur Jardins Passions</h3>
          <p className="mb-4">
            Nous sommes ravis de vous accueillir sur notre site dédié à la passion du jardinage. Chez Jardins Passions, nous aimons aider les jardiniers, qu'ils soient débutants ou expérimentés, à cultiver leur passion et à faire fleurir leurs espaces verts.
          </p>
          <p className="mb-4">
            Si vous avez des questions, des suggestions ou simplement envie de partager votre expérience de jardinage, n'hésitez pas à nous contacter. C'est toujours un plaisir pour nous d'échanger avec des passionnés comme vous !
          </p>
          <p className="mb-4">
            Que vous ayez besoin de conseils sur le choix des plantes, des astuces pour l'entretien de votre jardin, ou des informations sur les dernières tendances en matière de jardinage écologique, notre équipe est là pour vous aider.
          </p>
          <p>
            Ensemble, faisons de chaque espace vert un petit coin de paradis. Merci de faire partie de la communauté Jardins Passions !
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center">Foire Aux Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold">Comment puis-je devenir partenaire de Jardins Passions ?</h4>
              <p>Pour devenir partenaire, veuillez nous contacter via le formulaire ci-dessus en précisant "Partenariat" dans le sujet. Nous examinerons votre demande et vous répondrons dans les plus brefs délais avec plus d'informations sur notre programme de partenariat.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Quel est le délai de réponse habituel ?</h4>
              <p>Nous nous efforçons de répondre à toutes les demandes dans un délai de 48 heures ouvrables. Pour les questions urgentes, n'hésitez pas à nous contacter par téléphone.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Proposez-vous des consultations de jardinage personnalisées ?</h4>
              <p>Oui, nous offrons des consultations personnalisées. Veuillez nous contacter avec les détails de votre projet de jardinage, et nous vous proposerons un rendez-vous pour discuter de vos besoins spécifiques.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Comment puis-je m'abonner à votre newsletter ?</h4>
              <p>Vous pouvez vous abonner à notre newsletter directement depuis notre page d'accueil. Vous recevrez régulièrement des conseils de jardinage, des offres spéciales et des nouvelles sur nos derniers produits.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Organisez-vous des événements ou des ateliers de jardinage ?</h4>
              <p>Oui, nous organisons régulièrement des ateliers et des événements. Consultez notre page "Événements" pour voir le calendrier à venir ou inscrivez-vous à notre newsletter pour être informé des prochaines dates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;