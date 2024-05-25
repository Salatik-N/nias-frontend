'use client'

import { useEffect, useState } from 'react'
import MainCard from '@/components/custom/MainCard'
import { getProjectsPageData, getProjectsData } from '@/data/loaders'
import Container from '@/components/custom/Container'
import Loader from '@/components/ui/Loader'

interface ProjectType {
  id: number
  type: string
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

export default function ServicesRoute() {
  const [projectsPageData, setProjectsPageData] = useState<ProjectsPage>(Object)
  const [projectsData, setProjectsData] = useState<Project[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const projectsPageData = await getProjectsPageData()
      setProjectsPageData(projectsPageData)
      const projectsData = await getProjectsData()
      console.log(projectsData)
      setProjectsData(projectsData)
    }

    fetchData()
  }, [])
  return (
    <Container>
      <h1>ProjectsRoute</h1>
      <div className="card-list">
        {projectsData?.length ? (
          projectsData.map((card) => (
            <MainCard key={card.id} card={card} type="project" />
          ))
        ) : (
          <Loader theme="light" width={50} height={50} />
        )}
      </div>
    </Container>
  )
}
