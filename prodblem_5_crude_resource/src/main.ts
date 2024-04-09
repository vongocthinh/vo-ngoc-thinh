import * as Express from "express";
import * as BodyParser from "body-parser";
import { Request, Response } from "express";
import { IFilter, IUser, UserService } from "./service";

const app = Express();
const PORT = 3000;

app.use(BodyParser.json());

const userService = new UserService();

app.post("/user", async (req: Request, res: Response) => {
  const newData = req.body as IUser;
  const result = await userService.createUser(newData);
  if (result.success)
  {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.get("/users", (req: Request, res: Response) => {
  const { page, limit, name, email, phone } = req.query;
  const filter: IFilter = {
    email: email as string,
    name: name as string,
    phoneNumber: phone as string,
  }
  const pageNum = parseInt(page as string);
  const pageSize = parseInt(limit as string) ?? 10;
  const result = userService.listUsers(pageNum, pageSize, filter);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.get("/user/id/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = userService.getUserById(id);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.get("/user/email/:email", (req: Request, res: Response) => {
  const email = req.params.email as string;
  const result = userService.getUserByEmail(email);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.put("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const newData = req.body as IUser;
  newData.id = id;
  const result = await userService.updateUser(newData);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await userService.deleteUser(id);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(result.statusCode ?? 500).json({ error: result.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
