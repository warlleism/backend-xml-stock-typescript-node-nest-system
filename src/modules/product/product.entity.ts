export interface ProductEntity {
    id: number;
    name: string;
    code: number;
    category: string;
    quantity: number;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}