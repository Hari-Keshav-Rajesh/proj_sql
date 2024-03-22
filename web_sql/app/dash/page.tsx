import Title from "@/components/dash/title";

import Rate from "@/components/dash/rate";

import FAQs from "@/components/dash/faq/faq";

export default function home() {
  return (
    <div className="mt-32 flex flex-col gap-24 lg:gap-40">
      <Title />
      <div className="mx-10">
        <Rate />
      </div>
      <div className="mx-10">
        <FAQs />
      </div>
    </div>
  );
}