import sprite from '../../images/sprite.svg';

export const FilterByStatus = ({ getStatus }) => {

    const handleFormSubmit = event => {
        event.preventDefault();

        const inputStatus = event.target.elements.status.value; // all / true / false
        getStatus(inputStatus);
    };

    return (
        <div>
            <form name='filter-form' onSubmit={handleFormSubmit} className="filter-radio-container">
                <div className="filter-radio-block">
                    <input type="radio" id="statusChoice1" name="status" value="all" />
                    <label htmlFor="statusChoice1" className="filter-radio">all</label>
                </div>
                <div className="filter-radio-block">
                    <input type="radio" id="statusChoice2" name="status" value="true" />
                    <label htmlFor="statusChoice2" className="filter-radio">completed</label>                    
                </div>
                <div className="filter-radio-block">
                    <input type="radio" id="statusChoice3" name="status" value="false" />
                    <label htmlFor="statusChoice3" className="filter-radio">incomplete</label>
                </div>
                
                <button type="submit" className='cardBtnIcon__blue' aria-label="filter tasks">
                    <svg width="23" height="23" className='cardBtnIcon__blue'>
                        <use href={sprite + '#icon-filter'} />
                    </svg>
                </button>  
            </form>
        </div>
    );
};