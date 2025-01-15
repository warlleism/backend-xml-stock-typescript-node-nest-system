export interface IProduct {
    id: number;
    code: number;
    name: string;
    price: number;
    categoryid: number;
    principleactiveid: number;
    description: string;
    quantity: number;
    dosage: string;
    laboratory: string;
    requiresPrescription: string;
    createdAt: Date;
    updatedAt: Date;
}