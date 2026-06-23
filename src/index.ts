import { Hono } from "hono";
import mensajes from "./routes/mensajes";
import chats from "./routes/chats";
import { cors } from "hono/cors";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({ status: "ok" });
});

app.route("/chats", chats);
app.route("/chats", mensajes);

app.use("*", cors());

export default app;