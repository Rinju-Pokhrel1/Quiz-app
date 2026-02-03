import React, { useState, useEffect } from "react";
import "../index.css";

const Admin = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [form, setForm] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        ans: 1
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("No token found. Please login.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/quizzes", {
                headers: { "Authorization": "Bearer " + token },
            });
            if (!res.ok) throw new Error("Failed to fetch quizzes");
            const data = await res.json();
            setQuizzes(data);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `http://localhost:5000/quizzes/${editingId}` : "http://localhost:5000/quizzes";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to save quiz");
            setMessage(editingId ? "Quiz updated!" : "Quiz created!");
            setForm({ question: "", option1: "", option2: "", option3: "", option4: "", ans: 1 });
            setEditingId(null);
            fetchQuizzes();
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleEdit = (quiz) => {
        setForm(quiz);
        setEditingId(quiz._id);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/quizzes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token },
            });
            if (!res.ok) throw new Error("Failed to delete quiz");
            setMessage("Quiz deleted!");
            fetchQuizzes();
        } catch (err) {
            setMessage(err.message);
        }
    };

    const role = localStorage.getItem("role");
    if (role !== "admin") {
        return <div className="container"><h1>Access Denied. Admin only.</h1></div>;
    }

    return (
        <div className="admin">
            <header className="header">
                <div className="logo">
                    <h1>QuizMaster Admin</h1>
                </div>
                <nav className="navbar">
                    <a href="/">Home</a>
                    <a href="/quiz">Quiz</a>
                </nav>
            </header>

            <div className="container">
                <h1>Manage Quizzes</h1>
                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit} className="quiz-form">
                    <input
                        type="text"
                        placeholder="Question"
                        value={form.question}
                        onChange={(e) => setForm({ ...form, question: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Option 1"
                        value={form.option1}
                        onChange={(e) => setForm({ ...form, option1: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Option 2"
                        value={form.option2}
                        onChange={(e) => setForm({ ...form, option2: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Option 3"
                        value={form.option3}
                        onChange={(e) => setForm({ ...form, option3: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Option 4"
                        value={form.option4}
                        onChange={(e) => setForm({ ...form, option4: e.target.value })}
                        required
                    />
                    <select
                        value={form.ans}
                        onChange={(e) => setForm({ ...form, ans: parseInt(e.target.value) })}
                    >
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                        <option value={4}>Option 4</option>
                    </select>
                    <button type="submit">{editingId ? "Update" : "Create"} Quiz</button>
                </form>

                <div className="quizzes-list">
                    <h2>Existing Quizzes</h2>
                    {quizzes.map((quiz) => (
                        <div key={quiz._id} className="quiz-item">
                            <h3>{quiz.question}</h3>
                            <p>Correct: {quiz[`option${quiz.ans}`]}</p>
                            <button onClick={() => handleEdit(quiz)}>Edit</button>
                            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;