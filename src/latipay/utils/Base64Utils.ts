import * as Buffer from "buffer";

export class Base64Utils {
  public static decode(str: string): string {
    return Buffer.from(str, "base64").toString("binary");
  }

  public static encode(str: string): string {
    return Buffer.from(str, "binary").toString("base64");
  }
}
