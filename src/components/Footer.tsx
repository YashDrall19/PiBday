import { Heart } from 'lucide-react';
import { config } from '@/config';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-dceeff to-cream py-12 text-center">
      <div className="relative z-10 mx-auto max-w-md px-6">
        <p className="font-script text-3xl leading-snug text-gradient">Happy Birthday, {config.name}</p>
        <p className="mt-3 flex items-center justify-center gap-1 text-sm text-ink/60">
          made with <Heart className="h-4 w-4 fill-rose text-rose" /> just for you
        </p>
      </div>
    </footer>
  );
}
