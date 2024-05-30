'use client'

import { useEffect, useState } from 'react'
import MainCard from '@/components/custom/MainCard'
import MainFilter from '@/components/custom/MainFilter'
import {
  getServicesPageData,
  getServicesData,
  getServiceTypes,
} from '@/data/loaders'
import Container from '@/components/custom/Container'
import Loader from '@/components/ui/Loader'
import { useSearchParams } from 'next/navigation'

interface ServiceType {
  id: number
  type: string
}

interface ServiceTypes {
  data: ServiceType[]
  meta: Object
}

interface Service {
  id: number
  title: string
  description: string
  previewImage: Object
  service_types: {
    data: ServiceType[]
  }
  url: string
}

interface ServicesPage {
  id: number
}

export default function ServicesRoute() {
  const [servicesPageData, setServicesPageData] = useState<ServicesPage>(Object)
  const [servicesData, setServicesData] = useState<Service[]>([])
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes>(Object)
  const [isFetching, setIsFetching] = useState(true)

  const searchParams = useSearchParams()

  const fetchInitialData = async () => {
    const servicesPageData = await getServicesPageData()
    setServicesPageData(servicesPageData)
    const serviceTypes = await getServiceTypes()
    setServiceTypes(serviceTypes)
  }

  const fetchServicesData = async (types?: string[]) => {
    const servicesData = await getServicesData(types)
    setServicesData(servicesData)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchInitialData()
      const typesQuery = searchParams.get('type')
      const types = typesQuery ? JSON.parse(typesQuery) : []
      await fetchServicesData(types)
      setIsFetching(false)
    }

    fetchData()
  }, [])

  const handleApply = async (selectedTypes: string[]) => {
    setIsFetching(true)
    await fetchServicesData(selectedTypes)
    setIsFetching(false)
  }

  const renderContent = () => {
    if (isFetching) {
      return <Loader theme="light" width={50} height={50} />
    }

    if (servicesData.length > 0) {
      return servicesData.map((card) => (
        <MainCard key={card.id} card={card} type="service" />
      ))
    }

    return <h2>Not found</h2>
  }

  return (
    <Container>
      <h1 className="visuallyhidden">hiden title</h1>
      <div className="card-block">
        <MainFilter
          filterTypes={serviceTypes}
          onApply={handleApply}
          type="services"
        />
        <div className="card-list">{renderContent()}</div>
      </div>
    </Container>
  )
}
