import { withIronSession } from 'next-iron-session';

export const sessionConfig = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "user-state",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export function getClientSession(handler) {
    return withIronSession(handler, sessionConfig);
}