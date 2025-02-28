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
        <div className="grid md:grid-cols-[1fr,auto] gap-10 lg:gap-8 items-center">
          <FadeL className="space-y-6 lg:max-w-[550px] text-[16px]">
            <p className="text-textPrimary leading-relaxed">
              The Green Cloister is an independent, student-run environmental
              publication founded and led by Jensen and Jason, two students from
              Winchester College originally from Hong Kong.
            </p>

            <p className="text-textPrimary leading-relaxed">
              The name "the Green Cloister" draws inspiration from the historic
              "War Cloister" at Winchester College, representing our commitment
              to fostering a platform for thoughtful discussion and action on a
              wide range of environmental issues.
            </p>

            <p className="text-textPrimary leading-relaxed">
              As founders and chief editors, our goal is to raise awareness,
              explore diverse ecological topics, and inspire positive
              environmental change on campus and beyond.
            </p>
          </FadeL>

          <FadeR className="relative md:translate-x-[-80px] lg:mb-2">
            <div className=" mb-[50px] lg:mb-2">
              <div className="  flex justify-center ">
                <Image
                  src="/assets/about.jpeg"
                  alt="Who are we Image"
                  width={800}
                  height={1300}
                  className="w-[250px] h-[420px] lg:w-[300px] lg:h-[500px] rounded-[12px] overflow-hidden"
                />
              </div>
            </div>
          </FadeR>
        </div>
      </div>
    </section>
  );
}
