import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getProject } from '../api/projects.api';
import { Link } from 'react-router-dom';
import AddTask from '../components/AddTask';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProject = async id => {
    try {
      const response = await getProject(id);
      setProject(response.data);
    } catch (e) {
      console.log('Error Fetching Project', e);
    }
  };
  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (error) {
      console.log('error deleting your project', error);
    }
  };

  return (
    <div className='ProjectDetails'>
      {project && (
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      )}

      <AddTask fetch={fetchProject} projectId={id} />

      {project &&
        project.tasks.map(task => {
          return (
            <li className='TaskCard card' key={task._id}>
              <h3>{task.title}</h3>
              <h4>Description</h4>
              <p>{task.description}</p>
            </li>
          );
        })}
      <div>
        <Link to={`/projects/edit/${id}`}>
          <button>Edit Project</button>
        </Link>
      </div>
      <Link to={'/projects'}>Back</Link>
    </div>
  );
};

export default ProjectDetails;
