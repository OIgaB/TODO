import { useState } from 'react';
import { api } from '../../services/tasks-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import sprite from '../../images/sprite.svg';


export const TaskForm = ({ 
    modalTitle, 
    modalBtnTitle, 
    onClose, 
    tasks, 
    currentTitle, 
    currentDescription, 
    currentPriority, 
    currentCompleted, 
    current_id
}) => {
    const [titleValue, setTitleValue] = useState(currentTitle); // to edit
    const [descriptionValue, setDescriptionValue] = useState(currentDescription); // to edit
    const [selectedPriority, setSelectedPriority] = useState(currentPriority ? currentPriority : 10);  

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
        console.log('newTask', newTask);
    
        api.addTask(newTask);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
    
        const inputTitle = event.target.elements.title.value.trim();
        const inputDescription = event.target.elements.description.value.trim();
        const inputPriority = event.target.elements.priority.value;
      
        checkTitleClone(inputTitle, inputDescription, inputPriority); 
    
        event.target.reset();
    
        if (event.currentTarget === event.target) {
          onClose();
          document.body.style.overflow = 'visible'; 
        }
    };

    return (
        <div className='formContainer'> 
            <h4>{modalTitle}</h4>
            <form onSubmit={handleFormSubmit} autoComplete="off">
                <label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
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
                        defaultValue={descriptionValue} // to edit
                        onChange={e => setDescriptionValue(e.target.value)} // to edit
                    />
                </label>
                <div>
                    <label htmlFor="priority">Priority</label><br />
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

                <button type="submit" aria-label={`${modalBtnTitle} task`}>
                    <svg width="16" height="16" className='formBtnIcon'>
                        {modalBtnTitle === 'Create' ? 
                            <use href={sprite + '#icon-plus'} />  
                        :
                            <use href={sprite + '#icon-pencil'} />                                    
                        }
                    </svg> 
                    {modalBtnTitle}
                </button>
            </form>
        </div>
    );
};