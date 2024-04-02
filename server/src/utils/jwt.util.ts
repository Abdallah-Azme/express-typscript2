import config from "config";
import jwt from "jsonwebtoken";

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, config.get<string>("PRIVATE_KEY"), {
    ...(options && options),
    algorithm: "RS256",
  });

  // if (!process.env.PRIVATE_KEY) {
  //   throw new Error("No private key");
  // }

  // return (
  //   jwt.sign(object, process.env.PRIVATE_KEY),
  //   {
  //     ...(options && options),
  //     algorithm: "RS256",
  //   }
  // );
}

export function verifyJWT(token: string) {
  try {
    // if (!process.env.PUBLIC_KEY) {
    //   throw new Error("No public key");
    // }
    const decoded = jwt.verify(token, config.get<string>("PUBLIC_KEY"));
    // const decoded = jwt.verify(token, process.env.PUBLIC_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
