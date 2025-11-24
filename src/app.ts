import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parsers
app.use(express.json());

//cors
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

export default app;
