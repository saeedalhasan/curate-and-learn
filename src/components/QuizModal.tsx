import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  videoTitle: string;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary purpose of PowerBI?',
    options: [
      'Creating websites',
      'Business intelligence and data visualization',
      'Managing databases',
      'Writing code'
    ],
    correctAnswer: 1,
    explanation: 'PowerBI is Microsoft\'s business intelligence platform designed for data visualization and analytics.'
  },
  {
    id: 'q2',
    question: 'Which file formats can PowerBI connect to?',
    options: [
      'Only Excel files',
      'Only databases',
      'Excel, CSV, databases, and many other sources',
      'Only cloud data'
    ],
    correctAnswer: 2,
    explanation: 'PowerBI can connect to a wide variety of data sources including Excel, CSV, databases, cloud services, and many more.'
  },
  {
    id: 'q3',
    question: 'What is Power Query used for in PowerBI?',
    options: [
      'Creating visualizations',
      'Data transformation and cleaning',
      'Publishing reports',
      'Managing user permissions'
    ],
    correctAnswer: 1,
    explanation: 'Power Query is the data transformation engine in PowerBI used for cleaning, shaping, and preparing data.'
  }
];

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onComplete, videoTitle }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const totalQuestions = sampleQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResults(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCompleteQuiz = () => {
    onComplete();
    handleReset();
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    sampleQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const selectedAnswer = selectedAnswers[currentQuestion?.id];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  if (quizCompleted) {
    const score = getScore();
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-muted-foreground mb-6">
              Great job on completing the quiz for "{videoTitle}"
            </p>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-success mb-2">{score}%</div>
              <p className="text-sm text-muted-foreground">
                You got {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} questions correct
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleCompleteQuiz}
                className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white"
              >
                Continue Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Review Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Quick Knowledge Check</span>
            <Badge variant="secondary">{currentQuestionIndex + 1} of {totalQuestions}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Testing your understanding of "{videoTitle}"
            </p>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResults && handleAnswerSelect(index)}
                  disabled={showResults}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    showResults
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-success/10 border-success text-success'
                        : index === selectedAnswer && !isCorrect
                        ? 'bg-destructive/10 border-destructive text-destructive'
                        : 'bg-muted/50 border-border'
                      : selectedAnswer === index
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResults && (
                      <div>
                        {index === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        )}
                        {index === selectedAnswer && !isCorrect && (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResults && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium mb-1 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Skip Quiz
            </Button>
            {showResults && (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Quiz'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;