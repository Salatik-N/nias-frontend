import { getGlobalPageData } from '@/data/loaders'

export default async function Page() {
  const globalPageData = await getGlobalPageData()

  console.dir(globalPageData)
  return <div>123</div>
}
