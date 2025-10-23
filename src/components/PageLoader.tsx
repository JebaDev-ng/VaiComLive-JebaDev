import { cn } from "@/lib/utils";
import PulsatingDots from "@/components/PulsatingDots";

interface PageLoaderProps {
  isVisible: boolean;
}

function PageLoader({ isVisible }: PageLoaderProps): JSX.Element {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300",
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <PulsatingDots />
        <p className="mt-4 text-center text-sm font-hero-body tracking-wider text-white/80">
          
        </p>
      </div>
    </div>
  );
}

export default PageLoader;
