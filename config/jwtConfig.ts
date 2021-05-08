export default () => ({
  jtwSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION_TIME,
});
