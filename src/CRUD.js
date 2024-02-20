import React, {useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import './style.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {student_url, api_url} from './configuration';


const CRUD = () => {

    const [show, setShow] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [selectedRows, setSelectedRows] = useState([]);

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    const handleClose = () => {
        setValidationErrors({
            name: '',
            email: '',
            mobile: '',
        }
        )
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleCloseForm = () => {
        setValidationErrors({
            name: '',
            email: '',
            mobile: '',
        })
        setName('');
        setEmail('');
        setMob('');
        setAdd1('');
        setAdd2('');
        setState(0);
        setCity(0);
        setGender(2);
        setStatus(4);
        setIsActive(0);
        setShowForm(false);
    };
    const handleForm = () => setShowForm(true);

    const[code, setCode] = useState('');
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[mobile, setMob] = useState('');
    const[address1, setAdd1] = useState('');
    const[address2, setAdd2] = useState('');
    const[state, setState] = useState('');
    const[city, setCity] = useState('');
    const[gender, setGender] = useState('');
    const[status, setStatus] = useState(4);
    const[isActive, setIsActive] = useState(0);
    const[createdBy, setCby] = useState(0);
    const[createdOn, setCon] = useState('');
    const[modifiedBy, setMby] = useState(0);
    const[modifiedOn, setMon] = useState('');

    const[EditId, setEditId] = useState('');
    const[EditCode, setEditCode] = useState('');
    const[EditName, setEditName] = useState('');
    const[EditEmail, setEditEmail] = useState('');
    const[EditMob, setEditMob] = useState('');
    const[EditAdd1, setEditAdd1] = useState('');
    const[EditAdd2, setEditAdd2] = useState('');
    const[EditState, setEditState] = useState('');
    const[EditCity, setEditCity] = useState('');
    const[EditGender, setEditGender] = useState(0);
    const[EditStatus, setEditStatus] = useState(0);
    const[EditIsActive, setEditIsActive] = useState(0);
    const[EditCby, setEditCby] = useState(0);
    const[EditCon, setEditCon] = useState('');
    const[EditMby, setEditMby] = useState(0);
    const[EditMon, setEditMon] = useState('');

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [stateName, setStateName] = useState('');
    const [cityName, setCityName] = useState('');

    useEffect(() =>{
        getStates();
        getData (); 
    }, []);


    const getStates = async () => {
        try {
          const response = await axios.get(`${api_url}/State`);
          setStates(response.data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
    };

    const getCitiesByState = async (stateId) => {
        try {
          const response = await axios.get(`${api_url}/cities/${stateId}`);
          setCities(response.data);
        } catch (error) {
          console.error(`Error fetching cities for state ${stateId}:`, error);
        }
    };

    const getData = () =>{
        axios.get(student_url)
        .then((result)=>{
            setData(result.data)
            setCode(result.data[0]?.code); 
        })
        .catch((error)=>{
            console.log(error)
        })
    }

      
    const handleAddButtonClick = () => {
        handleForm();
    };

    const handleEdit = (id) =>{
        handleShow(); 
        axios.get(`${student_url}/${id}`)
        .then((result)=>{
            setEditCode(result.data.code);
            setEditName(result.data.name);
            setEditEmail(result.data.email);
            setEditMob(result.data.mobile);
            setEditAdd1(result.data.address1);
            setEditAdd2(result.data.address2);
            setEditState(result.data.state);
            setEditCity(result.data.city);
            setEditGender(result.data.gender);
            setEditStatus(result.data.status);
            setEditIsActive(result.data.isActive);
            setEditCby(result.data.createdBy);
            setEditCon(result.data.createdOn);
            setEditMby(result.data.modifiedBy);
            setEditMon(result.data.modifiedOn);
            setEditId(id);
        })
        .catch((error)=>{
            console.error('Error editing student:', error);
            toast.error(error);
        })
    }

    const handleCheckboxChange = (id) => {
        const updatedSelectedRows = [...selectedRows];
        if (updatedSelectedRows.includes(id)) {
          const index = updatedSelectedRows.indexOf(id);
          updatedSelectedRows.splice(index, 1);
        } else {
          updatedSelectedRows.push(id);
        }
        setSelectedRows(updatedSelectedRows);
    };

    const handleMultipleDelete = () => {
        if (selectedRows.length === 0) {
            alert('Please select rows to delete.');
        } else {
            if(window.confirm("Are you sure you want to delete this student?")==true){
            
                const url = `${student_url}/delete-multiple`;
            
                axios
                    .delete(url, { data: selectedRows })
                    .then((result) => {
                    toast.success('Selected students have been deleted');
                    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
                    setData(updatedData);
                    })
                    .catch((error) => {
                    console.error('Error deleting students:', error);
                    toast.error('Error deleting students');
                    });
            }
        }
    };

    const handleUpdate = () =>{
        const url = `${student_url}/${EditId}`
        const data = {
            "id": EditId,
            "code": EditCode,
            "name": EditName,
            "email": EditEmail,
            "mobile": EditMob,
            "address1": EditAdd1,
            "address2": EditAdd2,
            "state": EditState,
            "city": EditCity,
            "gender": EditGender,
            "status":  EditStatus,
            "isActive": EditIsActive,
            "createdBy": EditCby,
            "createdOn": EditCon,
            "modifiedBy": EditMby,
            "modifiedOn": EditMon,
        }
        axios.put(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success('Student has been updated');
        }).catch((error)=>{
            toast.error(error);
            alert('A record with the same email or mobile number already exists.');
        })
        setShow(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();      
        const currentDate = new Date().toISOString();
        const url = student_url;
        const data = {
            "code": code,
            "name": name,
            "email": email,
            "mobile": mobile,
            "address1": address1,
            "address2": address2,
            "state": state,
            "city": city,
            "gender": gender,
            "status":  status,
            "isActive": isActive,
            "createdBy": 1, 
            "createdOn": currentDate, 
            "modifiedBy": 1,  
            "modifiedOn": currentDate,
        } 
        axios.post(url, data)
        .then((result) => {
            const generatedCode = result.data.code;
            setCode(generatedCode);
            getData();
            clear();
            toast.success('Student has been added');
        }).catch((error)=>{
            toast.error(error);
            alert('A record with the same email or mobile number already exists.');
        })
        setShowForm(false);
    };

    const clear = () =>{
        setCode('');
        setName('');
        setEmail('');
        setMob('');
        setAdd1('');
        setAdd2('');
        setState(0);
        setCity(0);
        setGender(2);
        setStatus(4);
        setIsActive(0);
        setCby(0);
        setCon('');
        setMby(0);
        setMon('');
        setEditId(0);
        setEditCode('');
        setEditName('');
        setEditEmail('');
        setEditMob('');
        setEditAdd1('');
        setEditAdd2('')
        setEditState(0);
        setEditCity(0);
        setEditGender(0);
        setEditStatus(0);
        setEditIsActive(0);
        setEditCby(0);
        setEditCon('');
        setEditMby(0);
        setEditMon('');
    }

    const mapStatusValueToLabel = (value) => {
        switch (value) {
            case 0:
                return 'Single';
            case 1:
                return 'Married';
            case 2:
                return 'Separated';
            default:
                return '';
        }
    };

    const handleActiveChange = (e) =>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }

    const handleEditActiveChange = (e) =>{
        if(e.target.checked){
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0);
        }
    }

    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);
        validateName(inputValue);
    };

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        validateEmail(inputValue);
    };

    const handleMobileChange = (e) => {
        const inputValue = e.target.value;
        setMob(inputValue);
        validateMobile(inputValue);
    };

    const validateName = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            name: value.trim() !== '' ? (/^[a-zA-Z]+$/.test(value) ? '' : 'Name should contain only alphabets') : 'Name should not be empty',
        }));
    };

    const validateEmail = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address',
        }));
    };

    const validateMobile = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            mobile:/^\d{10}$/.test(value)
            ? ''
            : /^\d+$/.test(value)
              ? 'Mobile number should be of 10 digits'
              : 'Mobile number should only contain digits'
        }));
    };

    const validateEditName = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            editName: value.trim() !== '' ? (/^[a-zA-Z]+$/.test(value) ? '' : 'Name should contain only alphabets') : 'Name should not be empty',
        }));
    };
    
    const validateEditEmail = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            editEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address',
        }));
    };
    
    const validateEditMobile = (value) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            editMobile:/^\d{10}$/.test(value)
            ? ''
            : /^\d+$/.test(value)
              ? 'Mobile number should be of 10 digits'
              : 'Mobile number should only contain digits'
        }));
    };
    

  return (
      <Fragment>
        <ToastContainer />
        <div className='ad'>
            <Button className='btn btn-primary' id='ad-space' onClick={handleAddButtonClick}>
            Add
            </Button>
            <Button className="btn btn-danger" onClick={handleMultipleDelete}>
                Delete
            </Button>
        </div>

        <Modal show={showForm} onHide={handleCloseForm}  dialogClassName="custom-modal" >
            <Modal.Header closeButton>
                <Modal.Title>Add New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                {/* <Col>
                <input type='text' className='form-control' placeholder='Student code' value={code}
                readOnly />
                </Col> */}
                <Col>
                <input type='text' className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`} placeholder='Enter name' value={name} 
                 onChange={handleNameChange}/>
                {validationErrors.name && (
                    <div className='invalid-feedback'>{validationErrors.name}</div>
                )}
                </Col>
                <Col>
                <input type='text' className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} placeholder='Enter email' value={email}
                onChange={handleEmailChange} />
                {validationErrors.email && (
                    <div className='invalid-feedback'>{validationErrors.email}</div>
                )}
                </Col>
                <Col>
                <input type='text' className={`form-control ${validationErrors.mobile ? 'is-invalid' : ''}`} placeholder='Enter mobile no.' value={mobile}
                onChange={handleMobileChange} />
                {validationErrors.mobile && (
                    <div className='invalid-feedback'>{validationErrors.mobile}</div>
                )}
                </Col>
            </Row><Row >
                <Col>
                <input type='text' className='form-control' placeholder='Enter address 1' value={address1}
                onChange = {(e)=> setAdd1(e.target.value)} />
                </Col>
                <Col>
                <input type='text' className='form-control' placeholder='Enter address 2' value={address2}
                onChange = {(e)=> setAdd2(e.target.value)} />
                </Col>
                <Col>
                <select className="form-control" value={state} onChange={(e) => {
                    setState(e.target.value);
                    getCitiesByState(e.target.value);
                }}>
                    <option value="">--Select State--</option>
                    {states.map((state) => (
                    <option key={state.sId} value={state.sId}>
                        {state.name}
                    </option>
                    ))}
                </select>
                </Col>
                <Col>
                <select className="form-control" value={city} 
                onChange={(e) => setCity(e.target.value)}>
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                    <option key={city.cId} value={city.cId}>
                        {city.name}
                    </option>
                    ))}
                </select>
                </Col>
            </Row><Row>
                <Col className='rad'>
                <label>Gender:</label>
                <input type="radio" name="gender" value="0" checked={gender === 0} 
                onChange={(e) => {setGender(parseInt(e.target.value));}} /> Male &nbsp;
                <input type="radio" name="gender" value="1" checked={gender === 1} 
                onChange={(e) => {setGender(parseInt(e.target.value));}} /> Female
                </Col>
                <Col>
                <select
                    className='stat1'
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value={4}>Marital Status</option>
                    <option value={0}>Single</option>
                    <option value={1}>Married</option>
                    <option value={2}>Separated</option>
                </select>
                </Col>
                <Col>
                <input className='check' type="checkbox" checked={isActive === 1 ? true : false} onChange={(e)=> handleActiveChange(e)} value={isActive} />
                <label>Is Active</label>
                </Col>
                {/* <Col>
                <input type='number' className='form-control' placeholder='Created by' value={createdBy} 
                onChange={ (e) => setCby(e.target.value)}  />
                </Col>
            </Row><Row>
                <Col>
                <input type='datetime-local' className='form-control' placeholder='Created on' value={createdOn}
                onChange={ (e) => setCon(e.target.value)}/>
                </Col>
                <Col>
                <input type='number' className='form-control' placeholder='Modified by' value={modifiedBy} 
                onChange={ (e) => setMby(e.target.value)}/>
                </Col>
                <Col>
                <input type='datetime-local' className='form-control' placeholder='Modified on' value={modifiedOn} 
                onChange={ (e) => setMon(e.target.value)}/>
                </Col> */}
            </Row>
            </Modal.Body>
            <Modal.Footer>
                {/* <div className='error'>{validate}</div> */}
                <Button variant="secondary" className='close' onClick={handleCloseForm}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        <div className="table-container">
        <Table className='tab' striped bordered hover>
            <thead>
                <tr>
                <th>Select</th>
                <th>S.No.</th>
                <th>Student Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>State</th>
                <th>City</th>
                <th>Gender</th>
                <th>Marital Status</th>
                {/* <th>IsActive</th> */}
                <th>Created By</th>
                <th>Created On</th>
                <th>Modified By</th>
                <th>Modified On</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.length >0?
                        data.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                        <input
                                        type="checkbox"
                                        checked={selectedRows.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                    <td>{index+1}</td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.address1}</td>
                                    <td>{item.address2}</td>
                                    <td>{item.stateName}</td>
                                    <td>{item.cityName}</td>
                                    <td>{item.gender === 0 ? "Male" : "Female"}</td>
                                    <td>{mapStatusValueToLabel(item.status)}</td>
                                    {/* <td>{item.isActive}</td> */}
                                    <td>{item.createdBy}</td>
                                    <td>{item.createdOn}</td>
                                    <td>{item.modifiedBy}</td>
                                    <td>{item.modifiedOn}</td>
                                    <td colSpan={2}>
                                        <button className='btn btn-primary' onClick={() => {getCitiesByState(item.state); handleEdit(item.id);}}>Edit</button> &nbsp;
                                        {/* <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button> */}
                                    </td>
                                </tr>
                            )
                        })
                        :
                        'Loading..'
                }
            </tbody>
        </Table>
        </div>
        <Modal show={show} onHide={handleClose}  dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col>
                Student Code<input id='std-code' type='text' className='form-control' value={EditCode}
                readOnly />
                </Col>
                <Col>
                Name<input type='text' className={`form-control ${validationErrors.editName ? 'is-invalid' : ''}`} placeholder='Enter name' value={EditName}
                onChange={(e) => {
                    setEditName(e.target.value);
                    validateEditName(e.target.value);
                }}
                />
                {validationErrors.editName && (
                    <div className='invalid-feedback'>{validationErrors.editName}</div>
                )}
                </Col>
                <Col>
                Email<input type='text' className={`form-control ${validationErrors.editEmail ? 'is-invalid' : ''}`} placeholder='Enter email' value={EditEmail} 
                onChange={(e) => {
                    setEditEmail(e.target.value);
                    validateEditEmail(e.target.value);
                }} />
                {validationErrors.editEmail && (
                    <div className='invalid-feedback'>{validationErrors.editEmail}</div>
                )}
                </Col>
                <Col>
                Mobile No.<input type='text' className={`form-control ${validationErrors.editMobile ? 'is-invalid' : ''}`} placeholder='Enter mobile number' value={EditMob}
               onChange={(e) => {
                setEditMob(e.target.value);
                validateEditMobile(e.target.value);
                }} />
                {validationErrors.editMobile && (
                    <div className='invalid-feedback'>{validationErrors.editMobile}</div>
                )}
                </Col>
            </Row><Row>
                <Col>
                Address-1<input type='text' className='form-control' placeholder='Enter address 1' value={EditAdd1}
                onChange={ (e) => setEditAdd1(e.target.value)} />
                </Col>
                <Col>
                Address-2<input type='text' className='form-control' placeholder='Enter address 2' value={EditAdd2}
                onChange={ (e) => setEditAdd2(e.target.value)} />
                </Col>
                <Col>
                State<select className="form-control" value={EditState} onChange={(e) => {
                    setEditState(e.target.value);
                    getCitiesByState(e.target.value);   
                }}>
                    <option value="">--Select State--</option>
                    {states.map((state) => (
                    <option key={state.sId} value={state.sId}>
                        {state.name}
                    </option>
                    ))}
                </select>
                </Col>
                <Col>
                City<select className="form-control" value={EditCity} 
                onChange={(e) => setEditCity(e.target.value)}>
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                    <option key={city.cId} value={city.cId}>
                        {city.name}
                    </option>
                    ))}
                </select>
                </Col>
            </Row><Row>
                <Col>
                <label>Gender: </label>
                <input type="radio" name="gender" value="0" checked={EditGender === 0} 
                onChange={(e) => {setEditGender(parseInt(e.target.value));}} /> Male &nbsp;
                <input type="radio" name="gender" value="1" checked={EditGender === 1} 
                onChange={(e) => {setEditGender(parseInt(e.target.value));}} /> Female
                <label className='ms'>Marital Status :</label>
                <select
                    className='stat2'
                    id="status"
                    value={EditStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                >
                    <option value={4}>Marital Status</option>
                    <option value={0}>Single</option>
                    <option value={1}>Married</option>
                    <option value={2}>Separated</option>
                </select>
                </Col>
                {/* <Col>
                <input className='check' type='checkbox'  checked={isActive === 1 ? true : false}
                onChange={(e) => {handleEditActiveChange(e)}} value={EditIsActive}/>
                <label>Is Active</label>
                </Col> */}
                {/* <Col> */}
                {/* Created By<input type='number' className='form-control' placeholder='Created by' value={EditCby}
                onChange={ (e) => setEditCby(e.target.value)} readOnly/>
                </Col>
            </Row><Row>
                <Col>
                Created On<input type='datetime-local' className='form-control' placeholder='Created on' value={EditCon}
                onChange={ (e) => setEditCon(e.target.value)} readOnly/>
                </Col>
                <Col>
                Modified By<input type='number' className='form-control' placeholder='Modified by' value={EditMby}
                onChange={ (e) => setEditMby(e.target.value)} readOnly/>
                </Col>
                <Col>
                Modified On<input type='datetime-local' className='form-control' placeholder='Modified on' value={EditMon}
                onChange={ (e) => setEditMon(e.target.value)} readOnly/>
                </Col> */}
            </Row>
            </Modal.Body>
            <Modal.Footer>
            {/* <div className='error'>{validate}</div> */}
                <Button variant="secondary" className='close' onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </Fragment>
  )
}

export default CRUD;
