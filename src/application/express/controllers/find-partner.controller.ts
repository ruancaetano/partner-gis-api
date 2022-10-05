import { Request, Response } from "express";
import { ValidationError } from "@domain/@shared/errors/validation.error";
import { FindPartnerUseCase } from "@domain/partner/usecases/find/find-partner.usecase";

export class FindPartnerController {
  constructor(private usecase: FindPartnerUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const foundParter = await this.usecase.execute({ id });
      return res.status(200).json(foundParter);
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
