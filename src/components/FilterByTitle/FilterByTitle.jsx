export const FilterByTitle = ({ getTitle }) => {
    const handleChange = ({ target: {value}}) => {
        getTitle(value.trim());
        // console.log('getTitle', getTitle);
    };

    return (
        <div>
            <label>
                Find a task by its title
                <input
                    type="name"
                    name="filter"
                    placeholder="Plant onions"
                    onChange={handleChange}
                    required
                />
            </label>
        </div>
    );
};