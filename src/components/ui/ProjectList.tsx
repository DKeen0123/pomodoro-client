import React from 'react';
import Axios from 'axios';
import { API_HOST } from '../../constants/api';
import UserContext from '../../contexts/UserContext';
import Project from './Project';
import ErrorNotice from './ErrorNotice';
interface Props {
  setCurrentProject: (projectName: string) => void;
}

const ProjectList: React.FC<Props> = ({ setCurrentProject }) => {
  const { userData } = React.useContext(UserContext);

  const [projects, setProjects] = React.useState([]);
  const [createProjectInputValue, setCreateProjectInputValue] = React.useState(
    ''
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  const handleUpdateProjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProjectInputValue(e.target.value);
  };

  const handleCreateProject = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    setIsLoading(true);
    try {
      await Axios.delete(`${API_HOST}/projects/${projectId}`, {
        headers: { 'x-auth-token': userData.token },
      });

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
  }, [userData, isLoading]);

  React.useEffect(() => {
    setCurrentProject(projects[0]);
  }, [projects, setCurrentProject]);

  console.log(projects);
  return (
    <div>
      <h1>Projects</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(null)} />
      )}
      {isLoading ? (
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
                return (
                  <Project
                    key={project._id}
                    project={project}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                  />
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;
