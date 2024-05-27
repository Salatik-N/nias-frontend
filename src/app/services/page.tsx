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

  useEffect(() => {
    const fetchData = async () => {
      const servicesPageData = await getServicesPageData()
      setServicesPageData(servicesPageData)
      const servicesData = await getServicesData()
      setServicesData(servicesData)
      const serviceTypes = await getServiceTypes()
      setServiceTypes(serviceTypes)
    }

    fetchData()
  }, [])
  return (
    <Container>
      <h1 className="visuallyhidden">hiden title</h1>
      <div className="card-block">
        <MainFilter filterTypes={serviceTypes} type="service" />
        <div className="card-list">
          {servicesData?.length ? (
            servicesData.map((card) => (
              <MainCard key={card.id} card={card} type="service" />
            ))
          ) : (
            <Loader theme="light" width={50} height={50} />
          )}
        </div>
      </div>
    </Container>
  )
}
