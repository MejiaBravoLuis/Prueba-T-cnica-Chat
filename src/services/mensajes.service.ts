import { MensajesModel } from "../models/mensajes.model";

export const MensajesService = {
  getMensajes: async (db: any, chatId: number) => {
    return await MensajesModel.findByChatId(db, chatId);
  },

  crearMensaje: async (db: any, chatId: number, contenido: string) => {
    return await MensajesModel.create(db, chatId, contenido);
  },

  eliminarMensaje: async (db: any, id: number) => {
    return await MensajesModel.delete(db, id);
  }
};