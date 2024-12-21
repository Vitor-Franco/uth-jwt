import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = '#secret_';

const hour_in_ms = 60 * 60 * 1000 // 1 hour
const tokenJwt = sign({
  exp: Date.now() + (24 * hour_in_ms),
  data: {
    sub: "@nickname",
  },
  secret,
})

const tokenDecoded = verify({
  token: tokenJwt,
  secret,
});

console.log("[LOG] ~ tokenDecoded:", tokenDecoded)