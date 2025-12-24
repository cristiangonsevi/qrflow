export interface MessageBroker {
  connect(): Promise<void>;
  publish(event: string, data: any): Promise<void>;
  subscribe(event: string, handler: (data: any) => void): Promise<void>;
  close(): Promise<void>;
}
