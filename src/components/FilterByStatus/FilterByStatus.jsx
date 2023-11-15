import sprite from '../../images/sprite.svg';

export const FilterByStatus = ({ getStatus }) => {

    const handleFormSubmit = event => {
        event.preventDefault();

        const inputStatus = event.target.elements.status.value; // all / true / false
        getStatus(inputStatus);

        event.target.reset();
    };

    return (
        <div style={{ border: '1px solid brown', marginLeft: '250px', padding: '10px', width: '300px', backgroundColor: 'orange' }}>
            <form name='filter-form' onSubmit={handleFormSubmit}>
                <p>Filter tasks by status</p>

                <input type="radio" id="statusChoice1" name="status" value="all" />
                <label htmlFor="statusChoice1">all</label>

                <input type="radio" id="statusChoice2" name="status" value="true" />
                <label htmlFor="statusChoice2">completed</label>

                <input type="radio" id="statusChoice3" name="status" value="false" />
                <label htmlFor="statusChoice3">incomplete</label>

                <button type="submit" aria-label='filter tasks'>
                    <svg width="16" height="16" className='formBtnIcon'>
                        <use href={sprite + '#icon-filter'} />  
                    </svg> 
                    Filter
                </button>
            </form>
        </div>
    );
};