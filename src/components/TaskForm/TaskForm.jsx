import { api } from '../../services/tasks-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const TaskForm = ({ modalTitle, modalBtnTitle, onClose, tasks }) => {

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
                        // defaultValue={titleValue} // для редагування
                        // onChange={e => setTitleValue(e.target.value)} // для редагування
                    />
                </label>
                <label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        // defaultValue={descriptionValue} // для редагування
                        // onChange={e => setDescriptionValue(e.target.value)} // для редагування
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
                        defaultValue={10}
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
                {/* <label>
                    <input
                        type="range"
                        name="priority"
                        min="0" 
                        max="10"
                        // placeholder="Priority"
                        // defaultValue={titleValue} // для редагування
                        // onChange={e => setTitleValue(e.target.value)} // для редагування
                    />
                </label> */}
                <button type="submit">
                <div>
                    {/* <svg>
                        <use href={SvgSprite + '#icon-plus'} />
                    </svg> */}
                </div>
                    {modalBtnTitle}
                </button>
            </form>
        </div>
    );
};