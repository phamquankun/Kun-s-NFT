import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
var AdmZip = require("adm-zip");

type Data = {
  title?: any;
};
var zip = new AdmZip();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const size = req.query.size as unknown as number;
  const filePath = (index: number) =>
    path.join(
      process.cwd(),
      `/public/images/output_random_nft/NFT-${index}.png`
    );

  for (let i = 1; i <= size; i++) {
    zip.addLocalFile(filePath(i));
  }

  var zipFileContents = zip.toBuffer();

  const fileName = "uploads.zip";
  const fileType = "application/zip";
  res.writeHead(200, {
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Content-Type": fileType,
  });
  return res.status(200).end(zipFileContents);
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
    responseLimit: false,
  },
};
