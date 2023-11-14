import { api } from '../../services/tasks-api';

export const TaskForm = () => {
    // const newTask = { title: 'Plant onions', description: 'red one', priority: 4, completed: false};

    return (
        <div className='formContainer'> 
            {/* <button onClick={() => api.addTask(newTask)}>add task</button> */}



            <h4>Add task</h4>
            <form /*onSubmit={handleFormSubmit}*/ autoComplete="off">
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
                <button type="submit">
                <div>
                    {/* <svg>
                        <use href={SvgSprite + '#icon-plus'} />
                    </svg> */}
                </div>
                    Create
                </button>
            </form>
        </div>
    );
};