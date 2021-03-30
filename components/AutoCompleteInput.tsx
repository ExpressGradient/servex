import { FC, useEffect, useState } from "react";

interface AutoCompleteInputProps {
    data: string[];
    label: string;
    id: string;
    disabled: boolean;
    updateDataAction: (updateField: string) => void;
}

export default function AutoCompleteInput(
    props: AutoCompleteInputProps
): JSX.Element {
    const [textInput, setTextInput] = useState<string>("");
    const [copyData, setCopyData] = useState<Array<string>>(props.data);
    const [cursor, setCursor] = useState<number>(0);

    useEffect(() => {
        setCopyData(
            props.data.filter((field) => {
                if (textInput === "") return field;
                else if (field.includes(textInput.toLowerCase())) return field;
                else return null;
            })
        );
    }, [textInput]);

    const handleTextInput = (e) => setTextInput(e.target.value);
    const handleCursor = (e) => {
        if (e.keyCode === 40) {
            if (cursor === copyData.slice(0, 3).length - 1) {
                setCursor(0);
            } else {
                setCursor(cursor + 1);
            }
        } else if (e.keyCode === 38) {
            if (cursor === 0) {
                setCursor(copyData.slice(0, 3).length - 1);
            } else {
                setCursor(cursor - 1);
            }
        }
    };
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (copyData.slice(0, 3).length === 0) {
                props.updateDataAction(textInput);
            } else {
                props.updateDataAction(copyData.slice(0, 3)[cursor]);
            }
            setTextInput("");
        }
    };

    return (
        <div>
            <label htmlFor={props.id} className="form-label">
                {props.label}
            </label>
            <input
                type="text"
                id={props.id}
                value={textInput}
                onChange={handleTextInput}
                onKeyDown={handleCursor}
                className="form-input"
                onKeyPress={handleEnterPress}
                disabled={props.disabled}
                maxLength={30}
                required={true}
                placeholder="Enter the categories of your job might fall into"
            />
            {!props.disabled && (
                <div className="bg-white">
                    {copyData.slice(0, 3).map((field, index) => (
                        <p
                            key={field}
                            className={`py-1 cursor-pointer ${
                                cursor === index ? "bg-gray-800 text-white" : ""
                            }`}
                            onClick={(e) => {
                                setCursor(index);
                                props.updateDataAction(field);
                            }}
                        >
                            {field}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
