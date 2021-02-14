export interface INotyMessage {
  type: 'success' | 'error';
  message: string;
  autoHide: boolean;
}

export interface INoty extends INotyMessage {
  id: number;
  isHiding: boolean;
}
