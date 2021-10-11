import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose'

import {Product} from './interfaces/product.interface';
import {CreateProductDTO} from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private productModel: Model<Product>
    ){}

    async getProducts():Promise<Product[]>{


        return await this.productModel.find({});

    }

    async getProduct(productID:string):Promise<Product>{

         return await this.productModel.findById(productID);

    }

    async createProduct(createProdcutDTO:CreateProductDTO):Promise<Product>{

        const product=new this.productModel(createProdcutDTO);
        return await product.save();
    }

    async updateProduct(productID:string,createProductDTO:CreateProductDTO):Promise<Product>{


        return await this.productModel.findByIdAndUpdate(productID,createProductDTO, {new:true});

    }

    async deleteProduct(productID:string):Promise<Product>{

        return await this.productModel.findByIdAndDelete(productID)

    }



}
