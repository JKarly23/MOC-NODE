import { Employee } from '../src/interfaces/employee.interface';

const employees: Employee[] = [
    { id: 1, name: 'Alice', email: 'alice@company.com', role: 'employee', isActive: true, managerId: 3 },
    { id: 2, name: 'Bob', email: 'bob@gmail.com', role: 'employee', isActive: false, managerId: 3 },
    { id: 3, name: 'Carol', email: 'carol@company.com', role: 'manager', isActive: true },
    { id: 4, name: 'Dave', email: 'dave@other.com', role: 'employee', isActive: true },
];