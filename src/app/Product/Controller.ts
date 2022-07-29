import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface bodyType {
  name: string;
  descript: string;
  price: number;
  stock: number;
}

class Product {
  async get(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await prisma.product.findMany();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as bodyType;
      const payload = {
        name: body.name,
        descript: body.descript,
        price: body.price,
        stock: body.stock,
      };
      const product = await prisma.product.create({
        data: payload,
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUniqueOrThrow({
        where: {
          id,
        },
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body: bodyType = req.body;

      const payload = {
        name: body.name,
        descript: body.descript,
        price: body.price,
        stock: body.stock,
      };

      const product = await prisma.product.update({
        where: {
          id,
        },
        data: payload,
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.delete({
        where: {
          id,
        },
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

export default Product;
