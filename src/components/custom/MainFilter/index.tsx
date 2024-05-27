import styles from './styles.module.scss'
import Button from '@/components/ui/Button'
import Checkbox from '@public/checkbox.svg'

interface ProjectType {
  id: number
  type: string
}

interface ProjectTypes {
  projectTypes: {
    data: ProjectType[]
  }
  type: string
}

const MainFilter: React.FC<ProjectTypes> = ({ projectTypes, type }) => {
  return (
    <div className={styles.filter}>
      <span className={styles.filterTitle}>{type}</span>
      <ul>
        {projectTypes?.data.map((item) => (
          <li key={item.id} className={styles.filterItem}>
            <label htmlFor={item.id.toString()}>
              <input
                type="checkbox"
                id={item.id.toString()}
                data-project-type={item.type}
              />
              <div className={styles.customCheckbox}>
                <Checkbox />
              </div>
              <i className={`icon-${item.type.toLowerCase()}`} />
              {item.type}
            </label>
          </li>
        ))}
      </ul>
      <Button variant="yellow">Apply</Button>
    </div>
  )
}

export default MainFilter
