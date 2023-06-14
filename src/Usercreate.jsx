import { useState } from "react";
import './styles/signup.css'
import { useNavigate } from "react-router";

export default function Usercreate(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleMake = (e) => {
        setMake(e.target.value);
    };
    const handleModel = (e) => {
        setModel(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    var data = {
        "name": name.charAt(0).toUpperCase() + make.slice(1),
        "email": email,
        "password": password,
        "make" : make.charAt(0).toUpperCase()+ make.slice(1),
        "model": model.charAt(0).toUpperCase() + model.slice(1)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            setError(true);
        } 
        else {
            fetch("http://localhost:8080/signup", {
            method: "POST", 
            mode: "cors",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            // Adding body or contents to send
            body: JSON.stringify(data)
            })
            // Converting to JSON
            .then((response)=>response.json()).then((json)=>{
                console.log(json.Status)
                if(json.Status === 'Success'){
                    setError('Successfully Registered');
                    navigate('/login')
                }
                else{
                    setError('Invalid details, missing or already exists')
                }
            })
            // Displaying results to console
        }
        }
    // Showing error message if error is true
    const errorMessage = () => {
            return (
                <div>
                    {error}
                </div>
            );
    };

    return(
    <div className='container-signup'>
        <div className="signup-card">
        <h1>Sign Up</h1>
        <p>Fill in the form to create an account.</p>
          <form>
            <input onChange={handleName} value={name} type='text' placeholder='Name'/><br></br>
            <input onChange={handleEmail} value={email} type='text' placeholder='Email'/><br></br>
            <input onChange={handlePassword} value={password} type='text' placeholder='Password'/><br></br>
            <input onChange={handleMake} value={make} type='text' placeholder='Make'/><br></br>
            <input onChange={handleModel} value={model} type='text' placeholder='Model'/><br></br>

            <button onClick={handleSubmit} type="submit">Submit</button><br></br>
            <a href="/login">Back to Log In</a>
          </form>
          <div className="messages">
                {errorMessage()}
          </div>
        </div>
    </div>
    )
    
}
