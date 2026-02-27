import { Prisma } from "../../generated/prisma/client";
export function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let errMessage = "Internal server Error!";
    let errorDetails = err;
    if (err instanceof Prisma.PrismaClientValidationError) {
        ((statusCode = 400), (errMessage = "Incorrect body or missing a fields"));
    }
    res.status(statusCode);
    res.json({ success: false, meeage: errMessage, error: errorDetails });
}
//# sourceMappingURL=globalErrorHandler.js.map