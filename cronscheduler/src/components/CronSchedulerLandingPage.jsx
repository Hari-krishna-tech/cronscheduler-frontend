import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// const jobs = [
//   { id: 1, name: 'Job 1', startDate: '2024-09-01', endDate: '2024-09-10', status: 'Active' },
//   { id: 2, name: 'Job 2', startDate: '2024-09-05', endDate: '2024-09-15', status: 'Inactive' },
//   { id: 3, name: 'Job 3', startDate: '2024-09-10', endDate: '2024-09-20', status: 'Completed' },
//   { id: 4, name: 'Job 4', startDate: '2024-09-15', endDate: '2024-09-25', status: 'Active' },
//   { id: 5, name: 'Job 5', startDate: '2024-09-20', endDate: '2024-09-30', status: 'Completed' },
//   { id: 6, name: 'Job 6', startDate: '2024-09-25', endDate: '2024-10-05', status: 'Active' },
//   { id: 7, name: 'Job 7', startDate: '2024-10-06', endDate: '2024-11-05', status: 'Active'},
//   { id: 8, name: 'Job 8', startDate: '2024-11-06', endDate: '2024-12-05', status: 'Inactive' },
//   { id: 9, name: 'Job 9', startDate: '2024-12-01', endDate: '2025-01-05', status: 'Active' },
//   { id: 10, name: 'Job 10', startDate: '2024-12-01', endDate: '2025-01-05', status: 'Active' },
//   { id: 2, name: 'Job 2', startDate: '2024-09-05', endDate: '2024-09-15', status: 'Inactive' },
//   { id: 3, name: 'Job 3', startDate: '2024-09-10', endDate: '2024-09-20', status: 'Completed' },
//   { id: 4, name: 'Job 4', startDate: '2024-09-15', endDate: '2024-09-25', status: 'Active' },
//   { id: 5, name: 'Job 5', startDate: '2024-09-20', endDate: '2024-09-30', status: 'Completed' },
//   { id: 6, name: 'Job 6', startDate: '2024-09-25', endDate: '2024-10-05', status: 'Active' },
//   { id: 7, name: 'Job 7', startDate: '2024-10-06', endDate: '2024-11-05', status: 'Active'},
//   { id: 8, name: 'Job 8', startDate: '2024-11-06', endDate: '2024-12-05', status: 'Inactive' },
//   { id: 9, name: 'Job 9', startDate: '2024-12-01', endDate: '2025-01-05', status: 'Active' },
//   { id: 10, name: 'Job 10', startDate: '2024-12-01', endDate: '2025-01-05', status: 'Active' },

// ];

const CronSchedulerLandingPage = () => {
    const [jobs, setJobs] = useState([]);

    // showing row for confirming deletes
    const [showModal, setShowModal] = useState(false);
    const [rowToDelete, setRowtoDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setShowModal(true);
        setRowtoDelete(id);
    }
    
    const formattedDate = (isoString) => {
       return format(parseISO(isoString), 'PPpp');
    }
    
    
    const confirmDelete = () => {
        
        setJobs(jobs.filter(job => job.id !== rowToDelete));
        axios.delete(`http://localhost:8080/api/jobs/${rowToDelete}`).then(() => console.log("deleted job")).catch(() => console.log("failed to delete"));
        setShowModal(false);
        setRowtoDelete(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setRowtoDelete(null);
    }


    useEffect(() => {
        axios.get("http://localhost:8080/api/jobs").then(res=>setJobs(res.data)).catch((err) => {console.log(err)});
    }, []);
  return (
    <>
     <div className="min-h-screen bg-gray-100 p-6 flex  justify-items-start">
    <div className="container mx-auto">
     
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 text-left">Job Name</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Start Date</th>
              <th className="py-3 px-4 bg-gray-200 text-left">End Date</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Status</th>
              <th className="py-3 px-4 bg-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-200">{job.jobName}</td>
                <td className="py-3 px-4 border-b border-gray-200">{formattedDate(job.startDateTime)}</td>
                <td className="py-3 px-4 border-b border-gray-200">{formattedDate(job.endDateTime)}</td>
                <td className="py-3 px-4 border-b border-gray-200">{job.status}</td>
                <td className="py-3 px-4 border-b border-gray-200 flex space-x-2">
                    <Link to={`/update-job/${job.id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  </Link>
                  <button className="text-red-500 hover:text-red-700" onClick={()=>handleDeleteClick(job.id)} >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  {showModal && (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <h3 className='text-lg font-semibold mb-4'>Confirm Deletion</h3>
            <p className='mb-6 font-bold'>Are you sure? It will be removed Premanently!</p>
            <div className='flex justify-center'>
                <button 
                    className='bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600'
                    onClick={confirmDelete}
                >Yes, Delete</button>
                <button
                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400'
                    onClick={closeModal}
                >Cancel</button>
            </div>
        </div>
    </div>
  )}
  </>
  );
};

export default CronSchedulerLandingPage;
