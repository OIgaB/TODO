import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import sprite from '../../images/sprite.svg';


export const Card = ({ title, description, priority, completed, _id, tasks }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteTask = () => {
        console.log('To delete');   
    };

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
                            title={title}
                            description={description}
                            priority={priority}
                            completed={completed}
                            _id={_id}
                        /> 
                    </Modal>
                )}
                <button
                    type="button"
                    className='cardBtnIcon'
                    aria-label="delete task"
                    onClick={handleDeleteTask}
                >
                    <svg width="16" height="16">
                        <use href={sprite + '#icon-trash'} />
                    </svg>
                </button>
            </div>
        </div>
    );
};