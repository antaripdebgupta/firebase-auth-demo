import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/section/Hero"))

export default function Home() {
  return (
    <div>
      <Hero/>
    </div>
  );
}
