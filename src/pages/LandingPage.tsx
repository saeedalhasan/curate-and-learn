import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Brain, BookOpen, Trophy, PlayCircle, Users, Star } from 'lucide-react';
import { useCourse } from '@/contexts/CourseContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchQuery, setIsGenerating } = useCourse();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const handleGenerateCourse = () => {
    if (!localSearchQuery.trim()) return;
    
    setSearchQuery(localSearchQuery);
    setIsGenerating(true);
    navigate('/course');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerateCourse();
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Curation',
      description: 'Our AI analyzes thousands of YouTube videos to create perfectly structured learning paths tailored to your goals.'
    },
    {
      icon: BookOpen,
      title: 'Structured Learning',
      description: 'Transform chaotic tutorials into organized modules with clear progression and learning objectives.'
    },
    {
      icon: Trophy,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with AI-generated quizzes and track your progress with detailed analytics.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Courses Created' },
    { value: '200K+', label: 'Happy Learners' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                LearnPath AI
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Transform YouTube chaos into
              <span className="block bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                structured mastery
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
              Turn chaotic YouTube tutorials into organized learning paths with AI-powered curation, 
              interactive quizzes, and progress tracking.
            </p>
          </div>

          {/* Search Box */}
          <div className="hero-search-container animate-scale-in mb-12">
            <div className="hero-search-box">
              <div className="flex items-center">
                <Search className="w-7 h-7 text-muted-foreground ml-8" />
                <Input
                  className="hero-search-input"
                  placeholder="What do you want to learn? (e.g., PowerBI for beginners)"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  onClick={handleGenerateCourse}
                  className="hero-search-button"
                  disabled={!localSearchQuery.trim()}
                >
                  Generate Course
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {['React for beginners', 'Python data science', 'Digital marketing'].map((example) => (
              <Button
                key={example}
                variant="secondary"
                size="sm"
                onClick={() => setLocalSearchQuery(example)}
                className="example-pill"
              >
                {example}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose LearnPath AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of online learning with our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="feature-card animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 10,000+ users</span>
          </div>
          <blockquote className="text-lg italic text-muted-foreground mb-4">
            "LearnPath AI transformed how I learn online. Instead of jumping between random tutorials, 
            I now have clear, structured courses that actually teach me what I need to know."
          </blockquote>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-full"></div>
            <span className="text-sm font-medium">Sarah Chen, Data Analyst</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-success/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning Smarter?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their education with AI-powered courses.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white px-8 py-3 text-lg"
            onClick={() => (document.querySelector('.hero-search-input') as HTMLInputElement)?.focus()}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <PlayCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">LearnPath AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 LearnPath AI. Transforming online education with artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;