import express from "express";
import cors from "cors";
import auditRoutes from "./routes/auditRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", auditRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: "Route not found." }
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "An unexpected server error occurred." }
  });
});

export default app;
