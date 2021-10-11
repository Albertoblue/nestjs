import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException,Query} from '@nestjs/common';

import {CreateProductDTO} from './dto/product.dto'

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDto:CreateProductDTO){

        //console.log(createProductDto);
        const product=await this.productService.createProduct(createProductDto)
        res.status(HttpStatus.OK).json(
            {
                message:'Product Successfully Created',
                product:product
            }
        );
    }

    @Get('/')
    
    async getProducts(@Res() res){
        const products=this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products 
        })


    }


    @Get('/:productID')

    async getProduct(@Res() res, @Param('productID') productID){

        const product=await this.productService.getProduct(productID);
        
        return res.status(HttpStatus.OK).json(product);

    }


    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID ){

        const product=await this.productService.deleteProduct(productID);
        if(!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json({
            message:'Product Dekletes Succesfully',
            product
        });

    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createdProductDTO: CreateProductDTO, @Query('productID') productID){

        const updatedProduct=await this.productService.updateProduct(productID,createdProductDTO);
        if(!updatedProduct) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json({
            message:"Product Updated Succesfully",
            updatedProduct
        })




    }




}
