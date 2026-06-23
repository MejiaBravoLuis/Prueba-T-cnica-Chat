import { Hono } from "hono";
import mensajes from "./routes/mensajes";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({ status: "ok" });
});

app.route("/chats", mensajes);

export default app;