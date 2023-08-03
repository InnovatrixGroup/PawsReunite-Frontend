import "../styles/ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-container text-left h-screen max-w-7xl lg:flex ">
      <div className="contact-container-msg h-full p-10 md:p-36 lg:w-7/12 lg:p-40 lg:pt-32">
        <h1 className="text-2xl font-semibold mt-32 mb-24">
          Have a question, feedback, <br />
          or need assistance? <br />
          Reach out to us!
        </h1>
        <address className="flex flex-col not-italic">
          <p className="font-semibold">PawsReunite</p>
          <a href="mailto:PawsReunite@gmail.com" className="underline">
            PawsReunite@gmail.com
          </a>
          <a href="tel:0431754195" className="underline">
            0200 000 000
          </a>
          <p>Paws-Reunite.netlify.app</p>
        </address>
      </div>
      <div className="lg-right-bg hidden h-full w-5/12 lg:block"></div>
    </div>
  );
}
