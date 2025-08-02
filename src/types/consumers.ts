export interface ConsumerCallback {
  (content: Record<string, unknown>): Promise<void> | void;
}
