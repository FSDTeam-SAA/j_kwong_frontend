"use client";
import Image from "next/image";
import FadeL from "../animation/fadeL";
import FadeR from "../animation/fadeR";

export default function WhoAreWe() {
  return (
    <section className=" container py-8 md:py-16">
      <div>
        <h1 className="text-[24px] lg:text-[34px] text-textPrimary flex items-center justify-center mb-[30px] lg:mb-[50px] font-semibold">
          <div className="h-8 w-2 bg-primary mr-2 "></div>
          Who are we?
        </h1>
        <div className="grid md:grid-cols-[1fr,auto] gap-10 lg:gap-8 items-start">
          <FadeL className="space-y-6 lg:w-[450px] text-[16px]">
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
              We are committed to providing diverse perspectives on
              environmental challenges and solutions, and we encourage
              submissions from all members of the college community.
            </p>
          </FadeL>

          <FadeR className="relative md:translate-x-[-80px] mb-[160px] lg:mb-2">
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
          </FadeR>
        </div>
      </div>
    </section>
  );
}
