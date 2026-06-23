export type Mensaje = {
  id: number;
  chat_id: number;
  contenido: string;
  direccion: "entrante" | "saliente";
  created_at: string;
};

export type Chat = {
  id: number;
  empresa_id: number;
  empresa_nombre: string;
  nombre: string;
  telefono: string;
};