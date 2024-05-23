import styles from './styles.module.scss'

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

interface MainCardProps {
  card: Project
  type: string
}

const MainCard: React.FC<MainCardProps> = ({ card, type }) => {
  return (
    <div className={styles.card}>
      <p>{card.title}</p>
      <p>{type}</p>
    </div>
  )
}

export default MainCard
