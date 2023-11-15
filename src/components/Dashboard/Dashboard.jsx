import { useState, useMemo } from 'react';
import { FilterByTitle } from '../FilterByTitle/FilterByTitle';
import { Card } from '../Card/Card';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';


export const Dashboard = ({ tasks }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleInFilter, setTitleInFilter] = useState('');

    const getFilteredByTitle = useMemo(() => { 
        return tasks.filter(({ title }) => title.toLowerCase().includes(titleInFilter.toLowerCase())) 
    }, [tasks, titleInFilter]);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add task</button>
            <FilterByTitle getTitle={setTitleInFilter} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {getFilteredByTitle?.length > 0 &&
                    getFilteredByTitle.map(({ title, description, priority, completed, _id }) => (
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