/**
 * An array of routes that are accessibe to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are not accessibe to public
 * These routes require authentication
 * @type {string[]}
 */
export const privateRoutes: string[] = ["/home", "/create-card", "/library"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged-in users to /home
 * These routes are not accessible if you are authenticated
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register"];

/**
 * The prefix for api authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * These routes are accessible for anyone
 * @type {string}
 */
export const apiAuthPrefixRoute: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/home";
