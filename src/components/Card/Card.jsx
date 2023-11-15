import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { api } from '../../services/tasks-api';
import sprite from '../../images/sprite.svg';


export const Card = ({ title, description, priority, completed, _id, tasks }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div style={{ border: '1px dashed blue', padding: '10px', width: '500px', backgroundColor: 'yellowgreen' }}>
            <h4>{title}</h4>
            <p>{description}</p>
            <p>priority: {priority}</p>
            <p>completed: {completed ? 'true' : 'false'}</p>
            <div className='CardIconsWrapper'>
                <button
                    type="button"
                    className='cardBtnIcon'
                    aria-label="edit task"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg width="16" height="16">
                        <use href={sprite + '#icon-pencil'} />
                    </svg>
                </button>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <TaskForm 
                            modalTitle={'Edit task'}
                            modalBtnTitle={'Edit'}
                            onClose={() => setIsModalOpen(false)} 
                            tasks={tasks}
                            currentTitle={title}
                            currentDescription={description}
                            currentPriority={priority}
                            currentCompleted={completed}
                            currentId={_id}
                        /> 
                    </Modal>
                )}
                <button
                    type="button"
                    className='cardBtnIcon'
                    aria-label="delete task"
                    onClick={() => api.deleteTask(_id, title)}
                >
                    <svg width="16" height="16">
                        <use href={sprite + '#icon-trash'} />
                    </svg>
                </button>
            </div>
        </div>
    );
};