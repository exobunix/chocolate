import mongoose, { Schema } from "mongoose";
import { logger } from "./logger";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.warn("MONGODB_URI is not set. Database operations will fail.");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => logger.info("Connected to MongoDB successfully."))
    .catch((err) => logger.error({ err }, "Error connecting to MongoDB:"));
}

// Schema for site configuration
const SiteConfigSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    config: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

// Schema for uploaded media metadata
const MediaItemSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true, enum: ["url", "upload"] },
    size: { type: String },
    fileId: { type: String }, // Store ImageKit file ID for deletion
  },
  { timestamps: true }
);

// Ensure virtual 'id' is mapped to string of '_id' for frontend compatibility
MediaItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
MediaItemSchema.set("toJSON", { virtuals: true });
MediaItemSchema.set("toObject", { virtuals: true });

export const SiteConfigModel = mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
export const MediaItemModel = mongoose.models.MediaItem || mongoose.model("MediaItem", MediaItemSchema);
