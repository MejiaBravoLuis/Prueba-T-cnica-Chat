import { Mensaje } from "../types";

export const MensajesModel = {
  findByChatId: async (sql: any, chatId: number): Promise<Mensaje[]> => {
    return await sql`
      SELECT * FROM mensajes
      WHERE chat_id = ${chatId}
      ORDER BY created_at ASC
    `;
  },

  create: async (sql: any, chatId: number, contenido: string): Promise<Mensaje[]> => {
    return await sql`
      INSERT INTO mensajes (chat_id, contenido, direccion)
      VALUES (${chatId}, ${contenido}, 'saliente')
      RETURNING *
    `;
  },

  delete: async (sql: any, id: number): Promise<Mensaje[]> => {
    return await sql`
      DELETE FROM mensajes
      WHERE id = ${id}
      RETURNING *
    `;
  }
};