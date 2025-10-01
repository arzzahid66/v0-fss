export interface GalleryItem {
  id: number
  src: string
  title: string
  description: string
  category: string
}

export const categories = [
  "Art and Creativity",
  "Public Speaking", 
  "Leadership Events",
  "Student Results"
]

// Shared gallery items data
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/student-art.jpg",
    title: "Student Artwork",
    description: "Students showcasing their artistic talents and creative expressions through various mediums and cultural projects.",
    category: "Art and Creativity",
  },
  {
    id: 2,
    src: "/images/student-speech.jpg",
    title: "Student Speech",
    description: "Students developing confidence and communication skills through public speaking activities and presentations.",
    category: "Public Speaking",
  },
  {
    id: 3,
    src: "/images/leadership-event.jpg",
    title: "Leadership Event",
    description: "School leadership addressing students and community members during important institutional events.",
    category: "Leadership Events",
  },
  {
    id: 4,
    src: "/images/results.jpg",
    title: "Matric 2024 Results",
    description: "Outstanding academic achievements of our students in Matric 2024 examinations with top performers achieving remarkable scores.",
    category: "Student Results",
  },
  {
    id: 5,
    src: "/images/results_2.jpg",
    title: "Academic Excellence 2024",
    description: "Celebrating our students' exceptional performance and dedication to academic excellence in the 2024 academic year.",
    category: "Student Results",
  },
]
