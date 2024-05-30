'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MainCard from '@/components/custom/MainCard'
import MainFilter from '@/components/custom/MainFilter'
import {
  getProjectsPageData,
  getProjectsData,
  getProjectTypes,
} from '@/data/loaders'
import Container from '@/components/custom/Container'
import Loader from '@/components/ui/Loader'

interface ProjectType {
  id: number
  type: string
}

interface ProjectTypes {
  data: ProjectType[]
  meta: Object
}

interface Project {
  id: number
  title: string
  description: string
  previewImage: Object
  project_types: {
    data: ProjectType[]
  }
  url: string
}

interface ProjectsPage {
  id: number
}

export default function ProjectsRoute() {
  const [projectsPageData, setProjectsPageData] = useState<ProjectsPage>(Object)
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [projectTypes, setProjectTypes] = useState<ProjectTypes>(Object)
  const [isFetching, setIsFetching] = useState(true)

  const searchParams = useSearchParams()

  const fetchInitialData = async () => {
    const projectsPageData = await getProjectsPageData()
    setProjectsPageData(projectsPageData)
    const projectTypes = await getProjectTypes()
    setProjectTypes(projectTypes)
  }

  const fetchProjectsData = async (types?: string[]) => {
    const projectsData = await getProjectsData(types)
    setProjectsData(projectsData)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchInitialData()
      const typesQuery = searchParams.get('type')
      const types = typesQuery ? JSON.parse(typesQuery) : []
      await fetchProjectsData(types)
      setIsFetching(false)
    }

    fetchData()
  }, [])

  const handleApply = async (selectedTypes: string[]) => {
    setIsFetching(true)
    await fetchProjectsData(selectedTypes)
    setIsFetching(false)
  }

  const renderContent = () => {
    if (isFetching) {
      return <Loader theme="light" width={50} height={50} />
    }

    if (projectsData.length > 0) {
      return projectsData.map((card) => (
        <MainCard key={card.id} card={card} type="project" />
      ))
    }

    return <h2>Not found</h2>
  }

  return (
    <Container>
      <h1 className="visuallyhidden">hiden title</h1>
      <div className="card-block">
        <MainFilter
          filterTypes={projectTypes}
          onApply={handleApply}
          type="projects"
        />
        <div className="card-list">{renderContent()}</div>
      </div>
    </Container>
  )
}
