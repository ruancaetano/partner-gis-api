import { Request, Response } from "express";
import { ValidationError } from "@domain/@shared/errors/validation.error";
import { SearchNearestPartnerUseCase } from "@domain/partner/usecases/search-nearest/search-nearest-partner.usecase";

export class SearchNearestPartnerController {
  constructor(private usecase: SearchNearestPartnerUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { latitude, longitude } = req.query;

      const parsedLatitude = Number(latitude);
      const parsedLongitude = Number(longitude);

      if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
        return res.status(400).json({
          message: "Invalid latitude/longitude query params",
        });
      }

      const foundParter = await this.usecase.execute({
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      });
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
