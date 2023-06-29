import { useState } from 'react';
import { addProject, upload } from '../api/projects.api';
import { toast } from 'react-toastify';

const AddProject = ({ refreshList }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const newProject = { title, description };
      console.log(image);
      if (image) {
        //create new FormData
        //same as encoding type 'multipart/form-data'
        const uploadData = new FormData();
        //add image to form data
        uploadData.append('file', image);
        const response = await upload(uploadData);
        newProject.imgUrl = response.data.fileUrl;
      }

      await addProject(newProject);
      toast.success('Project added successfully!');
      refreshList();
    } catch (error) {
      toast.error('Something Went wrong, try again later');
      console.log(error);
    }

    setTitle('');
    setDescription('');
    setImage();
  };

  const handleImage = event => {
    setImage(event.target.files[0]);
  };

  return (
    <div className='AddProject'>
      <h2>Add Project</h2>

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

        <label htmlFor=''>Image</label>
        <input type='file' onChange={handleImage} />

        <button type='submit'>Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
