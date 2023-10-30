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

export interface AllProductions{
    id: number;
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    user_role: string;
    product_id: number;
    product_name: string;
    quantity: number;
    date: string;

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

export interface productionsByUser {
    production: userProduction[];
    total_compensation: number;
}

