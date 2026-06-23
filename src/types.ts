export type Mensaje = {
  id: number;
  chat_id: number;
  contenido: string;
  direccion: "entrante" | "saliente";
  created_at: string;
};