export interface INotyMessage {
  type: 'success' | 'error';
  message: string;
}

export interface INoty extends INotyMessage {
  id: number;
  isHiding: boolean;
}
