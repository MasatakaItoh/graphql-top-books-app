import { Novels } from "@/app/components";

export default function Home() {
  return (
    <div className={"mx-auto p-8 max-w-4xl"}>
      <h1 className="text-5xl text-white font-bold text-center">Top Books</h1>

      <div className="mt-8">
        <Novels />
      </div>
    </div>
  );
}
