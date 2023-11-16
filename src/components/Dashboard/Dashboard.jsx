import { useState, useMemo, useEffect } from 'react';
import { FilterByTitle } from '../FilterByTitle/FilterByTitle';
import { FilterByStatus } from '../FilterByStatus/FilterByStatus';
import { FilterByPriority } from '../FilterByPriority/FilterByPriority';
import { Card } from '../Card/Card';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';


export const Dashboard = ({ tasks }) => {
    const [completedTasks, setCompletedTasks] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredByTitle, setFilteredByTitle] = useState('');
    const [filteredByStatus, setFilteredByStatus] = useState('');
    const [reorderedByPriority, setReorderedByPriority] = useState('');


    useEffect(() => {
        const completedTasks = tasks.filter(({ completed }) => completed === true); 
        const completedTasksPercentage = (completedTasks.length * 100) / tasks.length;
        setCompletedTasks(completedTasksPercentage);
    }, [tasks, completedTasks])


    const getFilteredByTitle = useMemo(() => { 
        return tasks.filter(({ title }) => title.toLowerCase().includes(filteredByTitle.toLowerCase())); 
    }, [tasks, filteredByTitle]);

    const getFilteredByStatus = useMemo(() => { 
        if(filteredByStatus !== 'all' && filteredByStatus !== '') {
            return tasks.filter(({ completed }) => completed === JSON.parse(filteredByStatus)); 
        } else if(filteredByStatus === 'all') {
            return tasks;
        }
        return;
    }, [tasks, filteredByStatus]);   

    console.log('completedTasks', completedTasks);

    // const filteredTasks = getFilteredByStatus ? getFilteredByStatus : getFilteredByTitle;
    // console.log('filteredTasks', filteredTasks);

    // console.log('reorderedByPriority', reorderedByPriority);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add task</button>
            <FilterByTitle getTitle={setFilteredByTitle} />
            <FilterByStatus getStatus={setFilteredByStatus} />
            <FilterByPriority tasks={tasks} getPriority={setReorderedByPriority} />
            <p>Number of tasks: {tasks.length}</p>
            {completedTasks !== undefined && !isNaN(completedTasks) && (
                <p>Completed: {completedTasks}%</p>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tasks?.length > 0 &&
                    tasks.map(({ title, description, priority, completed, _id }) => (
                        <li key={_id}>
                            <Card 
                                title={title} 
                                description={description} 
                                priority={priority} 
                                completed={completed} 
                                _id={_id} 
                                tasks={tasks} 
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
                        tasks={tasks}
                    />               
                </Modal>
            )}
        </div>
    );
};