import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  totalDuration: string;
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  totalVideos: number;
  totalDuration: string;
  overallProgress: number;
  thumbnail: string;
}

interface CourseContextType {
  currentCourse: Course | null;
  setCourse: (course: Course) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  currentVideoId: string | null;
  setCurrentVideoId: (videoId: string | null) => void;
  markVideoCompleted: (videoId: string) => void;
  userProgress: {
    coursesCompleted: number;
    totalWatchTime: string;
    streak: number;
    achievements: string[];
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  const setCourse = (course: Course) => {
    setCurrentCourse(course);
  };

  const markVideoCompleted = (videoId: string) => {
    if (!currentCourse) return;

    const updatedCourse = { ...currentCourse };
    let totalCompleted = 0;
    let totalVideos = 0;

    updatedCourse.modules = updatedCourse.modules.map(module => {
      const updatedVideos = module.videos.map(video => {
        if (video.id === videoId) {
          return { ...video, completed: true };
        }
        return video;
      });

      const completedInModule = updatedVideos.filter(v => v.completed).length;
      const moduleProgress = (completedInModule / updatedVideos.length) * 100;

      totalCompleted += completedInModule;
      totalVideos += updatedVideos.length;

      return {
        ...module,
        videos: updatedVideos,
        progress: moduleProgress
      };
    });

    updatedCourse.overallProgress = (totalCompleted / totalVideos) * 100;
    setCurrentCourse(updatedCourse);
  };

  const userProgress = {
    coursesCompleted: 3,
    totalWatchTime: "28h 45m",
    streak: 7,
    achievements: ["Fast Learner", "Consistent Student", "Quiz Master"]
  };

  const value: CourseContextType = {
    currentCourse,
    setCourse,
    searchQuery,
    setSearchQuery,
    isGenerating,
    setIsGenerating,
    currentVideoId,
    setCurrentVideoId,
    markVideoCompleted,
    userProgress
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};