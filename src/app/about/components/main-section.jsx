import Image from "next/image";
import React from "react";

const MainSection = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-[1fr,auto] gap-10 lg:gap-8 items-center my-[40px] md:my-[80px]">
        <div className="space-y-6 lg:w-[550px] text-[16px]">
          <p className="text-textPrimary leading-relaxed">
            The Green Cloister is an independent, student-run environmental
            publication founded and coded by Jensen and Jason, two green-minded
            students at Winchester College.
          </p>

          <p className="text-textPrimary leading-relaxed">
            The name "the Green Cloister" draws inspiration from the historic
            "War Cloister" at Winchester College, representing our commitment to
            fostering a platform for thoughtful discussion and action on a wide
            range of environmental issues.
          </p>

          <p className="text-textPrimary leading-relaxed">
            As founders and chief editors, our goal is to produce and provide a
            platform; exploring diverse ecological topics and inspiring positive
            environmental change. While our core editorial team is based at our
            school, we proudly feature contributions from students at several
            schools across Hampshire, united by a shared passion for
            sustainability and climate engagement on campus and in our local
            county.
          </p>
        </div>

        <div className=" mb-[50px] lg:mb-2">
          <div className="  flex justify-center ">
            <Image
              src="https://res.cloudinary.com/drdztqgcx/image/upload/v1741070214/j_kowng/ykm5kmgt7xd8wc1badyj.jpg"
              alt="Who are we Image"
              width={800}
              height={1300}
              className="w-[250px] h-[420px] lg:w-[300px] lg:h-[500px] rounded-[12px] overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
