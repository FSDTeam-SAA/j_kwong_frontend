"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeB from "../animation/fadeB";
import axios from "axios";

export default function PopularCarousel() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [latestArticle, setLatestArticle] = useState([]);

  const fetchLatestBlogs = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/blogs/latest`
    );
    setLatestArticle(response.data.data);
  };
  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-[200px] mb-[100px]">
      <div>
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-8 bg-primary"></div>
          <h2 className="text-textPrimary text-[24px] md:text-[34px] font-semibold">
            Popular This Month
          </h2>
        </div>
        <FadeB>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              // slidesToScroll: 3,
            }}
          >
            <CarouselContent>
              {latestArticle.map((article, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none rounded-lg bg-transparent select-none shadow-none">
                    <Link href={`/article/${article.slug}`} className="">
                      <div className="border-2 border-primary rounded-lg min-w-[370px] h-[250px] overflow-hidden box-border">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${article.image}`}
                          alt={article.title}
                          width={400}
                          height={400}
                          className="!object-cover w-full h-full rounded-lg "
                        />
                      </div>
                    </Link>

                    <div className="bg-transparent">
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /> */}
                      <div className="">
                        <Link href={`/article/${article.slug}`}>
                          <h3 className="text-textPrimary hover:text-primary font-semibold mb-2 text-[18px] lg:text-[24px] pt-4">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-textPrimary text-sm">
                          {formatDate(article.date)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </FadeB>
        <div className="flex justify-center gap-2 mt-4">
          {latestArticle.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                current === index ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
