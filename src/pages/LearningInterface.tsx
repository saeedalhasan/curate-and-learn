import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  PlayCircle, 
  Pause, 
  CheckCircle2, 
  Clock, 
  BookOpen,
  ChevronRight,
  Trophy,
  Volume2
} from 'lucide-react';
import { useCourse } from '@/contexts/CourseContext';
import QuizModal from '@/components/QuizModal';

const LearningInterface: React.FC = () => {
  const navigate = useNavigate();
  const { currentCourse, currentVideoId, setCurrentVideoId, markVideoCompleted } = useCourse();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentTime, setCurrentTime] = useState('2:45');
  const [totalTime, setTotalTime] = useState('15:30');

  React.useEffect(() => {
    if (!currentCourse) {
      navigate('/');
      return;
    }

    // Set first video as current if none selected
    if (!currentVideoId && currentCourse.modules[0]?.videos[0]) {
      setCurrentVideoId(currentCourse.modules[0].videos[0].id);
    }
  }, [currentCourse, currentVideoId, setCurrentVideoId, navigate]);

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Course not found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentVideo = currentCourse.modules
    .flatMap(m => m.videos)
    .find(v => v.id === currentVideoId);

  const handleVideoComplete = () => {
    if (currentVideoId) {
      markVideoCompleted(currentVideoId);
      setShowQuiz(true);
    }
  };

  const handleNextVideo = () => {
    const allVideos = currentCourse.modules.flatMap(m => m.videos);
    const currentIndex = allVideos.findIndex(v => v.id === currentVideoId);
    if (currentIndex < allVideos.length - 1) {
      setCurrentVideoId(allVideos[currentIndex + 1].id);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    handleNextVideo();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/course')} className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Course Overview
              </Button>
              <div className="hidden md:block">
                <Progress value={currentCourse.overallProgress} className="w-32" />
                <span className="text-xs text-muted-foreground ml-2">
                  {Math.round(currentCourse.overallProgress)}% complete
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <Trophy className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center p-4">
            <div className="video-player-container max-w-4xl w-full">
              {currentVideo ? (
                <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
                  {/* Placeholder for YouTube embed */}
                  <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
                    <p className="text-gray-300 mb-4">YouTube Video Player</p>
                    <p className="text-sm text-gray-400 mb-6">
                      In a real implementation, this would embed: youtube.com/watch?v={currentVideo.youtubeId}
                    </p>
                    
                    {/* Mock Video Controls */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      </Button>
                      <span className="text-sm">{currentTime} / {currentVideo.duration}</span>
                      <Button variant="secondary" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button 
                      onClick={handleVideoComplete}
                      className="bg-success hover:bg-success/90"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a video to start learning</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Info */}
          {currentVideo && (
            <div className="p-6 border-t border-border bg-card">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentVideo.duration}
                      </span>
                      {currentVideo.completed && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleNextVideo} disabled={!currentVideo}>
                    Next Video
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border bg-card overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">{currentCourse.title}</h3>
            
            <div className="space-y-4">
              {currentCourse.modules.map((module) => (
                <Card key={module.id} className="p-4">
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">{module.title}</h4>
                    <div className="module-progress mb-2">
                      <div 
                        className="module-progress-fill" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {module.videos.filter(v => v.completed).length}/{module.videos.length} completed
                    </div>
                  </div>

                  <div className="space-y-2">
                    {module.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setCurrentVideoId(video.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          video.id === currentVideoId
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 flex-shrink-0">
                            {video.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : video.id === currentVideoId ? (
                              <PlayCircle className="w-5 h-5 text-primary" />
                            ) : (
                              <div className="w-5 h-5 border border-border rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${
                              video.completed ? 'text-muted-foreground line-through' : ''
                            }`}>
                              {video.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{video.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && currentVideo && (
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
          videoTitle={currentVideo.title}
        />
      )}
    </div>
  );
};

export default LearningInterface;