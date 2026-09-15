import { ImageCarrusel } from "@/components";
import { FaBed, FaWhatsapp } from "react-icons/fa";
import { LuCar, LuCctv, LuShowerHead } from "react-icons/lu";
import { MdLocationOn, MdRoomService, MdTv, MdWifi } from "react-icons/md";

export default function Home() {
  return (
    <main className="min-h-screen bg-white-01 text-black-02">
      <header className="fixed top-0 z-50 w-full border-b border-white-03/70 bg-white-01/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 text-primary">
            <FaBed className="size-6" />
            <span className="text-lg font-extrabold tracking-wide">
              Hostal Barreto
            </span>
          </div>

          <a
            aria-label="Escribir por WhatsApp"
            className="flex size-10 items-center justify-center rounded-full bg-green-01 text-white shadow-md"
            href="https://wa.me/51901269412"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaWhatsapp className="size-5" />
          </a>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative flex h-[85vh] min-h-140 w-full flex-col justify-end overflow-hidden">
          <img
            alt="Fachada principal de Hostal Barreto"
            className="absolute inset-0 h-full w-full object-cover"
            src="/fachada.webp"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/35 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white md:px-10 lg:px-16">
            <h1 className="mb-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              Bienvenidos a Hostal Barreto
            </h1>
            <p className="max-w-2xl text-lg text-white/90 md:text-2xl">
              Tu descanso ideal en el corazón de Tacna.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl border border-white-03 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-2xl font-bold text-primary">
                Hospitalidad Tacneña
              </h3>
              <p className="text-gray-05">
                Atención personalizada y el calor de hogar que buscas en tu
                viaje a la Ciudad Heroica.
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-white-03 bg-white p-5 shadow-sm text-center">
              <MdWifi className="size-8 text-primary mx-auto" />
              <span className="mt-4 font-semibold text-black-02">Wi-Fi</span>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-white-03 bg-white p-5 shadow-sm text-center">
              <LuCar className="size-8 text-primary mx-auto" />
              <span className="mt-4 font-semibold text-black-02">Cochera</span>
            </div>
          </div>
        </section>

        <section id="habitaciones" className="overflow-hidden py-12">
          <div className="mx-auto mb-6 w-full max-w-7xl px-6 md:px-10">
            <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
              Nuestra Galería
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-yellow-02" />
          </div>

          <ImageCarrusel />
        </section>

        <section
          id="ubicacion"
          className="mx-auto max-w-7xl px-6 py-16 md:px-10"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
              Ubicación
            </h2>
            <p className="mt-2 text-gray-05">
              Calle Federico Barreto 370, Tacna
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white-03 shadow-sm">
            <iframe
              allowFullScreen
              className="h-95 w-full md:h-120"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2881571713526!2d-70.2396693555725!3d-17.998438399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915ac5aed090d7a1%3A0xf3e4e1fbd0c1dc9b!2sHostal%20Barreto!5e0!3m2!1ses-419!2spe!4v1778475771885!5m2!1ses-419!2spe"
            />
            <a
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black-02 shadow-md"
              href="https://maps.google.com/?q=Hostal+Barreto+Tacna"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MdLocationOn className="size-4 text-red-01" />
              Ver en Google Maps
            </a>
          </div>
        </section>

        <section className="bg-primary py-6 text-white">
          <div className="mx-auto flex max-w-5xl items-center justify-around px-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <LuCctv className="size-6" />
              <span className="text-[11px] font-bold uppercase">
                Video Vigilancia
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdRoomService className="size-6" />
              <span className="text-[11px] font-bold uppercase">
                Atención 24 h
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdTv className="size-6" />
              <span className="text-[11px] font-bold uppercase">Cable TV</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <LuShowerHead className="size-6" />
              <span className="text-[11px] font-bold uppercase">
                Agua Caliente
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-white-02">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-center md:flex-row md:items-center md:justify-between md:px-10 md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-primary">Hostal Barreto</h3>
            <p className="mt-2 text-gray-05">
              Su mejor elección de hospedaje en Tacna.
            </p>
          </div>

          <p className="text-sm text-gray-05">
            © 2026 Hostal Barreto. Tacna, Perú.
          </p>
        </div>
      </footer>
    </main>
  );
}
