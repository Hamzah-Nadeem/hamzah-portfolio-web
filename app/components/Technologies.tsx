import React from "react";
import { FaReact } from "react-icons/fa";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaBootstrap } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaCss3 } from "react-icons/fa";
import { SiRadixui } from "react-icons/si";
import { FaSass } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const stackItems = [
  { id: 1, name: "React", icon: FaReact, color: "#61DAFB" }, // React Blue
  { id: 2, name: "Ant Design", icon: AiOutlineAntDesign, color: "#0170FE" }, // Ant Design Blue
  { id: 3, name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" }, // Bootstrap Purple
  { id: 4, name: "JavaScript", icon: IoLogoJavascript, color: "#F7DF1E" }, // JS Yellow
  { id: 5, name: "CSS3", icon: FaCss3, color: "#1572B6" }, // CSS3 Blue
  { id: 6, name: "Radix UI", icon: SiRadixui, color: "#fff" }, // Radix uses black by default
  { id: 7, name: "Sass", icon: FaSass, color: "#CC6699" }, // Radix uses black by default
  { id: 8, name: "Tailwind CSS", icon: RiTailwindCssFill, color: "#38BDF8" }, // Tailwind Blue
];

export const Technologies = () => {
  return (
    <section id="technologies" className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 text-center">
        <h2 className="text-5xl text-gray-200 font-bold mb-4 ">Technologies</h2>
        <div className="flex flex-wrap justify-center  gap:2 sm:gap-10">
          {stackItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center flex-col rounded-xl p-4"
            >
              <div>
                {React.createElement(item.icon, {
                  className: "w-22 h-22",
                  style: { color: item.color },
                })}
              </div>
              <p className="text-gray-400 font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
