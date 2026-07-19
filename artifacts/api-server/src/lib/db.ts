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

// Schema for Orders
const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String },
    shippingAddress: { type: String, required: true },
    items: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true, enum: ["pending", "processing", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

// Map _id to virtual id for frontend compatibility
OrderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
OrderSchema.set("toJSON", { virtuals: true });
OrderSchema.set("toObject", { virtuals: true });

export const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
