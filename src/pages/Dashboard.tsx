import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  PlayCircle, 
  Trophy, 
  Clock, 
  BookOpen, 
  Star,
  TrendingUp,
  Calendar,
  Award,
  Target,
  ChevronRight
} from 'lucide-react';
import { useCourse } from '@/contexts/CourseContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentCourse, userProgress } = useCourse();

  const recentCourses = [
    {
      id: 'powerbi',
      title: 'PowerBI for Beginners',
      progress: currentCourse?.overallProgress || 0,
      lastAccessed: '2 hours ago',
      thumbnail: '/api/placeholder/100/60',
      totalVideos: 12,
      completedVideos: Math.floor((currentCourse?.overallProgress || 0) / 100 * 12)
    },
    {
      id: 'react',
      title: 'React Fundamentals',
      progress: 75,
      lastAccessed: '3 days ago',
      thumbnail: '/api/placeholder/100/60',
      totalVideos: 18,
      completedVideos: 14
    },
    {
      id: 'python',
      title: 'Python Data Science',
      progress: 100,
      lastAccessed: '1 week ago',
      thumbnail: '/api/placeholder/100/60',
      totalVideos: 24,
      completedVideos: 24
    }
  ];

  const achievements = [
    { id: 1, title: 'Fast Learner', description: 'Completed 5 videos in one day', icon: TrendingUp, earned: true },
    { id: 2, title: 'Consistent Student', description: '7 day learning streak', icon: Calendar, earned: true },
    { id: 3, title: 'Quiz Master', description: 'Scored 100% on 10 quizzes', icon: Award, earned: true },
    { id: 4, title: 'Course Completer', description: 'Finished your first course', icon: Trophy, earned: false },
    { id: 5, title: 'Knowledge Seeker', description: 'Explored 5 different topics', icon: Target, earned: false }
  ];

  const weeklyStats = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 40 }
  ];

  const maxMinutes = Math.max(...weeklyStats.map(s => s.minutes));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">LearnPath AI</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Settings</Button>
              <Button variant="outline">Upgrade</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Continue your learning journey and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value">{userProgress.coursesCompleted}</div>
                <div className="stat-label">Courses Completed</div>
              </div>
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value">{userProgress.totalWatchTime}</div>
                <div className="stat-label">Total Watch Time</div>
              </div>
              <Clock className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value">{userProgress.streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value">{userProgress.achievements.length}</div>
                <div className="stat-label">Achievements</div>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Courses</h2>
              <Button variant="outline" onClick={() => navigate('/')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Browse More
              </Button>
            </div>

            <div className="space-y-4">
              {recentCourses.map((course) => (
                <Card key={course.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-success/20 rounded-lg flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            if (course.id === 'powerbi' && currentCourse) {
                              navigate('/learn');
                            }
                          }}
                        >
                          Continue
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span>{course.completedVideos}/{course.totalVideos} videos</span>
                        <span>•</span>
                        <span>Last accessed {course.lastAccessed}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Progress value={course.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{Math.round(course.progress)}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Weekly Activity */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">This Week's Activity</h3>
              <div className="space-y-3">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground w-8">{stat.day}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-success rounded-full" 
                          style={{ width: `${(stat.minutes / maxMinutes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{stat.minutes}m</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.earned ? 'bg-success/10' : 'bg-muted/50 opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-success/20 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <achievement.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Goals */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Learning Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Complete PowerBI Course</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(currentCourse?.overallProgress || 0)}%
                    </span>
                  </div>
                  <Progress value={currentCourse?.overallProgress || 0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">30 minutes daily</span>
                    <span className="text-sm text-muted-foreground">6/7 days</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;