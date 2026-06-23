import { Hono } from "hono";
import { createDb } from "../db/client";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  try {
    const sql = createDb(c.env.DATABASE_URL);

    const chats = await sql`
      SELECT 
        c.id,
        e.nombre AS empresa_nombre,
        c.empresa_id,
        c.nombre,
        c.telefono
      FROM chats c
      JOIN empresas e ON c.empresa_id = e.id
      ORDER BY c.id DESC
    `;

    return c.json({
      status: "success",
      chats,
    });

  } catch (error) {
    return c.json({
      status: "error",
      message: "Error interno"
    }, 500);
  }
});

export default app;
