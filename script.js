import { Action } from './Action.js';
import { ActionsManager } from './ActionsManager.js';

const manager = new ActionsManager();

const transactionsBody = document.getElementById('transactions-body');
const balance = document.getElementById('balance');

function renderTable() {

    transactionsBody.innerHTML = '';
    
    manager.getActions().forEach(action => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${action.getId()}</td>
            <td>${action.getDescription()}</td>
            <td class="${(action.getType() === 'income' ? 'text-success' : 'text-danger')}">
                ${(action.getType() === 'income' ? '+' : '-') + action.getAmount().toFixed(2)}₪
            </td>
            <td>
                <button class="btn btn-warning btn-sm m-2" onclick="editTransaction(${action.getId()})">Edit</button>
                <button class="btn btn-danger btn-sm m-2" onclick="deleteTransaction(${action.getId()})">Delete</button>
            </td>
        `;
        row.classList.add(action.getType() === 'income' ? 'income-row' : 'outcome-row');
        
        transactionsBody.appendChild(row);
    });
}

function updateBalance () {
    if(manager.getBalance().toFixed(2) >= 0){
        balance.innerHTML = `<p class="text-success text-center mb-0 p-2 marcellus-sc-regular fw-bold text-shadow fs-3">Balance: ${manager.getBalance().toFixed(2)}₪</p>`;
    } else {
        balance.innerHTML = `<p class="text-danger text-center mb-0 p-2 marcellus-sc-regular fw-bold text-shadow fs-3">Balance: ${manager.getBalance().toFixed(2)}₪</p>`
    }
}

function handleFormSubmit(event) {

    event.preventDefault();

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0 || !description.trim()) {
        alert('Please enter valid values.');
        return;
    }

    const action = new Action(type, description, amount);
    manager.addAction(action);

    document.getElementById('type').value = 'income';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';


    renderTable();
    updateBalance();
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    updateBalance();
});

window.editTransaction = function(id) {
    const newAmount = prompt('Enter new amount:');
    if (newAmount) {
        manager.updateAction(id, parseFloat(newAmount));
        renderTable();
        updateBalance();
    }
}

window.deleteTransaction = function(id) {
    manager.deleteAction(id);
    renderTable();
    updateBalance();
}
