"use client";

import Link from "next/link";

export default function Header() {
    return (
        <section className="team-section pb-[80px] lg:pb-[125px] overflow-hidden">
            <div className="container">
                <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-5 md:gap-x-[30px] mb-[-30px]">
                    <div className="xl:pr-[20px] self-center mb-[30px] sm:col-span-3 lg:col-span-1 max-w-[500px]">
                        <span className="text-secondary text-tiny capitalize inline-block mb-[15px]">
                            Our Team
                        </span>
                        <h2 className="font-lora text-primary text-[24px] sm:text-[30px] leading-[1.277] xl:text-xl capitalize mb-[15px] font-medium">
                            Here is our Experts<span className="text-secondary">.</span>
                        </h2>
                        <p>
                            Huge number propreties availabe here for buy, sell and Rent, you a
                            find here co-living property lots to choose here and enjoy huge.{" "}
                        </p>
                        <a
                            href=""
                            className="flex flex-wrap items-center text-secondary text-tiny mt-[20px]"
                        >
                            View all Post
                            <svg
                                className="ml-[10px]"
                                width={26}
                                height={11}
                                viewBox="0 0 26 11"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20.0877 0.69303L24.2075 5.00849H0V5.99151H24.2075L20.0877 10.307L20.7493 11L26 5.5L20.7493 0L20.0877 0.69303Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </div>
                    {/* single team start */}
                    {/* <div className="text-center group mb-[30px]">
                        <div className="relative rounded-[6px_6px_0px_0px]">
                            <a href="">
                                <img
                                    src="assets/images/img/Team/"
                                    className="w-auto h-auto block mx-auto"
                                    loading="lazy"
                                    width={215}
                                    height={310}
                                    alt="Amitava Halder"
                                />
                            </a>
                            <ul className="flex flex-col absolute w-full top-[30px] left-0 overflow-hidden">
                                <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-300 mb-[15px]">
                                    <a
                                        href=""
                                        aria-label="LinkedIn"
                                        className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#0A66C2]"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6C1.11 6 0 4.88 0 3.5C0 2.12 1.11 1 2.49 1C3.87 1 4.98 2.12 4.98 3.5ZM0.24 8.98H4.73V24H0.24V8.98ZM8.98 8.98H13.29V11.02H13.35C13.95 9.88 15.42 8.68 17.52 8.68C22.06 8.68 24 11.62 24 15.42V24H19.51V16.02C19.51 14.1 19.47 11.62 16.83 11.62C14.15 11.62 13.74 13.7 13.74 15.88V24H9.25V8.98H8.98Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-300 mb-[15px]">
                                    <a
                                        href="tel:+919175070228"
                                        aria-label="Call"
                                        className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#25D366]"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#FFFDFC] z-[1] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] rounded-[0px_0px_6px_6px] px-3 md:px-[15px] py-[20px] border-b-[6px] border-primary transition-all duration-500 before:transition-all before:duration-300 group-hover:border-secondary relative">
                            <h3>
                                <a
                                    href=""
                                    className="font-lora font-normal text-base text-primary group-hover:text-secondary"
                                >
                                    Amitava Halder
                                </a>
                            </h3>
                            <p className="font-normal text-[14px] leading-none capitalize mt-[5px] group-hover:text-body">
                                Founder
                            </p>
                        </div>
                    </div> */}
                    <div className="text-center group mb-[30px]">
                        <div className="relative rounded-[6px_6px_0px_0px]">
                            <a href="">
                                <img
                                    src="assets/images/img/Team/shadique khan.jpg"
                                    className="w-auto h-auto block mx-auto"
                                    loading="lazy"
                                    width={215}
                                    height={310}
                                    alt="shadique khan"
                                />
                            </a>
                            <ul className="flex flex-col absolute w-full top-[30px] left-0 overflow-hidden">
                                <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-300 mb-[15px]">
                                    <a
                                        href="https://www.linkedin.com/in/sadique-khan-23651129b/"
                                        aria-label="LinkedIn"
                                        className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#0A66C2]"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6C1.11 6 0 4.88 0 3.5C0 2.12 1.11 1 2.49 1C3.87 1 4.98 2.12 4.98 3.5ZM0.24 8.98H4.73V24H0.24V8.98ZM8.98 8.98H13.29V11.02H13.35C13.95 9.88 15.42 8.68 17.52 8.68C22.06 8.68 24 11.62 24 15.42V24H19.51V16.02C19.51 14.1 19.47 11.62 16.83 11.62C14.15 11.62 13.74 13.7 13.74 15.88V24H9.25V8.98H8.98Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-300 mb-[15px]">
                                    <a
                                        href="tel:+917317241999"
                                        aria-label="Call"
                                        className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#25D366]"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#FFFDFC] z-[1] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] rounded-[0px_0px_6px_6px] px-3 md:px-[15px] py-[20px] border-b-[6px] border-primary transition-all duration-500 before:transition-all before:duration-300 group-hover:border-secondary relative">
                            <h3>
                                <a
                                    href=""
                                    className="font-lora font-normal text-base text-primary group-hover:text-secondary"
                                >
                                    Sadique Khan
                                </a>
                            </h3>
                            <p className="font-normal text-[14px] leading-none capitalize mt-[5px] group-hover:text-body">
                                Co-Founder
                            </p>
                        </div>
                    </div>
                    {/* single team end*/}
                </div>
            </div>
        </section>

    );
}
