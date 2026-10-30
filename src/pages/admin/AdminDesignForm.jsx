import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchDesignByIdOrSlug, fetchCategories } from "../../api/designs.js";
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineVideoCamera, HiX, HiOutlineCloudUpload } from "react-icons/hi";
import { createDesign, updateDesign } from "../../api/admin.js";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Custom Measurement"];
const inputClass =
  "w-full bg-[#0a080b]/60 border border-gold/20 text-cream text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold/50 shadow-inner transition-all hover:bg-[#0a080b]/80";
const labelClass = "block text-[10px] sm:text-xs uppercase tracking-widest text-cream/70 mb-2 font-medium";

/* ─── Image Picker ────────────────────────────────────────────── */
const ImagePicker = ({ images, onChange }) => {
  const inputRef = useRef();
  const MAX = 5;

  const addFiles = (files) => {
    const incoming = Array.from(files);
    const combined = [...images, ...incoming].slice(0, MAX);
    onChange(combined);
  };

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx));

  const onDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => images.length < MAX && inputRef.current.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          images.length >= MAX
            ? "border-cream/10 opacity-40 cursor-not-allowed"
            : "border-gold/30 hover:border-gold/60 cursor-pointer"
        }`}
      >
        <HiOutlinePhotograph className="text-gold/50 text-4xl mx-auto mb-2" />
        <p className="text-cream/60 text-sm">
          {images.length === 0
            ? "Click or drag to upload images"
            : images.length >= MAX
            ? "Maximum 5 images reached"
            : `Add more images (${images.length} / ${MAX})`}
        </p>
        <p className="text-cream/30 text-xs mt-1">
          First image is the main image · JPG, PNG, WEBP · Max 8 MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {images.map((file, idx) => (
            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gold/20">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <span className="absolute top-1 left-1 bg-gold text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(idx); }}
                className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HiX className="text-xs" />
              </button>
            </div>
          ))}
          {/* Empty slots */}
          {Array.from({ length: MAX - images.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              onClick={() => inputRef.current.click()}
              className="aspect-square rounded-lg border border-dashed border-cream/10 flex items-center justify-center cursor-pointer hover:border-gold/30 transition-colors"
            >
              <HiOutlinePhotograph className="text-cream/20 text-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Counter */}
      <p className={`text-xs mt-2 ${images.length === 0 ? "text-rose-400" : "text-cream/40"}`}>
        {images.length === 0
          ? "⚠ At least 1 image is required"
          : `${images.length} of ${MAX} images selected`}
      </p>
    </div>
  );
};

/* ─── Existing Image Grid (edit mode) ───────────────────────── */
const ExistingImageGrid = ({ mainImageUrl, additionalImages, removedPublicIds, onToggleRemove }) => {
  const allExisting = [
    { url: mainImageUrl, publicId: null, isMain: true },
    ...additionalImages.map((img) => ({ ...img, isMain: false })),
  ].filter((img) => img.url);

  if (allExisting.length === 0) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-cream/40 mb-3">Existing images</p>
      <div className="grid grid-cols-5 gap-3">
        {allExisting.map((img, idx) => {
          const isRemoved = img.publicId && removedPublicIds.includes(img.publicId);
          return (
            <div
              key={idx}
              className={`relative group aspect-square rounded-lg overflow-hidden border transition-all ${
                isRemoved ? "border-red-500/60 opacity-40" : "border-gold/20"
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {img.isMain && (
                <span className="absolute top-1 left-1 bg-gold text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                  Main
                </span>
              )}
              {!img.isMain && img.publicId && (
                <button
                  type="button"
                  onClick={() => onToggleRemove(img.publicId)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiX className="text-xs" />
                </button>
              )}
              {isRemoved && (
                <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                  <span className="text-red-300 text-[10px] font-bold uppercase">Remove</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Video Picker ───────────────────────────────────────────── */
const VideoPicker = ({ video, onChange, existingVideo, removedVideoPublicIds, onToggleRemoveVideo }) => {
  const inputRef = useRef();

  const previewUrl = video ? URL.createObjectURL(video) : null;

  return (
    <div className="space-y-4">
      {/* Existing video (edit mode) */}
      {existingVideo && !removedVideoPublicIds.includes(existingVideo.publicId) && (
        <div className="relative rounded-xl overflow-hidden border border-gold/20 bg-black">
          <video
            src={existingVideo.url}
            controls
            className="w-full max-h-52 object-contain"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <span className="bg-gold text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase">
              Current
            </span>
            <button
              type="button"
              onClick={() => onToggleRemoveVideo(existingVideo.publicId)}
              className="bg-black/70 text-white text-xs px-2 py-0.5 rounded hover:bg-red-600/80 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Removed indicator */}
      {existingVideo && removedVideoPublicIds.includes(existingVideo.publicId) && (
        <div className="border border-red-500/40 rounded-xl p-3 flex items-center justify-between bg-red-900/10">
          <span className="text-red-400 text-xs">Existing video will be removed on save</span>
          <button
            type="button"
            onClick={() => onToggleRemoveVideo(existingVideo.publicId)}
            className="text-cream/60 text-xs hover:text-gold"
          >
            Undo
          </button>
        </div>
      )}

      {/* New video preview */}
      {previewUrl && (
        <div className="relative rounded-xl overflow-hidden border border-gold/30 bg-black">
          <video src={previewUrl} controls className="w-full max-h-52 object-contain" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <HiX />
          </button>
          <span className="absolute top-2 left-2 bg-gold text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase">
            New
          </span>
        </div>
      )}

      {/* Drop zone */}
      {!video && (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-gold/20 hover:border-gold/50 rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
        >
          <HiOutlineVideoCamera className="text-gold/50 text-4xl mx-auto mb-2" />
          <p className="text-cream/60 text-sm">Click to upload a video</p>
          <p className="text-cream/30 text-xs mt-1">MP4, WEBM, MOV · Max 50 MB · 1 video per design</p>
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/mov,video/quicktime"
            className="hidden"
            onChange={(e) => onChange(e.target.files[0] || null)}
          />
        </div>
      )}
    </div>
  );
};

/* ─── Main Form Component ────────────────────────────────────── */
const AdminDesignForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    colors: "",
    sizes: [],
    fabric: "",
    available: true,
    featured: false,
  });

  // New media selections
  const [newImages, setNewImages] = useState([]);   // File[]
  const [newVideo, setNewVideo] = useState(null);    // File | null

  // Existing (edit mode) media
  const [existingMainUrl, setExistingMainUrl] = useState("");
  const [existingAdditional, setExistingAdditional] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);

  // Track publicIds to remove
  const [removedImagePublicIds, setRemovedImagePublicIds] = useState([]);
  const [removedVideoPublicIds, setRemovedVideoPublicIds] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchDesignByIdOrSlug(id).then((data) => {
      const d = data.design;
      setForm({
        name: d.name,
        description: d.description,
        category: d.category?._id || "",
        price: d.price,
        colors: (d.colors || []).join(", "),
        sizes: d.sizes || [],
        fabric: d.fabric || "",
        available: d.available,
        featured: d.featured,
      });
      setExistingMainUrl(d.mainImage?.url || "");
      setExistingAdditional(d.additionalImages || []);
      setExistingVideo(d.videos?.[0] || null);
      setLoading(false);
    });
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleRemoveImage = (publicId) => {
    setRemovedImagePublicIds((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  };

  const toggleRemoveVideo = (publicId) => {
    setRemovedVideoPublicIds((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.category || !form.price) {
      toast.error("Please fill in name, description, category and price");
      return;
    }

    // Image validation
    if (!isEdit && newImages.length === 0) {
      toast.error("At least 1 image is required");
      return;
    }
    if (isEdit && newImages.length === 0) {
      const remainingExisting =
        (existingMainUrl ? 1 : 0) +
        existingAdditional.filter((img) => !removedImagePublicIds.includes(img.publicId)).length;
      if (remainingExisting === 0) {
        toast.error("At least 1 image must remain");
        return;
      }
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("colors", JSON.stringify(form.colors.split(",").map((c) => c.trim()).filter(Boolean)));
      formData.append("sizes", JSON.stringify(form.sizes));
      formData.append("fabric", form.fabric);
      formData.append("available", form.available.toString());
      formData.append("featured", form.featured.toString());

      // Append images — first = mainImage, rest = additionalImages
      if (newImages.length > 0) {
        formData.append("mainImage", newImages[0]);
        newImages.slice(1).forEach((file) => formData.append("additionalImages", file));
      }

      // Append video
      if (newVideo) formData.append("videos", newVideo);

      // Removals (edit mode)
      if (removedImagePublicIds.length > 0) {
        formData.append("removeImagePublicIds", JSON.stringify(removedImagePublicIds));
      }
      if (removedVideoPublicIds.length > 0) {
        formData.append("removeVideoPublicIds", JSON.stringify(removedVideoPublicIds));
      }

      if (isEdit) {
        await updateDesign(id, formData);
        toast.success("Design updated");
      } else {
        await createDesign(formData);
        toast.success("Design published");
      }
      navigate("/admin/designs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save design");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-cream/50">Loading design...</p>;

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/designs"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/60 hover:text-gold transition-colors group mb-4"
      >
        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Designs
      </Link>

      <h1 className="font-display text-3xl text-cream mb-8">
        {isEdit ? "Edit Design" : "Add New Design"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Name */}
        <div>
          <label className={labelClass}>Design Name *</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass} />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (₦) *</label>
            <input type="number" min="0" name="price" value={form.price} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className={labelClass}>Available Colors (comma-separated)</label>
          <input name="colors" value={form.colors} onChange={handleChange} placeholder="Wine, Gold, Emerald" className={inputClass} />
        </div>

        {/* Sizes */}
        <div>
          <label className={labelClass}>Available Sizes</label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SIZES.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 text-[10px] sm:text-xs rounded-lg uppercase tracking-wider font-semibold border transition-all duration-300 ${
                  form.sizes.includes(size) 
                    ? "bg-gold text-black border-gold shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105" 
                    : "bg-[#0a080b]/50 border-gold/20 text-cream/60 hover:bg-[#0a080b]/80 hover:text-cream"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Fabric */}
        <div>
          <label className={labelClass}>Fabric Information</label>
          <input name="fabric" value={form.fabric} onChange={handleChange} className={inputClass} />
        </div>

        {/* ── Images Section ── */}
        <div className="border border-gold/10 rounded-xl p-5 space-y-4 bg-black/20">
          <div className="flex items-center gap-2 mb-1">
            <HiOutlinePhotograph className="text-gold text-lg" />
            <h3 className="text-sm font-semibold text-cream uppercase tracking-widest">Images</h3>
            <span className="text-cream/40 text-xs ml-auto">Min 1 · Max 5 · First = main image</span>
          </div>

          {/* Existing images in edit mode */}
          {isEdit && (
            <ExistingImageGrid
              mainImageUrl={existingMainUrl}
              additionalImages={existingAdditional}
              removedPublicIds={removedImagePublicIds}
              onToggleRemove={toggleRemoveImage}
            />
          )}

          {/* New image picker */}
          <div>
            {isEdit && <p className="text-xs uppercase tracking-wide text-cream/40 mb-3">Add new images</p>}
            <ImagePicker images={newImages} onChange={setNewImages} />
          </div>
        </div>

        {/* ── Video Section ── */}
        <div className="border border-gold/10 rounded-xl p-5 space-y-3 bg-black/20">
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineVideoCamera className="text-gold text-lg" />
            <h3 className="text-sm font-semibold text-cream uppercase tracking-widest">Video</h3>
            <span className="text-cream/40 text-xs ml-auto">Optional · MP4 / WEBM / MOV · Max 50 MB</span>
          </div>
          <VideoPicker
            video={newVideo}
            onChange={setNewVideo}
            existingVideo={existingVideo}
            removedVideoPublicIds={removedVideoPublicIds}
            onToggleRemoveVideo={toggleRemoveVideo}
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-sm text-cream/70">
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
            Available
          </label>
          <label className="flex items-center gap-2 text-sm text-cream/70">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Featured Design
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold-dark transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <HiOutlineCloudUpload className="text-base" />
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Design"}
        </button>
      </form>
    </div>
  );
};

export default AdminDesignForm;
