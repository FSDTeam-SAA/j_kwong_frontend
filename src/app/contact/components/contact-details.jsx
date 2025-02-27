import React from "react";

const ContactDetails = () => {
  return (
    <div className="w-full max-w-[510px] space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-primary" />
          <h1 className="text-3xl font-bold text-textPrimary">Contact Us</h1>
        </div>
        <p className="text-zinc-400">
          We’d love to hear from you! Whether you have any feedback,
          suggestions, or questions about our publication, don’t hesitate to get
          in touch with us.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-zinc-400">Alternatively, reach out directly at</p>
        <a
          href="mailto:thegreencloister@gmail.com"
          className="text-primary hover:underline break-all"
        >
          thegreencloister@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactDetails;
