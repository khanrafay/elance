import { jsonRequest } from '../../request/request';
import {User} from "../../model/user";
import { AUTH_INFO } from '../../routing/routes/backend.app';
import { HttpException, UnauthorizedException } from '../../exception';

export interface AuthInfoResponse{
    code: number;
    message?: string;
    user: User
}

export class UserNotAuthorizedException {
    constructor(public readonly httpException: HttpException) {
    }
}

/**
 * @throws UserNotAuthorizedException
 */
export async function getAuthInfo(): Promise<AuthInfoResponse> {
    let url = AUTH_INFO;

    let response: Response;

    try {
        response = await jsonRequest(url);
    } catch (exception) {
        if (exception instanceof UnauthorizedException) {
            throw new UserNotAuthorizedException(exception);
        }

        throw exception;
    }

    return response.json();
}