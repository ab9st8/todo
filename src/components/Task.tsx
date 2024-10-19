import {
    Children,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import { useInterval } from "usehooks-ts";
import { DeleteIcon, CheckIcon, SubtaskIcon } from "./Icons";
import { SubtaskData } from "./Subtask";

export type TaskData = {
    id: number;
    name: string;
    subtasks: SubtaskData[]; // This or a bool `isSubtask` kinda deal?
};

interface TaskProps extends PropsWithChildren {
    // id: number;
    // name: string;
    task: TaskData;
    onSetName: (name: string) => void;
    onDelete: (marked: boolean) => void;
    onAddSubtask: () => void;
}

export default function Task({
    task: { id, name, subtasks },
    onSetName,
    onDelete,
    onAddSubtask,
    children,
}: TaskProps) {
    const input = useRef<HTMLInputElement>(null);
    const [deleting, setDeleting] = useState(false);
    const [marked, setMarked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    // empty dep list <=> on mount only
    useEffect(() => {
        if (input.current !== null) {
            input.current.disabled = false;
            input.current.focus();
        }
    }, []);

    useInterval(
        () => {
            if (timeLeft - 1 === 0) onDelete(marked);
            else setTimeLeft(timeLeft - 1);
        },
        deleting || marked /* lol */ ? 1000 : null
    );

    return (
        <div style={{ display: "inline" }}>
            <div
                className={`task ${
                    Children.count(children) > 0 ? "sharp-bottom" : null
                }`}
            >
                <div
                    className="task-left-subcontainer"
                >
                    {/* Mark as done */}
                    <button
                        className="done-button"
                        title="mark as done"
                        onClick={(e) => {
                            // pretty wordy but ig it works. in any case it's more like
                            // a subtle nice touch than actual functionality. same thing
                            // is there for the delete button
                            if (marked)
                                e.currentTarget.classList.remove("stop-button");
                            else e.currentTarget.classList.add("stop-button");

                            setTimeLeft(5);
                            setMarked(!marked);
                        }}
                        disabled={
                            deleting ||
                            (subtasks.length > 0 &&
                                (subtasks.some((subtask) => !subtask.marked) && !marked))
                        }
                    >
                        {marked ? timeLeft : <CheckIcon />}
                    </button>

                    {/* We give the `title` to this div to work around the `pointer-events: none` of `input:disabled`. */}
                    <div
                        title={name}
                        style={{ flex: 1, paddingRight: "0.5em" }}
                    >
                        {/* The way this works effectively makes updates
                        only if you actually type something while editing. */}
                        <input
                            name={`${id}`}
                            type="text"
                            ref={input}
                            disabled={deleting || marked}
                            spellCheck={false}
                            value={name}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input.current !== null)
                                    input.current.blur();
                            }}
                            onChange={() => {
                                if (input.current !== null)
                                    onSetName(input.current.value);
                            }}
                        />
                    </div>
                </div>

                <div
                    className="task-right-subcontainer"
                    style={{
                        flex: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: "10px",
                    }}
                >
                    {/* Add subtask */}
                    <button
                        className="subtask-button"
                        disabled={deleting || marked}
                        title={"add subtask"}
                        onClick={() => onAddSubtask()}
                    >
                        <SubtaskIcon />
                    </button>

                    {/* Edit task name */}
                    {/* <button
                        onClick={() => {
                            if (input.current !== null) {
                                input.current.disabled = false;
                                input.current.focus();
                            }
                        }}
                        disabled={deleting || marked}
                        className="edit-button"
                        title="edit task name"
                    >
                        <EditIcon big={true} />
                    </button> */}

                    {/* Delete (along with all subtasks) */}
                    <button
                        onClick={(e) => {
                            if (deleting)
                                e.currentTarget.classList.remove("stop-button");
                            else e.currentTarget.classList.add("stop-button");
                            setTimeLeft(5);
                            setDeleting(!deleting);
                        }}
                        disabled={marked}
                        className="delete-button"
                        title="delete task"
                    >
                        {deleting ? timeLeft : <DeleteIcon />}
                    </button>
                </div>
            </div>

            {/* Subtasks */}
            <div className="hide-if-empty subtask-container">{children}</div>
        </div>
    );
}
