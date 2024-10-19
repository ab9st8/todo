import { useState } from "react";
import "./App.css";
import Task, { TaskData } from "./components/Task";
import Subtask from "./components/Subtask";

function App() {
    const [items, setItems] = useState<Array<TaskData>>([
        { id: 0, name: "Make a sandwich", subtasks: [] },
    ]);
    const [count, setCount] = useState(0); // used to generate unique keys for Tasks and Subtasks
    const [done, setDone] = useState<Array<string>>([]);

    return (
        <div id="container">
            <h1 style={{fontStyle: "italic"}}>To-do:</h1>

            {/* List of tasks done */}
            <div className="done-list tasklike">
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: "0"}}>
                    <span style={{fontStyle: "italic", fontSize: "0.8em"}}>Done:</span>
                    <button style={{fontSize: "0.8em"}} onClick={() => setDone([])}>clear</button>
                </div>
                {done.map(name => (
                    <div style={{maxWidth: "100%", display: "inline-block"}}>{name}</div>
                ))}
            </div>

            {/* "Add" button */}
            {/* Rationale for putting this at the top
            is we don't really want it to change position. In
            any case new tasks spawning automatically have
            their name inputs focused so there's no problem
            with laborious mouse travel. */}
            <button
                onClick={() => {
                    setItems([
                        ...items,
                        { id: count, name: "Do something", subtasks: [] },
                    ]);
                    setCount(count + 1);
                }}
                style={{ minHeight: "70px", width: "550px", maxWidth: "90vw" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            {/* Task list */}
            {items.map((task, taskIdx) => (
                <Task
                    // id={id}
                    key={task.id}
                    // name={name}
                    task={task}
                    onSetName={(name) => {
                        let newItems = [...items];
                        newItems[taskIdx].name = name;
                        setItems(newItems);
                    }}
                    onDelete={(marked) => {
                        if (marked) {
                            setDone([...done, task.name]);
                        }
                        setItems(items.filter((item) => item.id !== task.id));
                    }}
                    onAddSubtask={() => {
                        let newItems = [...items];
                        newItems[taskIdx].subtasks.push({ id: count, name: "Do another thing first", marked: false })
                        setItems(newItems);
                        setCount(count + 1);
                    }}
                >
                    {task.subtasks.map((subtask, subtaskIdx) => (
                        <Subtask
                            key={subtask.id}
                            subtask={subtask}
                            onSetName={(name) => {
                                let newItems = [...items];
                                items[taskIdx].subtasks[subtaskIdx].name = name;
                                setItems(newItems);
                            }}
                            onDelete={() => {
                                let newItems = [...items];
                                newItems[taskIdx].subtasks = newItems[taskIdx].subtasks.filter(({ id }) => subtask.id !== id)
                                setItems(newItems);
                            }}
                            onMark={() => {
                                let newItems = [...items];
                                items[taskIdx].subtasks[subtaskIdx].marked = !items[taskIdx].subtasks[subtaskIdx].marked;
                                setItems(newItems);
                            }}
                        />
                    ))}
                </Task>
            ))}
        </div>
    );
}

export default App;
