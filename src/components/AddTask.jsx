import { useState } from 'react';
import { addTask } from '../api/projects.api';

const AddTask = ({ projectId, refreshProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        projectId
      };

      await addTask(newTask);

      setTitle('');
      setDescription('');
      refreshProject(projectId);
    } catch (e) {
      console.log('An error ocurred whe adding a project', e);
    }
  };

  return (
    <div className='AddTask'>
      <h3>Add new Task</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Title:</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />

        <label htmlFor=''>Description:</label>
        <textarea
          onChange={handleDescription}
          name='description'
          value={description}
          cols='30'
          rows='10'
        ></textarea>

        <button type='submit'>Add New Task</button>
      </form>
    </div>
  );
};

export default AddTask;
