class Employee {
    constructor(fname, lname, id) {
        this.fname = fname;
        this.lname = lname;
        this.id = id;

    }
}

// User interface
class UI {

    addEmployeeToList(employee) {
        const employee_list = document.querySelector('#employee-list');

        // create row
        const table_row = document.createElement('tr');

        // insert columns
        table_row.innerHTML = `
            <td>${employee.fname}</td>
            <td>${employee.lname}</td>
            <td>${employee.id}</td>
            <td><a href="#" class="delete">X<a></td>
        `;
        table_row.style.textAlign = 'center';
        table_row.style.color = 'purple';

        // append child to parent
        employee_list.appendChild(table_row);

    }

    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        // className
        div.className = `alert ${className}`;
        // create and append text node
        div.appendChild(document.createTextNode(message));
        // get parent container
        const parent = document.querySelector('.container');
        // get form
        const form_container = document.getElementById('employee-form');
        // insert Alert
        parent.insertBefore(div, form_container);


        // set timeout
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);

    }

    deleteEmployee(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('e-id').value = '';

    }

}

// Local storage
class EmployeeLocalStorage {

    static getEmployee() {
        let employees;
        if (localStorage.getItem('employees') === null) {
            employees = [];
        } else {
            employees = JSON.parse(localStorage.getItem('employees'));
        }
        return employees;

    }

    static displayEmployees() {
        const employees = EmployeeLocalStorage.getEmployee();

        employees.forEach(function (employee) {
            // instantiate UI
            const ui = new UI();

            // add employee
            ui.addEmployeeToList(employee);

        });

    }

    static addEmployee(employee) {
        const employees = EmployeeLocalStorage.getEmployee();

        employees.push(employee);

        localStorage.setItem('employees', JSON.stringify(employees));

    }

    
    static removeEmployee(id){
        const employees = EmployeeLocalStorage.getEmployee();

        employees.forEach(function(employee, index){
            if(employee.id === id){
                employees.splice(index, 1);

            }
            localStorage.setItem('employees', JSON.stringify(employees));

        });

    }
}

// DOM load content
document.addEventListener('DOMContentLoaded', EmployeeLocalStorage.displayEmployees());

// Event Listeners for Add Employee
document.getElementById('employee-form').addEventListener('submit',
    function (e) {
        // get input values
        const first_name = document.getElementById('fname').value, last_name = document.getElementById('fname').value,
            employee_id = document.getElementById('e-id').value;


        // instantiate employee class
        const employee1 = new Employee(first_name, last_name, employee_id);

        // instantiate UI
        const ui = new UI();

        // check if empty
        if (first_name === '' || last_name === '' || employee_id === '') {
            ui.showAlert('Some fields are empty!', 'error');
        } else {
            // Add Employee
            ui.addEmployeeToList(employee1);

            // Add to local storage
            EmployeeLocalStorage.addEmployee(employee1);

            // show sucess if added
            ui.showAlert('Employee added sucessfully', 'sucess');

            // clear fields
            ui.clearFields();
        }

        e.preventDefault()
    });

// Delete Employee Event Listeners
document.getElementById('employee-list').addEventListener('click',
    function (e) {
        // instantiate User Interface
        const ui = new UI();

        // confirm delete
        if (confirm('Are you sure you want to delete the employee?')) {
            // Delete employee
            ui.deleteEmployee(e.target);

            //  Remove book from Local storage using ISBN#
            EmployeeLocalStorage.removeEmployee(
                e.target.parentElement.previousElementSibling.textContent
            );

            // show delete message
            ui.showAlert('Employee deleted sucessfully', 'sucess');

        }


        e.preventDefault();
    }
);