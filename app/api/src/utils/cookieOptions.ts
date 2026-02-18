export const cookieOptions = () =>{
    return {
        http:true, // prevent client side js to access the cookie(XSS attack)
        secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
        sameSite:"strict" as const, // prevent CSRF attack by not sending cookie in cross-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    }
}