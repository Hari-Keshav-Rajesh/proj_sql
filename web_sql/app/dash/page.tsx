import BookCard from "@/components/bookCard";

import Title from "@/components/dash/title";

import FAQs from "@/components/dash/faq/faq";

export default function home() {
  return (
    <div className="mt-32 flex flex-col gap-24">
      <Title />
      <div className="mx-20">
        <FAQs />
      </div>
    </div>
  );
}