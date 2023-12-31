import { useState, useEffect } from 'react';
import { FilterByTitle } from './components/FilterByTitle/FilterByTitle';
import { FilterByStatus } from './components/FilterByStatus/FilterByStatus';
import { FilterByPriority } from './components/FilterByPriority/FilterByPriority';
import { Card } from './components/Card/Card';
import { Modal } from './components/Modal/Modal';
import { TaskForm } from './components/TaskForm/TaskForm';
import { api } from './services/tasks-api';
import sprite from '../src/images/sprite.svg';


function App() { 
    const [tasks, setTasks] = useState([]); 
    const [completedTasks, setCompletedTasks] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredByTitle, setFilteredByTitle] = useState('');
    const [filteredByStatus, setFilteredByStatus] = useState('');
    const [filter, setFilter] = useState(tasks);

    useEffect(() => {
        (async () => { // IIFE
            try {
                const data = await api.getAlltasks();  
                setTasks(data); 
            } catch(error) {
                console.error(error.message); 
            }
        })();
    }, []);

    const handleTaskToAdd = async (newTask) => {
        try {
            const data = await api.addTask(newTask); 
            setTasks(prevState => [...prevState, data]);
        } catch(error) {
            console.error(error.message); 
        }
    };

    const handleTaskToUpdate = async (currentId, editedTask) => {
        const isSingleKeyObject = Object.keys(editedTask).length === 1 && 'completed' in editedTask;
         
        if(isSingleKeyObject) { // for patch
            api.editTaskStatus(currentId, editedTask);
            const updatedTasks = tasks.map(task => {
                if (task._id === currentId) {
                    return {
                    ...task, 
                    completed: editedTask.completed
                    };
                }
                return task;
            })
            setTasks(updatedTasks); 
        } else { // for put
            try {
                const data = await api.editTask(currentId, editedTask);
                const index = tasks.findIndex(task => task._id === currentId);
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1, data)
                setTasks(updatedTasks);
            } catch(error) {
                console.error(error.message); 
            }
        }
    };

    const handleTaskToDelete = (_id, title) => {
        api.deleteTask(_id, title);
        setTasks(prevState => prevState.filter(task => task._id !== _id));
    };
   
    useEffect(() => { // statistics
        const completedTasks = tasks.filter(({ completed }) => completed === true); 
        const completedTasksPercentage = Math.round((completedTasks.length * 100) / tasks.length);
        setCompletedTasks(completedTasksPercentage);
    }, [tasks, completedTasks])

    useEffect(() => {  // filter by title
        const data = tasks.filter(({ title }) => title.toLowerCase().includes(filteredByTitle.toLowerCase())); 
        setFilter(data);
    }, [tasks, filteredByTitle]);

    useEffect(() => {  // filter by status
        if(filteredByStatus !== 'all' && filteredByStatus !== '') {
            const data = tasks.filter(({ completed }) => completed === JSON.parse(filteredByStatus)); 
            setFilter(data);
        } else if(filteredByStatus === 'all') {
            setFilter(tasks);
        }
        return;
    }, [tasks, filteredByStatus]);   

    return (
        <div className='main-container'>
            <div className='top-cover'></div>
            <div className='top-container'>
                <div className='top-menu'>
                    <div className='top-general-data'>
                       <h1 className='app-title'>Task organizer</h1> 
                        <div className='app-statistics'>
                            <p className="cardPriority">Number of tasks: <span className="cardPriorityNumber cardPriorityNumber__blue">{tasks.length}</span></p>
                            {completedTasks !== undefined && !isNaN(completedTasks) && (
                                <p className="cardPriority">Completed: <span className="cardPriorityNumber cardPriorityNumber__blue">{completedTasks}%</span></p>
                            )}                              
                        </div>                         
                    </div>
                    <div className='top-filters'>
                        <FilterByStatus getStatus={setFilteredByStatus} />                              
                        <FilterByPriority tasks={tasks} getPriority={setFilter} />
                    </div>
                    <div className='search-add'>
                        <FilterByTitle getTitle={setFilteredByTitle} /> 
                        <div className='add-btn'> 
                        <p>Add task</p>
                        <button
                            type="button"
                            className='cardBtnIcon'
                            aria-label="add task"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <svg width="35" height="35">
                                <use href={sprite + '#icon-add'} />
                            </svg>
                        </button>                        
                        </div>
                    </div>
                </div>
            </div>
            <ul className='task-list'>
                {filter?.length > 0 &&
                    filter.map(({ title, description, priority, completed, _id }) => (
                        <li key={_id}>
                            <Card 
                                title={title} 
                                description={description} 
                                priority={priority} 
                                completed={completed} 
                                _id={_id} 
                                tasks={filter} 
                                getTaskToDelete={handleTaskToDelete}
                                getTaskToUpdate={handleTaskToUpdate}
                            />
                        </li>          
                    ))
                }
            </ul>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TaskForm 
                        modalTitle={'Add task'}
                        modalBtnTitle={'Create'}
                        tasks={filter}
                        getTaskToAdd={handleTaskToAdd}
                    />               
                </Modal>
            )}
        </div>
    );
};

export default App;