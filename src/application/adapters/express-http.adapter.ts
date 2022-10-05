import { ValidationError } from "@domain/@shared/errors/validation.error";
import { Controller } from "@presentation/protocols/controller.protocol";
import express from "express";

export class HttpExpressAdapter {
  static create(controller: Controller) {
    return async (req: express.Request, res: express.Response) => {
      try {
        const body = req.body;
        const response = await controller.handle({
          params: req.params,
          body,
          query: req.query,
        });
        return res.status(response.status).json(response.body);
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
    };
  }
}
