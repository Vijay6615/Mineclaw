'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizQuestions = [
    {
      question: "What is the first step in preventing drug abuse?",
      options: ["Education and awareness", "Punishment", "Ignoring the issue", "Isolation"],
      correct: 0
    },
    {
      question: "Which of these is a healthy coping mechanism?",
      options: ["Using substances", "Exercise and meditation", "Avoiding problems", "Staying isolated"],
      correct: 1
    },
    {
      question: "What should you do if a friend is struggling with substance abuse?",
      options: ["Ignore it", "Offer support and resources", "Judge them", "Keep it secret"],
      correct: 1
    },
    {
      question: "How many days does it typically take to form a new habit?",
      options: ["7 days", "21 days", "66 days", "100 days"],
      correct: 2
    }
  ];

  useEffect(() => {
    const currentUser = localStorage.getItem('mineclaw_current_user');
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(JSON.parse(currentUser));
    loadUserProgress();
  }, [router]);

  const loadUserProgress = () => {
    const savedStreak = localStorage.getItem('mineclaw_streak') || '0';
    const savedProgress = localStorage.getItem('mineclaw_progress') || '0';
    const savedTasks = localStorage.getItem('mineclaw_daily_tasks');
    
    setStreak(parseInt(savedStreak));
    setProgress(parseInt(savedProgress));
    
    if (savedTasks) {
      setDailyTasks(JSON.parse(savedTasks));
    } else {
      initializeDailyTasks();
    }
  };

  const initializeDailyTasks = () => {
    const tasks = [
      { id: 1, title: "Read an educational article", completed: false, points: 10 },
      { id: 2, title: "Practice mindfulness for 5 minutes", completed: false, points: 15 },
      { id: 3, title: "Share your progress with a friend", completed: false, points: 20 },
      { id: 4, title: "Complete daily quiz", completed: false, points: 25 },
      { id: 5, title: "Journal your thoughts", completed: false, points: 10 }
    ];
    setDailyTasks(tasks);
    localStorage.setItem('mineclaw_daily_tasks', JSON.stringify(tasks));
  };

  const toggleTask = (taskId) => {
    const updatedTasks = dailyTasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        // Update progress
        const newProgress = newCompleted 
          ? Math.min(progress + task.points, 100)
          : Math.max(progress - task.points, 0);
        
        setProgress(newProgress);
        localStorage.setItem('mineclaw_progress', newProgress.toString());
        
        // Update streak if all tasks completed
        const allCompleted = updatedTasks.filter(t => t.id !== taskId ? t.completed : newCompleted).length === dailyTasks.length;
        if (allCompleted && !task.completed) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('mineclaw_streak', newStreak.toString());
        }
        
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    
    setDailyTasks(updatedTasks);
    localStorage.setItem('mineclaw_daily_tasks', JSON.stringify(updatedTasks));
  };

  const handleQuizAnswer = (answerIndex) => {
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      const quizTask = dailyTasks.find(t => t.id === 4);
      if (quizTask && !quizTask.completed) {
        toggleTask(4);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const totalTasks = dailyTasks.length;

  if (!user) return null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Welcome Header */}
        <div className={styles.header}>
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Keep up the great work on your journey to wellness</p>
          </div>
          <div className={styles.streakBadge}>
            <span className={styles.fire}>🔥</span>
            <div>
              <p className={styles.streakNumber}>{streak}</p>
              <p className={styles.streakLabel}>Day Streak</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div>
              <h3>{progress}%</h3>
              <p>Daily Progress</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div>
              <h3>{completedTasks}/{totalTasks}</h3>
              <p>Tasks Completed</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🏆</div>
            <div>
              <h3>{dailyTasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0)}</h3>
              <p>Points Earned</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎯</div>
            <div>
              <h3>{streak * 10}</h3>
              <p>Total Achievements</p>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* Progress Section */}
          <div className={styles.section}>
            <h2>Your Progress</h2>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${progress}%` }}
                >
                  <span className={styles.progressText}>{progress}%</span>
                </div>
              </div>
              <p className={styles.progressSubtext}>
                {progress === 100 ? '🎉 Amazing! You completed all tasks today!' : `${100 - progress}% to go for today's goal`}
              </p>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className={styles.section}>
            <h2>Daily Tasks</h2>
            <div className={styles.tasksList}>
              {dailyTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={styles.taskCheck}>
                    {task.completed ? '✓' : '○'}
                  </div>
                  <div className={styles.taskContent}>
                    <h4>{task.title}</h4>
                    <p>+{task.points} points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div className={styles.section}>
            <h2>Daily Knowledge Quiz 🧠</h2>
            {!showQuiz ? (
              <button 
                className={styles.startQuizBtn}
                onClick={() => setShowQuiz(true)}
              >
                Start Daily Quiz
              </button>
            ) : !quizCompleted ? (
              <div className={styles.quizContainer}>
                <div className={styles.quizProgress}>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
                <h3 className={styles.quizQuestion}>
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className={styles.quizOptions}>
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={styles.quizOption}
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.quizResult}>
                <h3>Quiz Completed! 🎉</h3>
                <p className={styles.scoreText}>
                  You scored {score} out of {quizQuestions.length}
                </p>
                <p className={styles.scoreMessage}>
                  {score === quizQuestions.length 
                    ? "Perfect score! You're a prevention champion!" 
                    : score >= quizQuestions.length / 2
                    ? "Great job! Keep learning and growing!"
                    : "Good effort! Review the articles to learn more."}
                </p>
                <button className={styles.retryBtn} onClick={resetQuiz}>
                  Try Again Tomorrow
                </button>
              </div>
            )}
          </div>

          {/* Weekly Chart */}
          <div className={styles.section}>
            <h2>Weekly Activity</h2>
            <div className={styles.chartContainer}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const height = Math.min((index + 1) * 15, 100);
                return (
                  <div key={day} className={styles.chartBar}>
                    <div 
                      className={styles.chartBarFill}
                      style={{ height: `${height}%` }}
                    >
                      <span className={styles.chartValue}>{height}%</span>
                    </div>
                    <span className={styles.chartLabel}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Section */}
          <div className={styles.motivationCard}>
            <h3>💪 Daily Motivation</h3>
            <p>
              "Every day you choose wellness is a victory. Your commitment to staying 
              drug-free is making a real difference in your life and inspiring others around you."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}