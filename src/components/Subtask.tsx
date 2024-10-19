import { useRef } from "react";
import { CheckIcon, DeleteIcon, UncheckIcon } from "./Icons";

export type SubtaskData = {
    id: number;
    name: string;
    marked: boolean;
};

export interface SubtaskProps {
    subtask: SubtaskData;
    onSetName: (name: string) => void;
    onDelete: () => void;
    onMark: () => void;
}

// For the most part similar to Task.
export default function Subtask({
    subtask: { id, name, marked },
    onSetName,
    onDelete,
    onMark,
}: SubtaskProps) {
    const input = useRef<HTMLInputElement>(null);
    return (
        <div className="subtask">
            <div className="task-left-subcontainer">
                <button className="done-button" onClick={(e) => {
                    if (marked) {
                        e.currentTarget.classList.remove("delete-button")
                    } else {
                        e.currentTarget.classList.add("delete-button")
                    }
                    onMark();
                }}>
                    {!marked ? <CheckIcon /> : <UncheckIcon />}
                </button>

                <input
                    name={`${id}`}
                    type="text"
                    value={name}
                    ref={input}
                    spellCheck={false}
                    onChange={() => {
                        if (input.current !== null)
                            onSetName(input.current.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && input.current !== null) {
                            input.current.blur();
                        }
                    }}
                />
            </div>

            <div className="task-right-subcontainer">
                <button className="delete-button" onClick={() => onDelete()}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}
