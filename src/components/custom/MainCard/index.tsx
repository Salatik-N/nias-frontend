import styles from './styles.module.scss'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface ProjectType {
  id: number
  type: string
}

interface ProjectImage {
  url: string
  width: number
  height: number
}

interface Project {
  id: number
  title: string
  description: string
  previewImage: ProjectImage
  project_types: ProjectType[]
  url: string
}

interface MainCardProps {
  card: Project
  type: string
}

const MainCard: React.FC<MainCardProps> = ({ card, type }) => {
  return (
    <div className={styles.card}>
      <span className={styles.cardTitle}>{card.title}</span>
      <div className={styles.cardContent}>
        {type === 'project' && (
          <ul className={styles.stack}>
            {card.project_types.map((item) => (
              <li key={item.id}>
                <i className={`icon-${item.type.toLowerCase()}`} />
              </li>
            ))}
          </ul>
        )}
        <Image
          className={styles.image}
          src={card.previewImage.url}
          width={card.previewImage.width}
          height={card.previewImage.height}
          alt="Card image"
        />
        <div className={styles.info}>
          <p className={styles.description}>{card.description}</p>
          {type === 'project' ? (
            <Button
              href={card.url}
              variant="gray"
              target="_blank"
              rel="nofollow"
            >
              {card.url}
            </Button>
          ) : (
            <Button href="contact-us" variant="gray">
              Contact us
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainCard
