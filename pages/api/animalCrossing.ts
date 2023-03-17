import type { NextApiRequest, NextApiResponse } from "next";

import { createAvatar } from "@dicebear/avatars";
import * as style from "@yareyaredesuyo/dicebear-animal-crossing-style";
import qs from "query-string";
import sharp from "sharp";

type FileType = "svg" | "png";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = req.url?.split("?");
    let search = "";
    if (url && url.length === 2) {
      search = url[1];
    }

    const options = qs.parse(search as string, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: ",",
    });

    let filetype = "svg";
    if (
      options?.filetype &&
      ["svg", "png"].includes(options?.filetype as string)
    ) {
      filetype = options.filetype as string;
    }

    // TODO: fix type error
    // @ts-ignore
    const svg = createAvatar(style, options);

    if (filetype === "svg") {
      res.writeHead(200, { "Content-Type": "image/svg+xml" }).end(svg);
    } else if (filetype === "png") {
      const png = await sharp(Buffer.from(svg)).png().toBuffer();
      res.writeHead(200, { "Content-Type": "image/png" }).end(png);
    }

    // if (!isDebug) {
    //     res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    // }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
  }
}
