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
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyMotivation, setDailyMotivation] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const motivationalQuotes = [
    "Every day you choose wellness is a victory. Your commitment is inspiring!",
    "One day at a time. You're building an incredible future for yourself.",
    "Your strength in staying drug-free is a gift to yourself and those who love you.",
    "Recovery is a journey, not a destination. You're on the right path!",
    "Today's choices create tomorrow's reality. You're making great choices!",
    "You are stronger than any substance. Keep believing in yourself!",
    "Each sober day is a step towards the life you deserve. Keep going!"
  ];

  const quizQuestions = [
    {
      question: "What is the first step in preventing drug abuse?",
      options: ["Education and awareness", "Punishment", "Ignoring the issue", "Isolation"],
      correct: 0,
      explanation: "Education and awareness help people make informed decisions and recognize risks early."
    },
    {
      question: "Which of these is a healthy coping mechanism for stress?",
      options: ["Using substances to relax", "Exercise and meditation", "Avoiding all problems", "Staying isolated from others"],
      correct: 1,
      explanation: "Exercise and meditation are proven healthy ways to manage stress and improve mental health."
    },
    {
      question: "What should you do if a friend is struggling with substance abuse?",
      options: ["Ignore it to respect privacy", "Offer support and connect them to resources", "Judge them harshly", "Keep it completely secret"],
      correct: 1,
      explanation: "Offering support and professional resources can be life-saving for someone struggling."
    },
    {
      question: "How many days does it typically take to form a new healthy habit?",
      options: ["7 days", "21 days", "66 days", "100 days"],
      correct: 2,
      explanation: "Research shows it takes an average of 66 days for a new behavior to become automatic."
    },
    {
      question: "What is the most important factor in long-term recovery?",
      options: ["Willpower alone", "Support system and resources", "Avoiding all social situations", "Keeping recovery secret"],
      correct: 1,
      explanation: "A strong support system combined with professional resources creates the best environment for lasting recovery."
    }
  ];

  useEffect(() => {
    const currentUser = localStorage.getItem('mineclaw_current_user');
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(JSON.parse(currentUser));
    checkAndResetDaily();
    loadUserProgress();
    loadWeeklyData();
    setDailyQuote();
  }, [router]);

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const setDailyQuote = () => {
    const dayIndex = getDayOfYear() % motivationalQuotes.length;
    setDailyMotivation(motivationalQuotes[dayIndex]);
  };

  const checkAndResetDaily = () => {
    const lastResetDay = localStorage.getItem('mineclaw_last_reset_day');
    const currentDay = getDayOfYear();
    
    if (lastResetDay !== currentDay.toString()) {
      // Save yesterday's progress to weekly data before reset
      const currentProgress = localStorage.getItem('mineclaw_progress') || '0';
      saveToWeeklyData(parseInt(currentProgress));
      
      // Reset daily progress
      localStorage.setItem('mineclaw_progress', '0');
      localStorage.setItem('mineclaw_last_reset_day', currentDay.toString());
      localStorage.removeItem('mineclaw_daily_tasks');
      setProgress(0);
      initializeDailyTasks();
    }
  };

  const saveToWeeklyData = (progressValue) => {
    const weeklyKey = 'mineclaw_weekly_data';
    const weekly = JSON.parse(localStorage.getItem(weeklyKey) || '[]');
    
    const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    const newEntry = {
      day: today,
      progress: progressValue,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Keep only last 7 days
    const updatedWeekly = [...weekly, newEntry].slice(-7);
    localStorage.setItem(weeklyKey, JSON.stringify(updatedWeekly));
  };

  const loadWeeklyData = () => {
    const weekly = JSON.parse(localStorage.getItem('mineclaw_weekly_data') || '[]');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create array with all 7 days
    const chartData = days.map((day, index) => {
      const dayData = weekly.find(d => d.day === index);
      return {
        label: day,
        value: dayData ? dayData.progress : 0
      };
    });
    
    setWeeklyData(chartData);
  };

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
      { id: 1, title: "Read an educational article", icon: "📚", completed: false, points: 15 },
      { id: 2, title: "Practice mindfulness for 10 minutes", icon: "🧘", completed: false, points: 20 },
      { id: 3, title: "Share your progress with someone", icon: "💬", completed: false, points: 15 },
      { id: 4, title: "Complete daily knowledge quiz", icon: "🧠", completed: false, points: 30 },
      { id: 5, title: "Journal your thoughts and feelings", icon: "✍️", completed: false, points: 20 }
    ];
    setDailyTasks(tasks);
    localStorage.setItem('mineclaw_daily_tasks', JSON.stringify(tasks));
  };

  const toggleTask = (taskId) => {
    const updatedTasks = dailyTasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        const newProgress = newCompleted 
          ? Math.min(progress + task.points, 100)
          : Math.max(progress - task.points, 0);
        
        setProgress(newProgress);
        localStorage.setItem('mineclaw_progress', newProgress.toString());
        
        // Check if all tasks completed
        const allCompleted = updatedTasks.every(t => 
          t.id === taskId ? newCompleted : t.completed
        );
        
        if (allCompleted && newCompleted) {
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
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
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
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const totalTasks = dailyTasks.length;
  const totalPoints = dailyTasks.reduce((sum, t) => sum + t.points, 0);
  const earnedPoints = dailyTasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);

  if (!user) return null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Enhanced Header with Motivation */}
        <div className={styles.headerSection}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeContent}>
              <div>
                <h1>Welcome back, {user.name}! 👋</h1>
                <p className={styles.subtitle}>Let's make today count on your wellness journey</p>
              </div>
              <div className={styles.streakBadge}>
                <span className={styles.fire}>🔥</span>
                <div>
                  <p className={styles.streakNumber}>{streak}</p>
                  <p className={styles.streakLabel}>Day Streak</p>
                </div>
              </div>
            </div>
            <div className={styles.motivationQuote}>
              <span className={styles.quoteIcon}>💪</span>
              <p>{dailyMotivation}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <h3>{progress}%</h3>
              <p>Today's Progress</p>
              <div className={styles.miniProgress}>
                <div className={styles.miniProgressFill} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3>{completedTasks}/{totalTasks}</h3>
              <p>Tasks Completed</p>
              <span className={styles.statBadge}>{Math.round((completedTasks/totalTasks) * 100)}%</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🏆</div>
            <div className={styles.statContent}>
              <h3>{earnedPoints}</h3>
              <p>Points Today</p>
              <span className={styles.statBadge}>of {totalPoints}</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎯</div>
            <div className={styles.statContent}>
              <h3>{streak * 10}</h3>
              <p>Achievements</p>
              <span className={styles.statBadge}>Level {Math.floor(streak / 7) + 1}</span>
            </div>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Daily Tasks - Enhanced */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>📋 Daily Tasks</h2>
              <span className={styles.taskProgress}>{completedTasks} of {totalTasks}</span>
            </div>
            <div className={styles.tasksList}>
              {dailyTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={styles.taskIcon}>{task.icon}</div>
                  <div className={styles.taskContent}>
                    <h4>{task.title}</h4>
                    <span className={styles.taskPoints}>+{task.points} points</span>
                  </div>
                  <div className={styles.taskCheck}>
                    {task.completed ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Quiz Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>🧠 Daily Knowledge Quest</h2>
              {!showQuiz && !quizCompleted && (
                <span className={styles.quizBadge}>+30 Points</span>
              )}
            </div>
            {!showQuiz ? (
              <div className={styles.quizStart}>
                <p className={styles.quizDescription}>
                  Test your knowledge about drug prevention and healthy living!
                </p>
                <button 
                  className={styles.startQuizBtn}
                  onClick={() => setShowQuiz(true)}
                >
                  <span>🎮</span> Start Quiz Challenge
                </button>
              </div>
            ) : !quizCompleted ? (
              <div className={styles.quizContainer}>
                <div className={styles.quizHeader}>
                  <div className={styles.quizProgress}>
                    <div className={styles.quizProgressBar}>
                      <div 
                        className={styles.quizProgressFill}
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                    <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  </div>
                </div>
                <h3 className={styles.quizQuestion}>
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className={styles.quizOptions}>
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`${styles.quizOption} ${
                        showResult 
                          ? index === quizQuestions[currentQuestion].correct
                            ? styles.correctAnswer
                            : selectedAnswer === index
                            ? styles.wrongAnswer
                            : ''
                          : selectedAnswer === index
                          ? styles.selectedOption
                          : ''
                      }`}
                      onClick={() => !showResult && handleQuizAnswer(index)}
                      disabled={showResult}
                    >
                      <span className={styles.optionLetter}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && index === quizQuestions[currentQuestion].correct && (
                        <span className={styles.checkmark}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
                {showResult && (
                  <div className={styles.explanation}>
                    <p><strong>💡 Did you know?</strong></p>
                    <p>{quizQuestions[currentQuestion].explanation}</p>
                    <button className={styles.nextBtn} onClick={nextQuestion}>
                      {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.quizResult}>
                <div className={styles.resultIcon}>🎉</div>
                <h3>Quiz Completed!</h3>
                <p className={styles.resultMessage}>
                  Great job! You've earned knowledge points and moved closer to your daily goal.
                </p>
                <div className={styles.resultStats}>
                  <div className={styles.resultStat}>
                    <span className={styles.resultNumber}>+30</span>
                    <span className={styles.resultLabel}>Points Earned</span>
                  </div>
                  <div className={styles.resultStat}>
                    <span className={styles.resultNumber}>✓</span>
                    <span className={styles.resultLabel}>Task Complete</span>
                  </div>
                </div>
                <button className={styles.doneBtn} onClick={resetQuiz}>
                  Done for Today ✓
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Weekly Chart */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2>📈 Weekly Progress Overview</h2>
            <span className={styles.chartInfo}>Last 7 days performance</span>
          </div>
          <div className={styles.chartContainer}>
            {weeklyData.map((data, index) => {
              const today = new Date().getDay();
              const isToday = data.label === ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today];
              return (
                <div key={index} className={styles.chartBar}>
                  <div className={styles.chartBarContainer}>
                    <div 
                      className={`${styles.chartBarFill} ${isToday ? styles.todayBar : ''}`}
                      style={{ height: `${Math.max(data.value, 5)}%` }}
                    >
                      {data.value > 0 && (
                        <span className={styles.chartValue}>{data.value}%</span>
                      )}
                    </div>
                  </div>
                  <span className={`${styles.chartLabel} ${isToday ? styles.todayLabel : ''}`}>
                    {data.label}
                    {isToday && <span className={styles.todayDot}>●</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot}></span>
              <span>Current day</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendBar}></span>
              <span>Completion rate</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}