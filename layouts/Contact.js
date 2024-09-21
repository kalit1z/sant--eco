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
  <h3 className="mb-4">Découvrez l'univers d'Éco vrac</h3>
  <p className="mb-4">
    Plongez dans le monde éco-responsable d'Éco vrac, votre ressource en ligne dédiée à un mode de vie durable. Que vous soyez novice ou expert, notre mission est d'enrichir vos connaissances et de vous guider vers des choix plus respectueux de l'environnement.
  </p>
  <p className="mb-4">
    Votre voix compte ! Partagez vos réussites, vos défis ou vos idées novatrices. Chez Éco vrac, chaque échange contribue à faire grandir notre communauté engagée.
  </p>
  <p className="mb-4">
    De la réduction des déchets aux alternatives écologiques, en passant par la consommation responsable, notre équipe est là pour nourrir votre passion et soutenir vos projets verts.
  </p>
  <p>
    Transformons ensemble chaque geste du quotidien en un acte pour la planète. Merci d'être un maillon essentiel de la communauté Éco vrac !
  </p>
</div>

<div className="mt-16">
  <h3 className="mb-8 text-center">Questions fréquentes</h3>
  <div className="space-y-6">
    <div>
      <h4 className="mb-2 font-semibold">Comment débuter avec Éco vrac ?</h4>
      <p>Commencez par explorer nos articles et guides sur la page d'accueil. Vous y trouverez des conseils pratiques pour adopter un mode de vie plus durable.</p>
    </div>
    <div>
      <h4 className="mb-2 font-semibold">Quel est le délai de réponse d'Éco vrac ?</h4>
      <p>Nous nous efforçons de répondre à toutes les questions dans un délai de 48 heures ouvrables. Pour les urgences, utilisez le formulaire de contact en précisant votre demande.</p>
    </div>
    <div>
      <h4 className="mb-2 font-semibold">Proposez-vous des conseils personnalisés ?</h4>
      <p>Bien sûr ! N'hésitez pas à nous contacter via le formulaire pour des conseils adaptés à votre situation. Nous serons ravis de vous aider dans votre démarche éco-responsable.</p>
    </div>
    <div>
      <h4 className="mb-2 font-semibold">Comment rester informé des nouveautés d'Éco vrac ?</h4>
      <p>Inscrivez-vous à notre newsletter depuis la page d'accueil. Vous recevrez régulièrement des conseils, des astuces et nos dernières informations sur le mode de vie durable.</p>
    </div>
    <div>
      <h4 className="mb-2 font-semibold">Puis-je partager mes propres expériences sur Éco vrac ?</h4>
      <p>Absolument ! Nous encourageons le partage d'expériences. Utilisez notre formulaire de contact pour nous soumettre vos idées ou témoignages, nous serons ravis de les partager avec la communauté.</p>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Contact;