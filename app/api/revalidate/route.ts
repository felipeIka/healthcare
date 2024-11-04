// pages/api/revalidate.js (ou app/api/revalidate/route.ts no App Router)
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Revalida a rota específica
      await res.revalidate("/admin");
      return res.json({ revalidated: true });
    } catch (error) {
      console.error("Revalidation error:", error);
      return res.status(500).json({ error: "Failed to revalidate" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
