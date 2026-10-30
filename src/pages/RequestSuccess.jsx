import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "2348167473144";

const RequestSuccess = () => {
  const location = useLocation();
  const request = location.state?.request;

  if (!request) {
    return <Navigate to="/collections" replace />;
  }

  // Build the pre-filled WhatsApp message with full order details
  const whatsappMessage = [
    `Hello Tumzy Couture! 👋`,
    ``,
    `I just placed an order and wanted to confirm the details:`,
    ``,
    `📋 *Order Reference:* ${request.requestNumber}`,
    `👗 *Design:* ${request.designName}`,
    `💰 *Price:* ₦${Number(request.designPrice).toLocaleString()}`,
    ``,
    `👤 *Name:* ${request.customerName}`,
    `📞 *Phone:* ${request.phone}`,
    `📧 *Email:* ${request.email}`,
    ``,
    `📅 *Date:* ${new Date(request.createdAt).toLocaleString()}`,
    ``,
    `Please let me know the next steps. Thank you! 🙏`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-2xl mx-auto px-5 pt-32 pb-24 text-center">
      <SEO title="Request Successful" />
      {/* Success Icon */}
      <div className="relative inline-block mb-6">
        <FaCheckCircle className="text-gold text-6xl mx-auto" />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 animate-ping opacity-75" />
      </div>

      <h1 className="font-display text-4xl text-cream mb-3">Request Submitted Successfully</h1>
      <p className="text-cream/70 mb-10">
        Thank you for choosing Tumzy Couture and Styles. Your request has been received and
        our team will contact you shortly.
      </p>

      {/* Order Details Card */}
      <div className="border border-gold/20 bg-charcoal/60 p-8 text-left space-y-3 rounded-xl mb-6">
        <p className="text-gold text-sm uppercase tracking-wide font-semibold">
          Request Number: <span className="text-cream font-normal">{request.requestNumber}</span>
        </p>
        <div className="gold-rule my-4" />
        <p className="text-sm text-cream/70">
          <span className="text-cream/50">Selected Design:</span> {request.designName}
        </p>
        {request.designPrice && (
          <p className="text-sm text-cream/70">
            <span className="text-cream/50">Price:</span> ₦{Number(request.designPrice).toLocaleString()}
          </p>
        )}
        <p className="text-sm text-cream/70">
          <span className="text-cream/50">Customer Name:</span> {request.customerName}
        </p>
        <p className="text-sm text-cream/70">
          <span className="text-cream/50">Phone:</span> {request.phone}
        </p>
        <p className="text-sm text-cream/70">
          <span className="text-cream/50">Email:</span> {request.email}
        </p>
        <p className="text-sm text-cream/70">
          <span className="text-cream/50">Request Date:</span>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      {/* WhatsApp CTA — primary action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-xl shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 mb-4"
      >
        <FaWhatsapp className="text-2xl" />
        Send Order Details on WhatsApp
      </a>

      <p className="text-cream/40 text-xs mb-8">
        Tap the button above to open WhatsApp with your order details pre-filled — just hit send!
      </p>

      {/* Secondary action */}
      <Link
        to="/collections"
        className="inline-block border border-gold/30 text-gold px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300 rounded-lg"
      >
        Continue Browsing
      </Link>
    </div>
  );
};

export default RequestSuccess;
