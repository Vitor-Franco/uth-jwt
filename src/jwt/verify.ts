import { generateSignature } from "./signature";

interface VerifyOptions {
  token: string;
  secret: string;
}

export function verify(options: VerifyOptions) {
  const [headerToken, payloadToken, signatureToken] = options.token.split('.');

  const generatedSignature = generateSignature({
    header: headerToken,
    payload: payloadToken,
    secret: options.secret,
  })

  if (signatureToken !== generatedSignature) {
    throw new Error('Invalid Token!')
  }

  const decodedPayload = JSON.parse(Buffer.from(payloadToken, 'base64url').toString('utf-8'))
  
  const expired = decodedPayload.exp < Date.now();
  if (expired) {
    throw new Error('Expired token!')
  }

  return decodedPayload;
}