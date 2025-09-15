import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, PlayCircle, BookOpen, CheckCircle2, Users } from 'lucide-react';
import { useCourse } from '@/contexts/CourseContext';
import { samplePowerBICourse } from '@/data/sampleCourse';

const CourseGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, isGenerating, setIsGenerating, setCourse, currentCourse } = useCourse();
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [loadingStep, setLoadingStep] = React.useState('Analyzing your query...');

  useEffect(() => {
    if (!searchQuery) {
      navigate('/');
      return;
    }

    if (isGenerating) {
      const steps = [
        'Analyzing your query...',
        'Searching YouTube for relevant content...',
        'Filtering high-quality tutorials...',
        'Organizing content into modules...',
        'Creating learning structure...',
        'Generating course materials...'
      ];

      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setLoadingStep(steps[stepIndex]);
          setLoadingProgress((stepIndex + 1) * (100 / steps.length));
          stepIndex++;
        } else {
          clearInterval(interval);
          setCourse(samplePowerBICourse);
          setIsGenerating(false);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [searchQuery, isGenerating, navigate, setCourse, setIsGenerating]);

  const handleStartLearning = () => {
    navigate('/learn');
  };

  const handleBackToSearch = () => {
    navigate('/');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gentle">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Creating Your Course
            </h1>
            <p className="text-muted-foreground mb-8">
              AI is curating the best content for: <span className="font-semibold text-primary">"{searchQuery}"</span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{loadingStep}</span>
                <span className="text-sm text-muted-foreground">{Math.round(loadingProgress)}%</span>
              </div>
              <Progress value={loadingProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <Card className="p-4 text-center opacity-70">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Structured Content</h3>
                <p className="text-sm text-muted-foreground">Organized into clear modules</p>
              </Card>
              <Card className="p-4 text-center opacity-70">
                <Users className="w-8 h-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold">Expert Curation</h3>
                <p className="text-sm text-muted-foreground">Best tutorials selected</p>
              </Card>
              <Card className="p-4 text-center opacity-70">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor your learning</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <Button onClick={handleBackToSearch}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToSearch} className="hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Search
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">LearnPath AI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Course Overview */}
        <div className="animate-fade-in-up mb-12">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <span>Course Generated</span>
            <span>•</span>
            <span>Ready to Learn</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentCourse.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">{currentCourse.description}</p>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-5 h-5 text-primary" />
              <span className="font-medium">{currentCourse.totalVideos} videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-success" />
              <span className="font-medium">{currentCourse.totalDuration} total</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">{currentCourse.modules.length} modules</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white px-8 py-3 text-lg"
            onClick={handleStartLearning}
          >
            Start Learning Now
          </Button>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Course Structure</h2>
          
          {currentCourse.modules.map((module, index) => (
            <Card key={module.id} className="module-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-success/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{module.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <span>{module.videos.length} videos</span>
                    <span>•</span>
                    <span>{module.totalDuration}</span>
                  </div>

                  <div className="module-progress mb-4">
                    <div 
                      className="module-progress-fill" 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {module.videos.map((video, videoIndex) => (
                  <div 
                    key={video.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center">
                        {video.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{videoIndex + 1}</span>
                        )}
                      </div>
                      <span className={`font-medium ${video.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {video.title}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{video.duration}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Start Learning CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-br from-primary/5 to-success/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Skills?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your personalized learning path is ready. Start with Module 1 and progress at your own pace 
            with interactive quizzes and progress tracking.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white px-8 py-3 text-lg"
            onClick={handleStartLearning}
          >
            Begin Your Learning Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseGenerator;