import Image from "next/image";
import React from "react";

const MainSection = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-[1fr,auto] gap-10 lg:gap-8 items-start my-[40px] md:my-[80px]">
        <div className="space-y-6 lg:w-[450px] text-[16px]">
          <p className="text-textPrimary leading-relaxed">
            Welcome to [College Name]&apos;s Student-Run Environmental
            Publication, a platform created and managed by students passionate
            about protecting our planet. Our mission is to raise awareness,
            ignite meaningful discussions, and inspire action towards a more
            sustainable future.
          </p>

          <p className="text-textPrimary leading-relaxed">
            As an entirely student-driven publication, we provide a space for
            students to explore environmental issues, share innovative
            solutions, and highlight the work of individuals and organizations
            making a positive impact on the environment. We believe that
            informed and engaged students have the power to drive change, and
            through our publication, we aim to foster a community of
            environmental advocates.
          </p>

          <p className="text-textPrimary leading-relaxed">
            Whether it&apos;s covering the latest in climate science,
            sustainability initiatives, or offering tips for living more
            eco-friendly, our goal is to educate, inspire, and motivate our
            readers to take practical steps in preserving the world around us.
          </p>

          <p className="text-textPrimary leading-relaxed">
            We are committed to providing diverse perspectives on environmental
            challenges and solutions, and we encourage submissions from all
            members of the college community.
          </p>
        </div>

        <div className="relative lg:translate-x-[-80px] mb-[160px] lg:mb-2">
          <div className="relative w-[260px] mx-auto ">
            <Image
              src="/assets/homepage/whoarewe1.png"
              alt="Who are we Image"
              width={550}
              height={500}
              className="w-[250px] h-[300px] lg:w-[550px] lg:h-[500px] object-cover rounded-[12px] overflow-hidden"
            />
            <div className="absolute bottom-[-100px] lg:right-[-150px] right-[-10px]">
              <Image
                src="/assets/homepage/whoarewe2.png"
                alt="Who are we Image"
                width={250}
                height={250}
                className="rounded-[12px] h-[170px] w-[170px] lg:h-[250px] lg:w-[250px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-light text-textPrimary flex items-center justify-start mb-[30px] lg:mb-[50px]">
          <div className="h-8 w-2 bg-primary mr-2"></div>
          About Us
        </h1>
        <p className="text-textPrimary">
          The publication is run by a team of students at Eton College. We aim
          to provide students with a platform to explore their passion for
          sustainability and the environment through the ability to read, write
          and create media for the publication.
          <br />
          <br />
          This issue is one of the most important issues that humanity has ever
          faced and we believe that a deep understanding of how we can solve it
          is necessary.
          <br />
          <br /> We welcome articles throughout the year and update the site
          constantly! Get involved by reaching out with our contact form, or
          send an email to theflorentina@etoncollege.org.uk.
        </p>
      </div>
    </div>
  );
};

export default MainSection;
