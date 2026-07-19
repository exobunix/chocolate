import { Router } from "express";
import crypto from "crypto";
import { SiteConfigModel, MediaItemModel } from "../lib/db";
import { logger } from "../lib/logger";

const router = Router();

// GET /api/config
router.get("/config", async (req, res) => {
  try {
    const doc = await SiteConfigModel.findOne({ key: "default" });
    res.json(doc?.config || {});
  } catch (err) {
    logger.error({ err }, "Error in GET /config");
    res.status(500).json({ error: "Failed to fetch config" });
  }
});

// POST /api/config
router.post("/config", async (req, res) => {
  try {
    const { config } = req.body;
    const doc = await SiteConfigModel.findOneAndUpdate(
      { key: "default" },
      { config },
      { upsert: true, new: true }
    );
    res.json(doc.config);
  } catch (err) {
    logger.error({ err }, "Error in POST /config");
    res.status(500).json({ error: "Failed to save config" });
  }
});

// GET /api/media/signature (ImageKit upload token/signature generator)
router.get("/media/signature", async (req, res) => {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
      res.status(500).json({ error: "IMAGEKIT_PRIVATE_KEY is not configured" });
      return;
    }
    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 1800; // 30 minutes from now
    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    res.json({ token, expire, signature });
  } catch (err) {
    logger.error({ err }, "Error generating ImageKit signature");
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

// GET /api/media
router.get("/media", async (req, res) => {
  try {
    const items = await MediaItemModel.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    logger.error({ err }, "Error in GET /media");
    res.status(500).json({ error: "Failed to fetch media items" });
  }
});

// POST /api/media
router.post("/media", async (req, res) => {
  try {
    const { name, url, type, size, fileId } = req.body;
    if (!name || !url || !type) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const item = new MediaItemModel({ name, url, type, size, fileId });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    logger.error({ err }, "Error in POST /media");
    res.status(500).json({ error: "Failed to save media item" });
  }
});

// DELETE /api/media/:id
router.delete("/media/:id", async (req, res) => {
  try {
    const item = await MediaItemModel.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "Media item not found" });
      return;
    }

    // Delete from ImageKit if it's an uploaded file
    if (item.type === "upload" && item.fileId && process.env.IMAGEKIT_PRIVATE_KEY) {
      try {
        const auth = Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64");
        const ikRes = await fetch(`https://api.imagekit.io/v1/files/${item.fileId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });
        if (!ikRes.ok) {
          logger.warn({ status: ikRes.status }, "Failed to delete file from ImageKit during cleanup");
        }
      } catch (err) {
        logger.error({ err, fileId: item.fileId }, "Failed to delete file from ImageKit");
      }
    }

    await MediaItemModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Error in DELETE /media/:id");
    res.status(500).json({ error: "Failed to delete media item" });
  }
});

export default router;
