import React from 'react';
import Axios from 'axios';
import { API_HOST } from '../../constants/api';
import UserContext from '../../contexts/UserContext';

interface Props {
  setCurrentProject: (projectName: string) => void;
}

const ProjectList: React.FC<Props> = ({ setCurrentProject }) => {
  const { userData } = React.useContext(UserContext);

  const [projects, setProjects] = React.useState([]);
  const [createProjectInputValue, setCreateProjectInputValue] = React.useState(
    ''
  );
  const [creatingProject, setCreatingProject] = React.useState(false);

  const handleUpdateProjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProjectInputValue(e.target.value);
  };

  const handleCreateProject = async () => {
    setCreatingProject(true);
    try {
      await Axios.post(
        `${API_HOST}/projects`,
        {
          name: createProjectInputValue,
        },
        {
          headers: { 'x-auth-token': userData.token },
        }
      );

      setCreateProjectInputValue('');
      setCreatingProject(false);
    } catch (error) {
      setCreatingProject(false);
    }
  };

  React.useEffect(() => {
    const getProjects = async () => {
      if (!userData || !userData.token) return;
      const projectsRes = await Axios.get(`${API_HOST}/projects`, {
        headers: { 'x-auth-token': userData.token },
      });
      if (projectsRes.data.length > 0) {
        const formattedProjects = projectsRes.data.filter(
          (project: any) =>
            project.name !== 'unspecified' || project.complete === false
        );
        setProjects(formattedProjects);
      }
    };

    getProjects();
  }, [userData, creatingProject]);

  React.useEffect(() => {
    setCurrentProject(projects[0]);
  }, [projects, setCurrentProject]);

  console.log(projects);
  return (
    <div>
      <h1>Projects</h1>
      {creatingProject ? (
        <div>Loading...</div>
      ) : (
        <>
          <form onSubmit={handleCreateProject}>
            <label htmlFor="create-project">Create a new project:</label>
            <input
              onChange={handleUpdateProjectInput}
              type="text"
              id="create-project"
              name="create-project"
              value={createProjectInputValue}
            />
            <input type="submit" value="Create new project" />
          </form>
          {projects.length > 0 && (
            <ul>
              {projects.map((project: any) => {
                return <li key={project._id}>{project.name}</li>;
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;
