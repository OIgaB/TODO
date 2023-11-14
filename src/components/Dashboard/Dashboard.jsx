import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';

export const Dashboard = ({ tasks }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add task</button>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tasks?.length > 0 &&
                    tasks.map(({ title, description, priority, completed, _id }) => (
                        <li key={_id}>
                            <div style={{ border: '1px dashed blue', padding: '10px', width: '500px', backgroundColor: 'yellowgreen' }}>
                            <h4>{title}</h4>
                            <p>{description}</p>
                            <p>priority: {priority}</p>
                            <p>completed: {completed ? 'true' : 'false'}</p>
                            </div>
                        </li>          
                    ))
                }
            </ul>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TaskForm />               
                </Modal>
            )}
        </div>
    );
};