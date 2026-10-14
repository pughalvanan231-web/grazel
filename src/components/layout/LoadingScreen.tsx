import { Preloader } from '@/components/editorial/Preloader';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <Preloader
      onComplete={onComplete}
      brandName="GRAZEL"
      tagline="THE ART OF TIMELESS ELEGANCE"
      origin="TIRUPPUR ATELIER"
      since="2021"
      duration={1400}
    />
  );
}
