import { Hono } from "hono";
import { createDb } from "../db/client";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/:chatId/mensajes", async (c) => {
  try {
    const chatId = Number(c.req.param("chatId"));

    if (isNaN(chatId)) {
      return c.json({ status: "error", message: "ID de chat invalido" }, 400);
    }

    const sql = createDb(c.env.DATABASE_URL);

    const chat = await sql`
      SELECT * FROM chats WHERE id = ${chatId}
    `;

    if (chat.length === 0) {
      return c.json({ status: "error", message: "Chat no encontrado" }, 404);
    }

    const mensajes = await sql`
      SELECT * FROM mensajes
      WHERE chat_id = ${chatId} AND activo = true
      ORDER BY created_at ASC
    `;

    return c.json({
      status: "success",
      mensajes,
    });

  } catch (error) {
    return c.json({
      status: "error",
      message: "Error interno"
    }, 500);
  }
});

app.post("/:chatId/mensajes", async (c) => {
  try {
    const chatId = Number(c.req.param("chatId"));
    const body = await c.req.json();

    const contenido = body.contenido?.trim();

    if (isNaN(chatId)) {
      return c.json(
        { status: "error", message: "ID de chat invalido" },
        400
      );
    }

    if (
      typeof contenido !== "string" ||
      contenido.replace(/[\s\u200B-\u200D\uFEFF\u00AD\u3164]/g, "").length === 0
    ) {
      return c.json(
        { status: "error", message: "Content is required" },
        400
      );
    }

    const sql = createDb(c.env.DATABASE_URL);

    const chat = await sql`
      SELECT * FROM chats WHERE id = ${chatId}
    `;

    if (chat.length === 0) {
      return c.json(
        { status: "error", message: "Chat no encontrado" },
        404
      );
    }

    const nuevoMensaje = await sql`
      INSERT INTO mensajes (chat_id, contenido, direccion, activo)
      VALUES (${chatId}, ${contenido}, 'saliente', true)
      RETURNING *
    `;

    return c.json({
      status: "success",
      mensajes: nuevoMensaje
    });

  } catch (error) {
    return c.json(
      { status: "error", message: "Error interno" },
      500
    );
  }
});

app.delete("/mensajes/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    if (isNaN(id)) {
      return c.json(
        { status: "error", message: "ID de mensaje invalido" },
        400
      );
    }

    const sql = createDb(c.env.DATABASE_URL);

    const actualizado = await sql`
      UPDATE mensajes
      SET activo = false
      WHERE id = ${id}
      RETURNING *
    `;

    if (actualizado.length === 0) {
      return c.json(
        { status: "error", message: "Mensaje no encontrado" },
        404
      );
    }

    return c.json({
      status: "success",
      mensajes: actualizado
    });

  } catch (error) {
    return c.json(
      { status: "error", message: "Error interno" },
      500
    );
  }
});

export default app;