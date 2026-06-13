let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let editIndex = null;

// Load expenses when page opens
renderExpenses();

// Add button click
document
    .getElementById("addBtn")
    .addEventListener("click", addExpense);

// Add or Update Expense
function addExpense() {

    const amount =
        document.getElementById("amount").value;

    const description =
        document.getElementById("description").value;

    const category =
        document.getElementById("category").value;

    if (
        amount === "" ||
        description === "" ||
        category === ""
    ) {
        alert("Fill all fields");
        return;
    }

    const expense = {
        amount,
        description,
        category
    };

    // ADD OR EDIT
    if (editIndex === null) {

        expenses.push(expense);

    } else {

        expenses[editIndex] = expense;

        editIndex = null;

        document.getElementById("addBtn").textContent =
            "Add Expense";
    }

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
}

// Display Expenses
function renderExpenses() {

    const expenseList =
        document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {

        expenseList.innerHTML += `
        
        <li class="list-group-item d-flex justify-content-between align-items-center">

            <div>
                Rs ${expense.amount} -
                ${expense.description} -
                ${expense.category}
            </div>

            <div>
                <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editExpense(${index})">
                    Edit
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${index})">
                    Delete
                </button>
            </div>

        </li>
        `;
    });
}

// Delete Expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();
}

// Edit Expense
function editExpense(index) {

    const expense = expenses[index];

    document.getElementById("amount").value =
        expense.amount;

    document.getElementById("description").value =
        expense.description;

    document.getElementById("category").value =
        expense.category;

    editIndex = index;

    document.getElementById("addBtn").textContent =
        "Update Expense";
}