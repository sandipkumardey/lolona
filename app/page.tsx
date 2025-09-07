import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="h-[100dvh] w-full">
      <Navbar />
      <div className="relative h-full w-full p-inset">
        <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
