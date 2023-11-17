import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import sprite from '../../images/sprite.svg';


export const TaskForm = ({ 
    modalTitle, 
    modalBtnTitle, 
    onClose, 
    tasks, 
    getTaskToAdd,
    getTaskToUpdate,
    currentTitle, 
    currentDescription, 
    currentPriority, 
    currentCompleted, 
    currentId,
    getStatus
}) => {
    const [titleValue, setTitleValue] = useState(currentTitle); // to edit
    const [descriptionValue, setDescriptionValue] = useState(currentDescription); // to edit
    const [selectedPriority, setSelectedPriority] = useState(currentPriority ? currentPriority : 10);
    const [status, setStatus] = useState(currentCompleted);  // to edit

    const checkTitleClone = (inputTitle, inputDescription, inputPriority) => {  
        const titleClone = tasks.find((task) => ( 
          task.title.toLowerCase() === inputTitle.toLowerCase()
        ));
        if(titleClone) {
          Notify.failure(`"${inputTitle}" is already in tasks`); 
          return;
        } 
        const newTask = {
          title: inputTitle,
          description: inputDescription !== '' ? inputDescription : ' ',
          priority: Number(inputPriority),
        };
        getTaskToAdd(newTask);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
    
        const inputTitle = event.target.elements.title.value.trim();
        const inputDescription = event.target.elements.description.value.trim();
        const inputPriority = event.target.elements.priority.value;
        
        if(currentId) { // to edit     
            const inputCompleted = event.target.elements.completed.value;
            const editedTask = {
                title: inputTitle,
                description: inputDescription === '' ? ' ' : inputDescription,
                priority: Number(inputPriority),
                completed: JSON.parse(inputCompleted),
            };
            getTaskToUpdate(currentId, editedTask);       
            getStatus(status);     
        } else { // to add
            checkTitleClone(inputTitle, inputDescription, inputPriority); 
        }

        event.target.reset();
    
        if (event.currentTarget === event.target) {
          onClose();
          document.body.style.overflow = 'visible'; 
        }
    };

    return (
        <div className='formContainer'> 
            <h4 className='form-title'>{modalTitle}</h4>
            <form name='add-task-form' onSubmit={handleFormSubmit} autoComplete="off">
                <label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className='form-search-input'
                        autoFocus
                        required
                        defaultValue={titleValue} // to edit
                        onChange={e => setTitleValue(e.target.value)} // to edit
                    />
                </label>
                <label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        className='form-search-input form-search-input__desc'
                        defaultValue={descriptionValue} // to edit
                        onChange={e => setDescriptionValue(e.target.value)} // to edit
                    />
                </label>
                <div>
                    <label htmlFor="priority" className='form-priority-label'>Priority</label><br />
                    <input 
                        type="range" 
                        id="priority" 
                        name="priority" 
                        min="1" 
                        max="10" 
                        list="values" 
                        defaultValue={selectedPriority}  // to edit
                        onChange={e => setSelectedPriority(e.target.value)}  // to edit
                        className='input-range' 
                    />
                    <datalist id="values">
                        <option value="1" label="1 - high"></option>
                        <option value="2" label="2"></option>
                        <option value="3" label="3"></option>
                        <option value="4" label="4"></option>
                        <option value="5" label="5 - medium"></option>
                        <option value="6" label="6"></option>
                        <option value="7" label="7"></option>
                        <option value="8" label="8"></option>
                        <option value="9" label="9"></option>
                        <option value="10" label="10 - low"></option>
                    </datalist>
                </div>
                {currentCompleted !== undefined && (  // to edit
                    <label className="label-checkbox">
                        Completed:
                        <input 
                            type="checkbox" 
                            name="completed" 
                            value={status} 
                            checked={status} 
                            onChange={() => setStatus(!status)}
                            className="checkbox" 
                        />
                        <svg aria-label="mark" className="checkbox-icon" width="16px" height="15px">
                            <use href={sprite + '#icon-checkbox'}></use>
                        </svg>
                    </label>
                )} 
                <button type="submit" aria-label={`${modalBtnTitle} task`} className="form-submitBtn">
                    <div className="form-iconWrapper">
                        <svg width="16" height="16" className='formBtnIcon'>
                            {modalBtnTitle === 'Create' ? 
                                <use href={sprite + '#icon-plus'} />  
                            :
                                <use href={sprite + '#icon-pencil'} />                                    
                            }
                        </svg>                         
                    </div>
                    {modalBtnTitle}
                </button>
            </form>
        </div>
    );
};