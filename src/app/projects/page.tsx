'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const fetchData = async () => {
      const projectsPageData = await getProjectsPageData()
      setProjectsPageData(projectsPageData)
      const projectsData = await getProjectsData()
      setProjectsData(projectsData)
      const projectTypes = await getProjectTypes()
      setProjectTypes(projectTypes)
    }

    fetchData()
  }, [])

  return (
    <Container>
      <h1 className="visuallyhidden">hiden title</h1>
      <div className="card-block">
        <MainFilter projectTypes={projectTypes} type="project" />
        <div className="card-list">
          {projectsData?.length ? (
            projectsData.map((card) => (
              <MainCard key={card.id} card={card} type="project" />
            ))
          ) : (
            <Loader theme="light" width={50} height={50} />
          )}
        </div>
      </div>
    </Container>
  )
}
