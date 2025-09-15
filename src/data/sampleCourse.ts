import { Course } from '../contexts/CourseContext';

export const samplePowerBICourse: Course = {
  id: 'powerbi-beginners',
  title: 'PowerBI for Beginners',
  description: 'Master Microsoft PowerBI from scratch with hands-on projects and real-world examples. Perfect for data analysts and business professionals.',
  thumbnail: '/api/placeholder/400/240',
  totalVideos: 12,
  totalDuration: '4h 5m',
  overallProgress: 0,
  modules: [
    {
      id: 'module-1',
      title: 'Beginner Foundations',
      description: 'Get started with PowerBI basics and fundamental concepts',
      totalDuration: '45m',
      progress: 0,
      videos: [
        {
          id: 'video-1-1',
          title: 'Introduction to PowerBI',
          duration: '15m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-1-2',
          title: 'Installing and Setting Up PowerBI',
          duration: '12m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-1-3',
          title: 'PowerBI Interface Overview',
          duration: '18m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Core Skills',
      description: 'Learn essential PowerBI features and data manipulation techniques',
      totalDuration: '1h 20m',
      progress: 0,
      videos: [
        {
          id: 'video-2-1',
          title: 'Connecting to Data Sources',
          duration: '22m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-2-2',
          title: 'Data Transformation with Power Query',
          duration: '25m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-2-3',
          title: 'Creating Your First Visualizations',
          duration: '18m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-2-4',
          title: 'Working with Relationships',
          duration: '15m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Practical Applications',
      description: 'Build real-world dashboards and advanced reporting solutions',
      totalDuration: '2h 0m',
      progress: 0,
      videos: [
        {
          id: 'video-3-1',
          title: 'Building Interactive Dashboards',
          duration: '28m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-3-2',
          title: 'Advanced DAX Functions',
          duration: '32m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-3-3',
          title: 'Creating Custom Visuals',
          duration: '25m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-3-4',
          title: 'Sharing and Publishing Reports',
          duration: '20m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        },
        {
          id: 'video-3-5',
          title: 'Final Project Walkthrough',
          duration: '15m',
          youtubeId: 'dQw4w9WgXcQ',
          completed: false
        }
      ]
    }
  ]
};