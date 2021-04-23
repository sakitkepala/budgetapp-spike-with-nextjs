import dataBudget from "./data-budget.json";

let listBudget = [...dataBudget];

async function readAll() {
  return listBudget;
}

export { readAll };

// TODO:
// async function create(budget) {
//   listBudget.push(budget);
//   return budget;
// }

// async function read(budgetId) {
//   return listBudget.find((budget) => budget.id === budgetId);
// }

// async function reset() {
//   listBudget = [...dataBudget];
// }
