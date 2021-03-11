import { Dispatch, FC, SetStateAction } from "react";

interface SearchFieldProps {
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
}

const SearchField: FC<SearchFieldProps> = (props) => {
    const handleChange = (event) => props.setSearchInput(event.target.value);
    const handleSubmit = (event) => event.preventDefault();

    return (
        <form
            className="text-center mt-2 w-4/5 md:w-1/2 mx-auto"
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="search-field"
                className="block text-gray-200 text-xl md:text-2xl mb-2"
            >
                🔍 Search for Jobs
            </label>
            <input
                type="text"
                id="search-field"
                className="w-full py-2 px-3 rounded text-lg"
                value={props.searchInput}
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchField;
