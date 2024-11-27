import jwt, { Secret } from "jsonwebtoken";

export const tokenCreate = (data: object, key: Secret, expiresIn: string | number): string => {
    const token = jwt.sign(data, key, { expiresIn });
    return token;
};
