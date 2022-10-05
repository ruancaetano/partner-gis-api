import { Request, Response } from "express";
import { ValidationError } from "@domain/@shared/errors/validation.error";
import { CreatePartnerUseCase } from "@domain/partner/usecases/create/create-partner.usecase";

export class CreatePartnerController {
  constructor(private usecase: CreatePartnerUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const body = req.body;
      const createdPartner = await this.usecase.execute(body);
      return res.status(201).json(createdPartner);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message:
          process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : (error as Error).message,
      });
    }
  }


}
