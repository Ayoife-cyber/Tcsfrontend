import toast from "react-hot-toast";

/**
 * Shared form utilities, constants, and validators used across the public
 * request form and the admin design form. Centralising these removes
 * duplicated logic and keeps validation behaviour consistent.
 */

/* ─── Shared constants ─────────────────────────────────────── */

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Custom Measurement"];

export const MEASUREMENT_FIELDS = [
  ["bust", "Bust"],
  ["waist", "Waist"],
  ["hip", "Hip"],
  ["shoulder", "Shoulder"],
  ["sleeveLength", "Sleeve Length"],
  ["dressLength", "Dress Length"],
  ["trouserLength", "Trouser Length"],
  ["topLength", "Top Length"],
  ["neck", "Neck"],
  ["thigh", "Thigh"],
  ["armhole", "Armhole"],
];

/* ─── Shared input styling ─────────────────────────────────── */

// Public-facing form fields (RequestForm, Contact, etc.)
export const inputClass =
  "w-full bg-charcoal border border-cream/20 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold";

export const labelClass = "block text-xs uppercase tracking-wide text-cream/60 mb-2";

// Admin form fields — slightly richer styling to match the admin panel.
export const adminInputClass =
  "w-full bg-[#0a080b]/60 border border-gold/20 text-cream text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold/50 shadow-inner transition-all hover:bg-[#0a080b]/80";

export const adminLabelClass =
  "block text-[10px] sm:text-xs uppercase tracking-widest text-cream/70 mb-2 font-medium";

/* ─── File validation ──────────────────────────────────────── */

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 MB

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/mov",
  "video/quicktime",
];
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

/**
 * Validate an image file. Returns an error string, or null when valid.
 * Caller is expected to toast the returned string when non-null.
 */
export const validateImageFile = (file, { maxSize = MAX_IMAGE_SIZE } = {}) => {
  if (!file) return null;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image";
  }
  if (file.size > maxSize) {
    return "Image must be under 8MB";
  }
  return null;
};

/**
 * Validate a video file. Returns an error string, or null when valid.
 */
export const validateVideoFile = (file, { maxSize = MAX_VIDEO_SIZE } = {}) => {
  if (!file) return null;
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return "Please upload an MP4, WEBM, or MOV video";
  }
  if (file.size > maxSize) {
    return "Video must be under 50MB";
  }
  return null;
};

/**
 * Convenience wrapper — validate and toast in one call.
 * Returns true when the file is valid, false otherwise.
 */
export const assertValidImageFile = (file, options) => {
  const error = validateImageFile(file, options);
  if (error) {
    toast.error(error);
    return false;
  }
  return true;
};

export const assertValidVideoFile = (file, options) => {
  const error = validateVideoFile(file, options);
  if (error) {
    toast.error(error);
    return false;
  }
  return true;
};

/* ─── API error message helper ─────────────────────────────── */

/**
 * Extract a user-facing error message from an axios error consistently.
 * Falls back to the provided message when no server message is present.
 */
export const getApiErrorMessage = (
  err,
  fallback = "Something went wrong. Please try again."
) => err?.response?.data?.message || fallback;

/* ─── Form validators ──────────────────────────────────────── */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the public request form.
 * Returns an errors object keyed by field name, or null when valid.
 */
export const validateRequestForm = (form) => {
  const errors = {};
  if (!form.customerName?.trim()) errors.customerName = "Full name is required";
  if (!form.email?.trim()) errors.email = "Email address is required";
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = "Please enter a valid email address";
  if (!form.phone?.trim()) errors.phone = "Phone number is required";
  if (!form.preferredSize) errors.preferredSize = "Please select a preferred size";
  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validate the admin design form's textual fields (media is validated separately).
 * Returns an errors object keyed by field name, or null when valid.
 */
export const validateDesignForm = (form) => {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Design name is required";
  if (!form.description?.trim()) errors.description = "Description is required";
  if (!form.category) errors.category = "Category is required";
  if (!form.price || Number(form.price) <= 0) errors.price = "Price must be greater than 0";
  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Return the first error message from a validator's errors object.
 * Useful for inline toast notifications on submit.
 */
export const firstError = (errors) => (errors ? Object.values(errors)[0] : null);
