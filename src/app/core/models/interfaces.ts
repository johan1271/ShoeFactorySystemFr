export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    lastName: string;
    role: Role;
    active: boolean;
}

export interface Product {
    id: number;
    name: string;
    unit_compensation: number;
    price: number;
    package_compensation: boolean;
    kind: string;
}

export interface Production {
    id: number;
    date: Date;
    product: Product;
    quantity: number;
    user: User;
}

