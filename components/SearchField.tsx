import { Dispatch, FC, SetStateAction } from "react";

interface SearchFieldProps {
    placeholder: string;
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
    tooltip?: string;
}

const SearchField: FC<SearchFieldProps> = (props) => {
    const handleChange = (event) => props.setSearchInput(event.target.value);

    return (
        <div className="w-4/5 md:w-1/3 mx-auto mt-4">
            <input
                type="text"
                id="search-field"
                className="w-full py-2 px-3 rounded md:text-lg"
                value={props.searchInput}
                onChange={handleChange}
                placeholder={props.placeholder}
                title={props.tooltip || "Search Field"}
            />
        </div>
    );
};

export default SearchField;
