import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainSection = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-[1fr,auto] gap-10 lg:gap-8 items-center my-[40px] md:my-[80px]">
        <div className="space-y-6 lg:w-[550px] text-[16px]">
          <p className="text-textPrimary leading-relaxed">
            <strong>The Green Cloister</strong> is an independent, student-run
            environmental publication founded and coded by Jensen and Jason, two
            green-minded students at Winchester College.
          </p>

          <p className="text-textPrimary leading-relaxed">
            The name <em>"the Green Cloister"</em> draws inspiration from the
            historic 
            <em>"War Cloister"</em>  at Winchester College, representing our
            commitment to fostering a platform for thoughtful discussion and
            action on a wide range of environmental issues.
          </p>

          <p className="text-textPrimary leading-relaxed">
            As founders and chief editors, our goal is to produce and provide a
            platform; exploring diverse ecological topics and inspiring positive
            environmental change. While our core editorial team and lead editor
            Calam is based at our school, we proudly feature contributions from
            students at several schools across Hampshire, united by a shared
            passion for sustainability and climate engagement on campus and in
            our local county.
          </p>

          <div className="pt-2">
            <Link
              href="https://docs.google.com/document/d/1UcdjeQ0p4OI1yF5N1yI2zQfTiFA0HkQjDszDNzDg4SU"
              className="inline-flex items-center gap-2 rounded-[10px] border border-border px-4 py-2 text-sm font-medium text-textPrimary hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-offset-2"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open the full Green Cloister team document in a new tab"
            >
              Meet the full team
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <div className="mb-[50px] lg:mb-2">
          <div className="flex justify-center">
            <Image
              src="https://res.cloudinary.com/drdztqgcx/image/upload/v1741070214/j_kowng/ykm5kmgt7xd8wc1badyj.jpg"
              alt="Students from The Green Cloister editorial team"
              width={800}
              height={1300}
              sizes="(max-width: 1024px) 250px, 300px"
              className="w-[250px] h-[420px] lg:w-[300px] lg:h-[500px] rounded-[12px] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
