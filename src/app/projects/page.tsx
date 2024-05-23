'use client'

import { useEffect, useState } from 'react'
import MainCard from '@/components/custom/MainCard'
import { getProjectsPageData } from '@/data/loaders'
import Container from '@/components/custom/Container'

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
  projects: {
    data: Project[]
  }
}

export default function ProjectsRoute() {
  const [projectsPageData, setProjectsPageData] = useState<ProjectsPage>(Object)

  useEffect(() => {
    const fetchData = async () => {
      const projectsPageData = await getProjectsPageData()
      console.log(projectsPageData)
      setProjectsPageData(projectsPageData)
    }

    fetchData()
  }, [])
  return (
    <Container>
      <h1>ProjectsRoute</h1>
      <div className="card-list">
        {projectsPageData?.projects?.data.length
          ? projectsPageData.projects.data.map((card) => (
              <MainCard key={card.id} card={card} type="project" />
            ))
          : 'Loading'}
      </div>
    </Container>
  )
}
