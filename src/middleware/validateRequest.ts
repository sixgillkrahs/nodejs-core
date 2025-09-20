import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { ValidationError } from "@/utils/errorHandler";

export const validateRequest =
    (schemaFactory: (lang: string) => ZodObject<ZodRawShape>) =>
        (req: Request, res: Response, next: NextFunction): void => {
            try {
                const lang = req.cookies?.lang || req.headers["accept-language"]?.split(",")[0] || "vi";
                const schema = schemaFactory(lang);

                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    headers: req.headers,
                });

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    }));

                    next(new ValidationError(JSON.stringify(errors)));
                    return;
                }

                next(new ValidationError("Invalid request data"));
            }
        };
