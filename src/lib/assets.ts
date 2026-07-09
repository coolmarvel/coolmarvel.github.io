export const basePath =
  process.env.NODE_ENV === "production" ? "/coolmarvel_portfolio" : "";

export const asset = (path: string) => `${basePath}${path}`;
