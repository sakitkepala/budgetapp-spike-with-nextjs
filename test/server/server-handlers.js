import { rest } from "msw";
import * as budgetDB from "../data/budget";

const handlers = [
  rest.get("/budget", async (req, res, context) => {
    const dataBudget = await budgetDB.readAll();
    return res(context.json({ data: dataBudget }));
  }),
];

export { handlers };
