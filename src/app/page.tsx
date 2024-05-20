import {getGlobalPageData} from "@/data/loaders";

export default async function Home() {

  const globalPageData = await getGlobalPageData()

  console.dir(globalPageData)
  return (
      <div>123</div>
  );
}
