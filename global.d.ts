// Global JSX typing for custom elements
// Allows usage of <elevenlabs-convai /> in TSX files
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": any;
    }
  }
}
