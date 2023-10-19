export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    active: boolean;
}

export interface Product {
    id: number;
    name: string;
    unitCompensation: number;
    price: number;
    packageCompensation: number;
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
    employeeName: string;
    productName: string;
    percentage: number;
    quantity: number;
    price: number;
}

