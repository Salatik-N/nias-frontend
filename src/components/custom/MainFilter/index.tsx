import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Checkbox from '@public/checkbox.svg'

import styles from './styles.module.scss'

interface ProjectType {
  id: number
  type: string
}

interface ProjectTypes {
  filterTypes: {
    data: ProjectType[]
  }
  type: 'projects' | 'services'
  onApply: (selectedTypes: string[]) => void
}

const MainFilter: React.FC<ProjectTypes> = ({ filterTypes, type, onApply }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  useEffect(() => {
    const typesQuery = searchParams.get('type')
    if (typesQuery) {
      const types = JSON.parse(typesQuery)
      setSelectedTypes(types)
    }
  }, [searchParams])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, dataset } = event.target
    const projectType = dataset.projectType || ''

    setSelectedTypes((prevSelectedTypes) => {
      if (checked) {
        return [...prevSelectedTypes, projectType]
      } else {
        return prevSelectedTypes.filter((type) => type !== projectType)
      }
    })
  }

  const handleApplyClick = () => {
    const query =
      selectedTypes.length > 0
        ? `?type=[${selectedTypes.map((type) => `"${type}"`).join(',')}]`
        : ''
    router.push(`/${type}${query}`)
    onApply(selectedTypes)
  }

  return (
    <div className={styles.filter}>
      <span className={styles.filterTitle}>{type}</span>
      <ul>
        {filterTypes?.data?.map((item) => (
          <li key={item.id} className={styles.filterItem}>
            <label htmlFor={item.id.toString()}>
              <input
                type="checkbox"
                id={item.id.toString()}
                data-project-type={item.type}
                onChange={handleCheckboxChange}
                checked={selectedTypes.includes(item.type)}
              />
              <div className={styles.customCheckbox}>
                <Checkbox />
              </div>
              {type === 'projects' && (
                <i className={`icon-${item.type.toLowerCase()}`} />
              )}
              {item.type}
            </label>
          </li>
        ))}
      </ul>
      <Button onClick={handleApplyClick} variant="yellow">
        Apply
      </Button>
    </div>
  )
}

export default MainFilter
