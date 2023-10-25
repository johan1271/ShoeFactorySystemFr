export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    role_id: number;
    active: number;
}

export interface Product {
    id: number;
    name: string;
    unit_compensation: number;
    price: number;
    package_compensation: number;
    kind: string;
}

export interface Production {
    id: number;
    date: string;
    product: Product;
    quantity: number;
    user: User;
}

export interface userProduction {
    compensation: number;
    employee_name: string;
    name: string;
    percentage: number;
    quantity: number;
    price: number;
    unit_price: number;
}

