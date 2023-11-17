export const FilterByTitle = ({ getTitle }) => {
    const handleChange = ({ target: {value}}) => {
        getTitle(value.trim());
    };

    return (
        <div>
            <input
                type="name"
                name="filter"
                placeholder="Search task..."
                onChange={handleChange}
                className="menu-search-input"
                required
            />
        </div>
    );
};