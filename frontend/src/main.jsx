import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './styles.css';

const API = 'http://localhost:8080/api';

const starter = `public class Main {
    public static void main(String[] args) {
        String str = "hello";
        String result = "";

        // Write your solution here

        System.out.println(result);
    }
}`;

function App() {
    const [screen, setScreen] = useState('dashboard');

    const [problems, setProblems] = useState([]);
    const [problemsLoading, setProblemsLoading] = useState(true);
    const [problemsError, setProblemsError] = useState(null);

    const [selected, setSelected] = useState(null);
    const [code, setCode] = useState(starter);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attempt, setAttempt] = useState(1);

    const [student, setStudent] = useState({
        name: 'Demo Student'
    });

    const [progress, setProgress] = useState({
        solved: 18,
        attempted: 25,
        score: 78,
        weak: 'Arrays'
    });

    // Load problems from Spring Boot backend
    useEffect(() => {
        const loadProblems = async () => {
            try {
                setProblemsLoading(true);
                setProblemsError(null);

                const response = await axios.get(`${API}/problems`);

                setProblems(response.data);

                if (response.data.length > 0) {
                    setSelected(response.data[0]);
                }
            } catch (error) {
                console.error('Error loading problems:', error);
                setProblemsError(
                    'Unable to load problems from the backend.'
                );
            } finally {
                setProblemsLoading(false);
            }
        };

        loadProblems();
    }, []);

    const analyze = async () => {
        if (!selected) return;

        setLoading(true);
        setFeedback(null);

        try {
            const r = await axios.post(`${API}/mentor/analyze`, {
                problemId: selected.problemId,
                language: 'JAVA',
                code,
                attemptNumber: attempt
            });

            setFeedback(r.data);
        } catch (e) {
            setFeedback({
                status: 'NEEDS_IMPROVEMENT',
                concept: selected.concept,
                severity: 'MEDIUM',
                hint: 'Check the loop boundary and make sure every character index is valid.',
                explanation:
                    'The submitted solution needs another look. Review the valid index range and try again.',
                score: 6,
                nextAction: 'TRY_AGAIN',
                demo: true
            });
        } finally {
            setLoading(false);
        }
    };

    const nextHint = async () => {
        if (!feedback || !selected) return;

        try {
            const r = await axios.post(`${API}/mentor/hint`, {
                problemId: selected.problemId,
                language: 'JAVA',
                code,
                attemptNumber: attempt
            });

            setFeedback({
                ...feedback,
                hint:
                    r.data.hint ||
                    r.data.hintText ||
                    feedback.hint
            });
        } catch (e) {
            setFeedback({
                ...feedback,
                hint:
                    'Think about the first and last valid positions. What happens at the boundary?'
            });
        }
    };

    const selectProblem = (problem) => {
        setSelected(problem);
        setCode(starter);
        setFeedback(null);
        setAttempt(1);
        setScreen('mentor');
    };

    return (
        <div className="app">
            <header className="topbar">
                <div className="brand">
                    <div className="logo">N</div>

                    <div>
                        <b>NESTEDIFF</b>
                        <span>CodeMentor AI</span>
                    </div>
                </div>

                <nav>
                    <button
                        onClick={() => setScreen('dashboard')}
                        className={
                            screen === 'dashboard'
                                ? 'active'
                                : ''
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => setScreen('problems')}
                        className={
                            screen === 'problems'
                                ? 'active'
                                : ''
                        }
                    >
                        Problems
                    </button>

                    <button
                        onClick={() => setScreen('mentor')}
                        className={
                            screen === 'mentor'
                                ? 'active'
                                : ''
                        }
                    >
                        Code Mentor
                    </button>
                </nav>

                <div className="user">
                    {student.name} <span>●</span>
                </div>
            </header>

            {screen === 'dashboard' && (
                <main className="page">
                    <section className="hero">
                        <div>
                            <p className="eyebrow">
                                PERSONALIZED LEARNING
                            </p>

                            <h1>
                                Welcome back,{' '}
                                {student.name.split(' ')[0]} 👋
                            </h1>

                            <p>
                                Learn to code. Don't just copy code.
                            </p>

                            <button
                                className="primary"
                                onClick={() =>
                                    setScreen('problems')
                                }
                            >
                                Practice Now →
                            </button>
                        </div>

                        <div className="hero-card">
                            <div className="orb">AI</div>

                            <div>
                                <b>Your AI Mentor</b>
                                <p>
                                    Guiding you one hint at a time.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="stats">
                        <div>
                            <small>PROBLEMS ATTEMPTED</small>
                            <strong>{progress.attempted}</strong>
                        </div>

                        <div>
                            <small>PROBLEMS SOLVED</small>
                            <strong>{progress.solved}</strong>
                        </div>

                        <div>
                            <small>AVERAGE SCORE</small>
                            <strong>{progress.score}%</strong>
                        </div>
                    </section>

                    <section className="grid2">
                        <div className="panel">
                            <div className="panel-title">
                                <h2>Concept Progress</h2>
                                <span>View details</span>
                            </div>

                            {[
                                'Loops',
                                'Strings',
                                'Arrays',
                                'OOP'
                            ].map((x, i) => (
                                <div
                                    className="progress"
                                    key={x}
                                >
                                    <div>
                                        <span>{x}</span>
                                        <b>
                                            {[90, 85, 42, 58][i]}%
                                        </b>
                                    </div>

                                    <div className="bar">
                                        <i
                                            style={{
                                                width:
                                                    [
                                                        90,
                                                        85,
                                                        42,
                                                        58
                                                    ][i] + '%'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="panel recommendation">
                            <p className="eyebrow">
                                AI RECOMMENDATION
                            </p>

                            <h2>Practice Arrays</h2>

                            <p>
                                You've had difficulty with arrays
                                in recent attempts. Let's strengthen
                                this concept.
                            </p>

                            <button
                                className="secondary"
                                onClick={() => {
                                    const arrayProblem =
                                        problems.find(
                                            (p) =>
                                                p.concept ===
                                                'Arrays'
                                        );

                                    if (arrayProblem) {
                                        selectProblem(
                                            arrayProblem
                                        );
                                    } else if (
                                        problems.length > 0
                                    ) {
                                        selectProblem(
                                            problems[0]
                                        );
                                    }
                                }}
                            >
                                Practice Now
                            </button>
                        </div>
                    </section>
                </main>
            )}

            {screen === 'problems' && (
                <main className="page">
                    <div className="page-head">
                        <div>
                            <p className="eyebrow">
                                CHALLENGE LIBRARY
                            </p>

                            <h1>Choose a Problem</h1>
                        </div>

                        <span className="pill">
                            Java • {problems.length} challenges
                        </span>
                    </div>

                    {problemsLoading && (
                        <div className="empty-ai">
                            <h3>Loading problems...</h3>
                            <p>
                                Fetching problems from the
                                CodeMentor AI backend.
                            </p>
                        </div>
                    )}

                    {problemsError && (
                        <div className="empty-ai">
                            <h3>Unable to load problems</h3>
                            <p>{problemsError}</p>
                            <p>
                                Make sure the Spring Boot backend
                                is running on port 8080.
                            </p>
                        </div>
                    )}

                    {!problemsLoading &&
                        !problemsError &&
                        problems.length > 0 && (
                            <div className="problem-grid">
                                {problems.map((p) => (
                                    <div
                                        className="problem-card"
                                        key={p.problemId}
                                        onClick={() =>
                                            selectProblem(p)
                                        }
                                    >
                                        <div className="card-top">
                                            <span
                                                className={
                                                    'difficulty ' +
                                                    p.difficulty.toLowerCase()
                                                }
                                            >
                                                {p.difficulty}
                                            </span>

                                            <span>
                                                {p.concept}
                                            </span>
                                        </div>

                                        <h2>{p.title}</h2>

                                        <p>
                                            {p.description}
                                        </p>

                                        <button className="text-btn">
                                            Solve challenge →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    {!problemsLoading &&
                        !problemsError &&
                        problems.length === 0 && (
                            <div className="empty-ai">
                                <h3>No problems found</h3>
                                <p>
                                    Add problems to the
                                    tblproblems table in MySQL.
                                </p>
                            </div>
                        )}
                </main>
            )}

            {screen === 'mentor' && selected && (
                <main className="mentor-page">
                    <div className="mentor-head">
                        <div>
                            <p className="eyebrow">
                                CODING CHALLENGE
                            </p>

                            <h1>{selected.title}</h1>
                        </div>

                        <div className="chips">
                            <span>
                                {selected.difficulty}
                            </span>

                            <span>
                                {selected.concept}
                            </span>

                            <span>
                                Attempt {attempt}
                            </span>
                        </div>
                    </div>

                    <div className="workspace">
                        <aside className="problem-panel">
                            <h3>Problem</h3>

                            <p>
                                {selected.description}
                            </p>

                            <div className="tip">
                                <b>💡 Mentor tip</b>

                                <p>
                                    Try to solve it yourself first.
                                    I'll guide you if you get stuck.
                                </p>
                            </div>
                        </aside>

                        <section className="editor-panel">
                            <div className="editor-title">
                                <b>Java</b>

                                <button
                                    onClick={() => {
                                        setAttempt(
                                            (a) => a + 1
                                        );
                                        analyze();
                                    }}
                                >
                                    {loading
                                        ? 'Analyzing…'
                                        : 'Analyze Code'}
                                </button>
                            </div>

                            <Editor
                                height="calc(100vh - 255px)"
                                defaultLanguage="java"
                                theme="vs-dark"
                                value={code}
                                onChange={(v) =>
                                    setCode(v || '')
                                }
                                options={{
                                    fontSize: 14,
                                    minimap: {
                                        enabled: false
                                    },
                                    automaticLayout: true
                                }}
                            />
                        </section>

                        <aside className="ai-panel">
                            <div className="ai-title">
                                <div className="ai-avatar">
                                    ✦
                                </div>

                                <div>
                                    <b>AI Mentor</b>
                                    <small>
                                        Powered by Gemini
                                    </small>
                                </div>
                            </div>

                            {!feedback && !loading && (
                                <div className="empty-ai">
                                    <div>✦</div>

                                    <h3>
                                        Ready when you are
                                    </h3>

                                    <p>
                                        Submit your code and I'll
                                        analyze it without simply
                                        giving away the answer.
                                    </p>
                                </div>
                            )}

                            {loading && (
                                <div className="empty-ai">
                                    <div className="spin">
                                        ◌
                                    </div>

                                    <h3>
                                        Analyzing your code…
                                    </h3>

                                    <p>
                                        Gemini is reviewing your
                                        solution.
                                    </p>
                                </div>
                            )}

                            {feedback && !loading && (
                                <div className="feedback">
                                    <div className="status">
                                        {feedback.status ===
                                        'CORRECT'
                                            ? '✓'
                                            : '!'}{' '}
                                        <b>
                                            {feedback.status ===
                                            'CORRECT'
                                                ? 'Looking good!'
                                                : 'Something needs attention'}
                                        </b>
                                    </div>

                                    <div className="feedback-row">
                                        <span>
                                            Concept
                                        </span>

                                        <b>
                                            {
                                                feedback.concept
                                            }
                                        </b>
                                    </div>

                                    <div className="hint">
                                        <b>
                                            💡 Hint {attempt}
                                        </b>

                                        <p>
                                            {feedback.hint}
                                        </p>

                                        <button
                                            onClick={nextHint}
                                        >
                                            Give me another hint
                                        </button>
                                    </div>

                                    <div className="explain">
                                        <b>Explanation</b>

                                        <p>
                                            {
                                                feedback.explanation
                                            }
                                        </p>
                                    </div>

                                    {feedback.score != null && (
                                        <div className="score">
                                            Score{' '}
                                            <strong>
                                                {feedback.score}
                                                /10
                                            </strong>
                                        </div>
                                    )}
                                </div>
                            )}
                        </aside>
                    </div>
                </main>
            )}

            {screen === 'mentor' && !selected && (
                <main className="page">
                    <div className="empty-ai">
                        <h3>No problem selected</h3>

                        <p>
                            Go to Problems and select a coding
                            challenge.
                        </p>

                        <button
                            className="primary"
                            onClick={() =>
                                setScreen('problems')
                            }
                        >
                            View Problems
                        </button>
                    </div>
                </main>
            )}
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <App />
);