export interface Employee {
    id: number;
    name: string;
    email: string;
    role: 'employee' | 'manager' | 'admin';
    isActive: boolean;
    managerId?: number;
}