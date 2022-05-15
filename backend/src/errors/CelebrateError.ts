import AppError from "./AppError";
import {isCelebrateError} from 'celebrate'

export default function CelebrateError (error:any, req:any, res:any, next:any){
    if (isCelebrateError(error)) {
        const errorBody:any = error.details.get('body')
        const { details: [errorDetails] } = errorBody;
        const {message} = errorDetails
        throw new AppError(message, 400,)
    }

    return next(error);
  }
