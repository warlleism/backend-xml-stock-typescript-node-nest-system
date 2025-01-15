import { IProduct } from "src/modules/product/product.entity";

export default function hasEmptyString(obj: IProduct) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === "") {
            return true;
        }
    }
    return false;
}