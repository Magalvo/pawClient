import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject, updateProjects } from '../api/projects.api';

const EditProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log('An error ocurred fetching the project', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updatedProject = { title, description, _id: id };
      await updateProjects(updatedProject);
      navigate('/projects');
    } catch (e) {
      console.log('Error Updating the Project', e);
    }
    setTitle(e.target.value);
    setDescription(e.target.value);

    setTitle('');
    setDescription('');
  };

  return (
    <div className='EditProjectPage'>
      <h2>Edit Project</h2>
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

        <button type='submit'>Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
