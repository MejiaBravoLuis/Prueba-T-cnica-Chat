import { cors } from "hono/cors";
import { Hono } from "hono";
import mensajes from "./routes/mensajes";
import chats from "./routes/chats";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

// rutas
app.get("/", (c) => {
  return c.json({ status: "ok" });
});

app.route("/chats", chats);
app.route("/chats", mensajes);

export default app;