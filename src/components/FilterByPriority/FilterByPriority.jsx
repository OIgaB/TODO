import sprite from '../../images/sprite.svg';


export const FilterByPriority = ({ tasks, getPriority }) => {

    const handleAscendingFilter = () => { // 1 - at the top (highest priority), 10 - at the bottom
        const ascendingTaskOrder = [...tasks].sort((a, b) => a.priority - b.priority);
        getPriority(ascendingTaskOrder);
    };

    const handleDescendingFilter = () => { // 10 - at the top (lowest priority), 1 - at the bottom
        const descendingTaskOrder = [...tasks].sort((a, b) => b.priority - a.priority);
        getPriority(descendingTaskOrder);
    };

    return (
        <div className='priorityFilters-container'>
            <button
                type="button"
                className='cardBtnIcon'
                aria-label="filter by ascending" // up
                onClick={handleAscendingFilter}
            >
                <svg width="26" height="26" className='formBtnIcon'>
                    <use href={sprite + '#icon-ascending'} />
                </svg>
            </button>
            <button
                type="button"
                className='cardBtnIcon'
                aria-label="filter by descending" // down
                onClick={handleDescendingFilter}
            >
                <svg width="26" height="26" className='formBtnIcon'>
                    <use href={sprite + '#icon-descending'} />
                </svg>
            </button>
        </div>
    );
};