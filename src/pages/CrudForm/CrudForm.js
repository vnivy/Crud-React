import React, { Component } from "react";
import "../../App.css";
import { getAddDetails, getEditDetails, getDeleteDetails, getDetails } from "action/CrudForm"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"

export class CrudFormClass extends Component {
  
        state = {
            id: 0,
            fullName: "",
            email: "",
            age: "",
            number: "",
            nameError:"",
            emailError: "",
            ageError:"",
            numberError:"",
        };
    



    componentDidMount() {
        const{ getDetails }=this.props;
        getDetails()
    }


    validate =()=>{
        var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
        let nameError="";
        let emailError="";
        let ageError="";
        let numberError="";
        
        
        const {fullName, age,email, number } = this.state;
        if (!fullName) {
            nameError = "name cannot be blank";
          } 

        

          if(!email.match(reEmail)) {
            emailError = "Invalid email address";
            
          }
      
        if ( age > 100) {
            
            ageError = "Your age should be from 1 to 100";
          }

          if ( number.length!= 10) {
            
            numberError = "enter your 10 digit mobile number";
          }
          
          if (emailError || ageError || numberError || nameError) {
            this.setState({ emailError,ageError,numberError,nameError });
            return false;
          }

          return true;
          
          
        };
      
    

    submitData = (e) => {
        e.preventDefault();
        const{ getEditDetails,getAddDetails }=this.props;
        const isValid = this.validate();
        if (isValid) {
        const { id, fullName, age,email, number } = this.state;
       
        if (fullName && email && age && number && !id)
         {
            const newDetails = { 
                id: Math.floor(Math.random() * (900)),
                fullName: fullName,
                email: email,
                age: age,
                number: number
            };

            getAddDetails(newDetails)
        }
        
        if (fullName && email && age && number && id) {
            const updatedDetails = {
                id: id,
                fullName: fullName,
                email: email,
                age: age,
                number: number

            }; 
            
            
            getEditDetails(updatedDetails)

        } 
   

        this.clearData();
        
    }}

    editDetails = (data) => {
        this.setState({
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            age: data.age,
            number: data.number

        })
    }

    Delete = (id) => {
        this.clearData();
        const{ getDeleteDetails }=this.props;

        if (window.confirm("Are you sure?")) {
            getDeleteDetails(id)
            
        }
    }



    handleChange = (e) => {
        this.setState({

            [e.target.name]: e.target.value
        });
    }

    clearData = () => {
        this.setState({
            id: 0,
            fullName: "",
            email: "",
            age: "",
            number: "",
            nameError:"",
            emailError:"",
            ageError:"",
            numberError:""
        });
    }

    render() {
        const { list } = this.props;
        const { id, fullName, age, email, number,nameError,emailError,ageError,numberError } = this.state;

        return (
            <div>
                <div className="row">
                <div className="col-md-6">
              
              <div >
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Age</th>
                              <th>Number</th>
                          </tr>
                      </thead>
                      
                      <tbody>
                          {list && list.map((data, index) => {
                          return <tr key={(index)}>
                                  <td>{data && data.fullName}</td>
                                  <td>{data && data.email}</td>
                                  <td>{data && data.age}</td>
                                  <td>{data && data.number}</td>
                                  {data && data ? <td><button class="Edit-button" onClick={() => this.editDetails(data && data)}>EDIT</button>
                                      <button class="Delete-button" onClick={() => this.Delete(data && data.id)}>DELETE</button> </td> : ''}
                              </tr>
                          })}
                      </tbody>
                  </table>
              </div>
              </div>
                <div className="col-md-6">
                
                    <center>
                        <table>
                            <tr>
                                <td>
                                    <form>
                                        <div className="form-group">
                                        <label>Name :</label> 
                                        <input onChange={this.handleChange} class="text-box" name="fullName" value={fullName} type="text"/> <br />
                                        <div class="form-validationError">{nameError}</div>
                                        </div>

                                        <div className="form-group">
                                        <label>Email :</label>  
                                        <input onChange={this.handleChange} class="text-box" name="email" value={email} type="email" /><br />
                                        <div class="form-validationError">{emailError}</div>
                                        </div>
                                        
                                        <div className="form-group">
                                        <label>Age :</label> 
                                        <input onChange={this.handleChange} class="text-box" name="age" value={age} type="number"/><br />
                                        <div class="form-validationError"> {ageError}</div>
                                        </div>

                                        <div className="form-group">
                                        <label>Mobile Number :</label>
                                        <input onChange={this.handleChange} class="text-box" name="number" value={number} type="number"/><br />
                                        <div class="form-validationError">{numberError}</div>
                                        </div>

                                        <button onClick={this.submitData} class="submit-button">{id ? 'UPDATE' : 'SUBMIT'}</button>
                                     </form>


                                </td>
                            </tr>
                        </table>
                    </center>
                </div>
              
                
            </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    list: state.CrudForm.listData
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getAddDetails,
        getEditDetails,
        getDeleteDetails,
        getDetails
    }, dispatch)
}
    

export const CrudForm = connect(mapStateToProps, mapDispatchToProps)(CrudFormClass)