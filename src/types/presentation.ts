export interface Slide {
  subtitle?: string;
  bulletPoints: string[];
}

export interface PresentationData {
  slides: Slide[];
}

export interface PresentationModalProps {
  open: boolean;
  onClose: () => void;
  presentationData: PresentationData;
}
