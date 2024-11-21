import SearchSection from "@/components/SearchSection";

export default function Home() {
  return (
    <>
      <p>{process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "ok" : "no"}</p>
      <SearchSection />
    </>
  );
}
