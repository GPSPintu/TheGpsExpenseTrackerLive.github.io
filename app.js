let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("form");
form.addEventListener("submit", addExpense);

const expenseList = document.getElementById("expenses");
expenseList.addEventListener("click", deleteOrEditExpense);

function addExpense(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const expense = {
    id: Date.now(),
    amount,
    description,
    category,
  };

  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  appendExpense(expense);

  form.reset();
}

function appendExpense(expense) {
  const li = document.createElement("li");
  li.setAttribute("data-id", expense.id);
  li.innerHTML = `
    <span>${expense.amount} - ${expense.description} - ${expense.category}</span>
    <button class="delete-btn">Delete</button>
    <button class="edit-btn">Edit</button>
  `;
  expenseList.appendChild(li);
}

function deleteOrEditExpense(e) {
  const target = e.target;

  if (target.classList.contains("delete-btn")) {
    const parent = target.parentElement;
    const id = parent.getAttribute("data-id");

    expenses = expenses.filter((expense) => expense.id !== Number(id));

    localStorage.setItem("expenses", JSON.stringify(expenses));

    parent.remove();
  }

  if (target.classList.contains("edit-btn")) {
    const parent = target.parentElement;
    const id = parent.getAttribute("data-id");
    const expense = expenses.find((expense) => expense.id === Number(id));

    const amountInput = document.getElementById("amount");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");

    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;

    expenses = expenses.filter((expense) => expense.id !== Number(id));

    localStorage.setItem("expenses", JSON.stringify(expenses));

    parent.remove();
  }
}

function loadExpenses() {
  expenses.forEach((expense) => {
    appendExpense(expense);
  });
}

loadExpenses();
