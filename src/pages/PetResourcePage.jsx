import resource from "../pics/resource.jpg";
import resource_2 from "../pics/resource_2.jpg";

export default function PetResourcePage() {
  return (
    <div className="flex resourece-container bg-orange-900 text-white text-left lg:grid lg:grid-cols-2 mb-12">
      <div className="resource-image hidden lg:block h-100%">
        <img src={resource_2} alt="" className="h-full object-cover" />
      </div>
      <div className="lg:flex lg:h-full overflow-y-auto">
        <section className="flex flex-col gap-5 lg:flex lg:flex-col lg:overflow-y-auto lg:h-screen">
          <div className="resource-title text-4xl font-semibold p-7">
            <h1>Keeping Your Furry Friends Safe: Lost Pet Prevention and Pet Care Essentials</h1>
          </div>
          <div className="resource-content font-light p-7">
            Our furry friends bring immeasurable joy and companionship to our lives, and as
            responsible pet owners, it is our duty to ensure their safety and well-being. Preventing
            lost pets and providing proper care are essential aspects of responsible pet ownership.
            In this article, we'll explore some invaluable tips and pet care essentials to keep your
            beloved pets safe and happy.
          </div>
          <div className="resource-image">
            <img src={resource} alt="resource" />
          </div>
          <div className="advertise bg-zinc-900 p-5">
            <div classNme="advertise-content">
              Looking to ensure your furry friend's well-being and happiness? Check out these
              comprehensive Pet Care Essentials at ASPCA, where you'll find expert guidance on
              nutrition, grooming, health, and behavior:{" "}
              <a
                target="_blank"
                href="https://www.aspca.org/pet-care"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                https://www.aspca.org/pet-care
              </a>
              .
            </div>
          </div>
          <div className="resource-content font-light p-7">
            <h2 className="text-2xl font-semibold mb-3">Lost Pet Prevention</h2>
            <div className="article">
              Microchip Identification: Microchipping your pet is highly effective for
              identification if they become lost. This small device is implanted under the skin and
              contains essential information such as your contact details. Collar and ID Tags: Make
              sure your pet always wears a collar with an up-to-date identification tag, including
              your name and phone number, to facilitate easy contact if they get lost. Secure
              Fencing: Regularly inspect and reinforce your yard's fencing to prevent potential
              escape routes for your pets. Ensure gates are securely locked and consider installing
              barriers for escape-prone pets. Supervised Outdoor Time: Always supervise your pets
              during outdoor activities. Use a leash for dogs and consider a harness and leash for
              outdoor cats to keep them safe. Safe Transportation: When traveling with your pet in a
              vehicle, use a secure crate or a pet seat belt for their safety. Never leave pets
              alone in a parked car, especially in warm weather, to avoid heatstroke.
            </div>
          </div>
          <div className="resource-content font-light p-7">
            <h2 className="text-2xl font-semibold mb-3">Pet Care Essentials</h2>
            <div className="article">
              Proper Nutrition: Consult your veterinarian to determine the appropriate diet for your
              pet's age, size, and health. Provide a balanced diet that meets their nutritional
              needs and avoid feeding them harmful human foods. Regular Exercise: Engage your pets
              in regular physical activity to maintain a healthy weight and stimulate their minds.
              Play fetch with your dog, use interactive toys for cats, or take them for walks to
              keep them mentally and physically stimulated. Regular Vet Check-ups: Schedule routine
              visits to the veterinarian for wellness check-ups, vaccinations, and preventive care.
              Early detection of health issues leads to better outcomes. Grooming and Hygiene:
              Regular grooming is crucial for your pet's health and comfort. Brush their coat, trim
              their nails, clean their ears, and brush their teeth regularly to prevent dental
              problems. Safe Environment: Create a safe living space for your pets by removing toxic
              plants, securing hazardous substances, and keeping small objects out of their reach.
              Cats, in particular, can be curious and may get into trouble if unsupervised.
            </div>
          </div>
          <div className="resource-content font-light p-7">
            <div className="article">
              As responsible pet owners, we must prioritize the safety and well-being of our furry
              companions. By implementing lost pet prevention measures, such as microchipping and ID
              tags, and adhering to essential pet care practices, such as proper nutrition and
              regular vet check-ups, we can ensure our pets lead happy, healthy lives by our sides.
              Remember, a little effort goes a long way in keeping our beloved furry friends safe
              and protected.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
