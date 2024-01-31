import mongoose from 'mongoose';

import { customAlphabet } from "nanoid";

import { UserDocument } from './user.model';


const customId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);


export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
  }


export interface ProductDocument extends mongoose.Document, ProductInput {

    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${customId()}`
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
})


//model
const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel