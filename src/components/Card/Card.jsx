import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import sprite from '../../images/sprite.svg';


export const Card = ({ title, description, priority, completed, _id, tasks, getTaskToUpdate, getTaskToDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(completed); 
    const [isOverflowVisible, setOverflowVisible] = useState(false); // overflow in description

    return (
        <div className={status ? "cardContainer cardContainer__completed" : "cardContainer cardContainer__incompleted"}>
            <h4 className={status ? "cardTitle cardTitle__completed" : "cardTitle"}>{title}</h4>
            <p 
                className={isOverflowVisible ? "cardDescriptionFull cardDescription" : "cardDescriptionShort cardDescription"} 
                onClick={() => setOverflowVisible(!isOverflowVisible)}
            >
                {description}
            </p>
            <div className="cardSeparator"></div>
            <p className="cardPriority">priority: <span className="cardPriorityNumber cardPriorityNumber__green">{priority}</span></p>
            <div className='cardIconsWrapper'>
                <div className='cardIconsWrapper-small'>
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
                                getTaskToUpdate={getTaskToUpdate}
                                getStatus={setStatus}
                            /> 
                        </Modal>
                    )}
                    <button
                        type="button"
                        className='cardBtnIcon'
                        aria-label="delete task"
                        onClick={() => getTaskToDelete(_id, title)}
                    >
                        <svg width="16" height="16">
                            <use href={sprite + '#icon-trash'} />
                        </svg>
                    </button>                    
                </div>
                <div>
                    <label className="cardCheckboxLabel">
                        <input 
                            type="checkbox" 
                            name="completed" 
                            checked={status} 
                            onChange={() => {
                                setStatus(!status)
                                getTaskToUpdate(_id, { completed: !status })                              
                            }}
                            className="checkbox" 
                        />
                        <svg aria-label="mark" className="checkbox-icon" width="16px" height="15px">
                            <use href={sprite + '#icon-checkbox'}></use>
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    );
};