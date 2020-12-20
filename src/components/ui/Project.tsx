import React, { Dispatch, SetStateAction } from 'react';
import Axios from 'axios';
import { API_HOST } from '../../constants/api';
import UserContext from '../../contexts/UserContext';

interface Props {
  project: {
    name: string;
    complete: boolean;
    _id: string;
  };
  handleDelete: (id: string) => void;
  isLoading: boolean;
}
const Project: React.FC<Props> = ({ project, handleDelete, isLoading }) => {
  return (
    <div>
      <p>{project.name}</p>
      <button disabled={isLoading} onClick={() => handleDelete(project._id)}>
        delete
      </button>
      <button disabled={isLoading}>complete</button>
    </div>
  );
};

export default Project;
