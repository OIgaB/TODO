import { useState, useMemo, useEffect } from 'react';
import { FilterByTitle } from './components/FilterByTitle/FilterByTitle';
import { FilterByStatus } from './components/FilterByStatus/FilterByStatus';
import { FilterByPriority } from './components/FilterByPriority/FilterByPriority';
import { Card } from './components/Card/Card';
import { Modal } from './components/Modal/Modal';
import { TaskForm } from './components/TaskForm/TaskForm';
import { api } from './services/tasks-api';


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
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add task</button>
            <FilterByTitle getTitle={setFilteredByTitle} />
            <FilterByStatus getStatus={setFilteredByStatus} />
            <FilterByPriority tasks={tasks} getPriority={setFilter} />
            <p>Number of tasks: {tasks.length}</p>
            {completedTasks !== undefined && !isNaN(completedTasks) && (
                <p>Completed: {completedTasks}%</p>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        onClose={() => setIsModalOpen(false)} 
                        tasks={filter}
                        getTaskToAdd={handleTaskToAdd}
                    />               
                </Modal>
            )}
        </div>
    );
};

export default App;