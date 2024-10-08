export default {
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_SECRET_FOR_ACCESS_TOKEN: process.env.JWT_SECRET_FOR_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRY_SECONDS: 60 * 60 * 1, // 1 hour

  JWT_SECRET_FOR_REFRESH_TOKEN: process.env.JWT_SECRET_FOR_REFRESH_TOKEN,
  JWT_REFRESH_TOKEN_EXPIRY_SECONDS: 60 * 60 * 24 // 24 hours,
};
