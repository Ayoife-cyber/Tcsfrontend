import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAdminRequestById, updateRequestStatus, deleteRequest } from "../../api/admin.js";
import { HiOutlineArrowLeft } from "react-icons/hi";

const STATUSES = ["New", "Contacted", "Confirmed", "In Progress", "Completed", "Cancelled"];

const Field = ({ label, value }) =>
  value !== undefined && value !== null && value !== "" ? (
    <div>
      <p className="text-xs uppercase tracking-wide text-cream/50">{label}</p>
      <p className="text-cream">{value}</p>
    </div>
  ) : null;

const AdminRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    setLoading(true);
    fetchAdminRequestById(id)
      .then((data) => setRequest(data.request))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    setUpdating(true);
    try {
      await updateRequestStatus(id, status);
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this request? This cannot be undone.")) return;
    try {
      await deleteRequest(id);
      toast.success("Request deleted");
      navigate("/admin/requests");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete request");
    }
  };

  if (loading) return <p className="text-cream/50">Loading request...</p>;
  if (!request) return <p className="text-cream/50">Request not found.</p>;

  const m = request.measurements || {};
  const hasMeasurements = Object.values(m).some((v) => v !== undefined && v !== null && v !== "");

  return (
    <div className="max-w-3xl">
      <Link 
        to="/admin/requests" 
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/60 hover:text-gold transition-colors group mb-4"
      >
        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Requests
      </Link>

      <h1 className="font-display text-3xl text-cream mt-4 mb-8">
        Request #{request.requestNumber}
      </h1>

      <div className="mb-8 p-6 rounded-xl border border-gold/15 bg-charcoal/40 backdrop-blur-md shadow-xl flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
        <div>
          <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-cream/50 mb-3 font-semibold">Update Request Status</label>
          <select
            value={request.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="bg-[#0a080b]/80 border border-gold/30 text-gold text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold/50 shadow-inner w-full sm:w-auto min-w-50"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDelete}
          className="border border-red-500/40 bg-red-500/10 text-red-400 px-6 py-2.5 rounded-lg text-xs hover:bg-red-500 hover:text-white transition-all font-medium shadow-sm w-full sm:w-auto"
        >
          Delete Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
        <div className="border border-gold/15 p-6 rounded-xl bg-[#0a080b]/40 backdrop-blur-md shadow-lg space-y-5">
          <h2 className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-3">Customer Information</h2>
          <Field label="Name" value={request.customerName} />
          <Field label="Email" value={request.email} />
          <Field label="Phone" value={request.phone} />
          <Field label="WhatsApp" value={request.whatsapp} />
        </div>

        <div className="border border-gold/15 p-6 rounded-xl bg-[#0a080b]/40 backdrop-blur-md shadow-lg space-y-5">
          <h2 className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-3">Design Details</h2>
          {request.design?.mainImage?.url && (
            <div className="w-24 h-32 rounded-lg overflow-hidden border border-gold/20 mb-3 shadow-md">
              <img src={request.design.mainImage.url} alt={request.designName} className="w-full h-full object-cover" />
            </div>
          )}
          <Field label="Design Name" value={request.designName} />
          <Field label="Category" value={request.design?.category?.name} />
          <Field label="Price" value={`₦${Number(request.designPrice).toLocaleString()}`} />
          <Field label="Quantity" value={request.quantity} />
          <Field label="Preferred Size" value={request.preferredSize} />
          <Field label="Preferred Color" value={request.preferredColor} />
          <Field label="Preferred Date" value={request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : null} />
        </div>
      </div>

      {hasMeasurements && (
        <div className="border border-gold/15 p-6 rounded-xl bg-[#0a080b]/40 backdrop-blur-md shadow-lg mb-8">
          <h2 className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-6 font-bold border-b border-gold/10 pb-3">Measurements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <Field label="Bust" value={m.bust} />
            <Field label="Waist" value={m.waist} />
            <Field label="Hip" value={m.hip} />
            <Field label="Shoulder" value={m.shoulder} />
            <Field label="Sleeve Length" value={m.sleeveLength} />
            <Field label="Dress Length" value={m.dressLength} />
            <Field label="Trouser Length" value={m.trouserLength} />
            <Field label="Top Length" value={m.topLength} />
            <Field label="Neck" value={m.neck} />
            <Field label="Thigh" value={m.thigh} />
            <Field label="Armhole" value={m.armhole} />
          </div>
        </div>
      )}

      {request.notes && (
        <div className="border border-gold/15 p-6 rounded-xl bg-[#0a080b]/40 backdrop-blur-md shadow-lg mb-8">
          <h2 className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-3">Customer Notes</h2>
          <div className="bg-charcoal/50 p-4 rounded-lg border border-white/5">
            <p className="text-cream/90 italic text-sm leading-relaxed">"{request.notes}"</p>
          </div>
        </div>
      )}

      {request.referenceImage?.url && (
        <div className="border border-gold/15 p-6 rounded-xl bg-[#0a080b]/40 backdrop-blur-md shadow-lg mb-8">
          <h2 className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-3">Reference Image</h2>
          <a href={request.referenceImage.url} target="_blank" rel="noreferrer" className="inline-block group">
            <div className="w-48 h-64 rounded-xl overflow-hidden border border-gold/20 shadow-md group-hover:border-gold transition-colors">
              <img src={request.referenceImage.url} alt="Customer reference" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </a>
        </div>
      )}

      <p className="text-xs text-cream/40">
        Submitted {new Date(request.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default AdminRequestDetails;
