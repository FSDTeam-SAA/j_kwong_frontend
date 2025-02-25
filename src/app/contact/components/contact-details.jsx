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
          Don&apos;t hesitate to send a message using this form if you have any
          questions or would like to get involved!
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-zinc-400">Alternatively, reach out directly at</p>
        <a
          href="mailto:theflorentina@etonocollege.org.uk"
          className="text-primary hover:underline break-all"
        >
          theflorentina@etonocollege.org.uk
        </a>
      </div>
    </div>
  );
};

export default ContactDetails;
