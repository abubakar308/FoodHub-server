import { Response } from "express";
type TReponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
};
declare const sendResponse: <T>(res: Response, data: TReponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map