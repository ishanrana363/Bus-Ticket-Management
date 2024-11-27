import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenKey: string = process.env.JWTKEY || "";

interface DecodedToken extends JwtPayload {
    user: {
        _id: string;
        email: string;
        role: string;
    };
}

// Middleware to check if the user is logged in
export const isLogIn = (req: any, res: any, next: any): void => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            token = req.cookies?.accessToken;
        }

        if (!token) {
            res.status(401).json({
                status: "fail",
                msg: "Unauthorized user",
            });
            return;
        }

        // Verify the token
        const decode = jwt.verify(token, accessTokenKey) as DecodedToken;


        if (!decode) {
            res.status(401).json({
                status: "fail",
                msg: "Invalid token, please log in",
            });
            return;
        }

        req.headers._id = decode.user._id;
        req.headers.email = decode.user.email;
        req.headers.role = decode.user.role;
        next();
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            msg: error.message,
        });
    }
};

// Middleware to check if the user is logged out
export const isLogOut = (req: any, res: any, next: any): void => {
    try {
        const token: string | undefined = req.headers.authorization;

        if (token) {
            const decode = jwt.verify(token, accessTokenKey) as DecodedToken;

            if (decode) {
                res.status(409).json({
                    status: "fail",
                    msg: "You have already logged in",
                });
                return;
            } else {
                res.status(401).json({
                    status: "fail",
                    msg: "User token expired",
                });
                return;
            }
        }
        next();
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};

// Middleware to check if the user has admin privileges
export const isAdmin = (req: any, res: any, next:any ): void => {
    try {
        const role = req.headers.role;
        console.log(role)

        if (role !== "admin") {
            res.status(403).json({
                status: "fail",
                msg: "You do not have permission",
            });
            return;
        }

        next();
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};
