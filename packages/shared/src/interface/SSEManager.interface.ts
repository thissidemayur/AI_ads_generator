export interface ISSEManager {
  joinStream(adId: string, onMessage: (data: string) => void): () => void;
}
