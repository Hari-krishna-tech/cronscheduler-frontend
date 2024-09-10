import React, { useEffect, useState } from 'react';
import { FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { Cron } from 'react-js-cron'
import 'react-js-cron/dist/styles.css'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



 const CreateJob = () => {
  const [formData, setFormData] = useState({
    jobName: "",
    sqlQuery: "",
    databaseUrl : "",
    databaseName: "",
    databaseUsername:"", 
    databasePassword: "",
    keyUserEmail:"",
    emailBody: "",
    emailSubject: "",
    cronFrequency: "",
    startDate: new Date(),
    endDate: new Date(),
  })

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cronFrequency, setCronFrequency] = useState('0 0 * * *');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:8080/api/jobs`, {...formData,
        startDate,
        endDate,
        cronFrequency
    }).then(res => {
        console.log(res.data);
     
       setFormData({
           jobName: "",
           sqlQuery: "",
           databaseUrl : "",
           databaseName: "",
           databaseUsername:"", 
           databasePassword: "",
           keyUserEmail:"",
           emailBody: "",
           emailSubject: "",
           cronFrequency: "* * * * *",
           startDate: new Date(),
           endDate: new Date(),
       })
       navigate("/");
    }).catch(error => {
        console.log(error);
        //alert("Failed to update job");

        // todo for future show modal about error from the backend

    });
  }




  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Job</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label className="block text-gray-700">Job Name</label>
            <input name='jobName' value={formData.jobName} type="text" className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700">SQL Query</label>
            <textarea value={formData.sqlQuery} name='sqlQuery' className="w-full p-2 border rounded" rows="4" onChange={handleChange}></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Database Server URL</label>
            <input value={formData.databaseUrl} name='databaseUrl' type="text" className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700">Database Name</label>
            <input value={formData.databaseName} name='databaseName' type="text" className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700">Database Username</label>
            <input value={formData.databaseUsername} name='databaseUsername' type="text" className="w-full p-2 border rounded" onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-gray-700">Database Password</label>
            <input value={formData.databasePassword} name='databasePassword' type="password" className="w-full p-2 border rounded" onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-gray-700">Key User Email</label>
            <input value={formData.keyUserEmail} name='keyUserEmail' type="email" className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700">Email Subject</label>
            <input value={formData.emailSubject} name='emailSubject' type="text" className="w-full p-2 border rounded" onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-gray-700">Email Body</label>
            <textarea value={formData.emailBody} name='emailBody' className="w-full p-2 border rounded" rows="4" onChange={handleChange}></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Cron Frequency</label>
            <Cron value={cronFrequency} setValue={setCronFrequency} />
            <p className="mt-2 text-gray-600">Selected Frequency: {cronFrequency}</p>
          </div>
          <div>
            <label className="block text-gray-700">Start Date</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">End Date</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="w-full p-2 border rounded" />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              <FaSave />
              <span>Save Job</span>
            </button>
            <button type="button" className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={()=>nativate("/")}>
              <FaTrash />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
