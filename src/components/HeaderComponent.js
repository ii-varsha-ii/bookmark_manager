import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Jumbotron, Modal, Button, ModalHeader, ModalBody, Form, FormFeedback, FormGroup, Input, Label, Col} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../Authorisation';

class Header extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            touched: {
                firstname: false,
                lastname: false,
                email: false,
                password: false,
                confirmpassword: false
            },
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            isBookmarkModalOpen: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    validate(firstname, lastname, email, password, confirmpassword) {
        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        const emailreg = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ;
        if(this.state.touched.email && !emailreg.test(email))
            errors.email = 'Invalid Email';

        const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ ;
        if(this.state.touched.password && !passreg.test(password))
                errors.password = 'Password should have atleast one uppercase, lowercase and a digit';
        
        if(this.state.touched.confirmpassword && confirmpassword !== password)
                errors.confirmpassword = "Password doesnt match";
    
        return errors;
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleRegisterModal() {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen
        });
    }

    toggleBookmarkModal = () => {
        this.setState({
            isBookmarkModalOpen: !this.state.isBookmarkModalOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        
        console.log("Loggin In: Username: " + this.username.value);
        this.props.loginUser(this.username.value, this.password.value);
    
        event.preventDefault();
    }

    handleRegister(event) {
        if(this.state.confirmpassword === this.state.password && this.state.email && this.state.firstname)
        {
            this.toggleRegisterModal();
            console.log('Current State is: ' + JSON.stringify(this.state));
            this.props.registerUser(this.state.firstname, this.state.lastname, this.state.email, this.state.password);
        }
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }
    render() {
      const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email, this.state.password, this.state.confirmpassword);
      return (
        <>
            <Navbar dark expand="md">
                <div className="container">
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/organiser">
                                <span className="fa fa-home fa-lg"></span> Organiser
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleLoginModal}>
                                <span className="fa fa-lg"></span>Login
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button outline onClick={this.toggleRegisterModal}>
                                <span className="fa fa-lg"></span>Register
                            </Button>
                        </NavItem>
                        { 
                            (isLoggedIn()) ? 
                            <NavItem>
                                <NavLink className="nav-link" to="/organiser" onClick={this.handleLogout}>
                                    <span className="fa fa-home fa-lg"></span> Log Out
                                </NavLink> 
                            </NavItem> : null 
                        }
                    </Nav>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Bookmark Manager</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                <ModalHeader>
                    Login
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" innerRef={(input) =>this.username = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" innerRef={(input) =>this.password = input}/>
                        </FormGroup>
                        <Button type="submit" value="submit" color="bg-primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                <ModalHeader>
                    Register
                </ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleRegister}>
                    <FormGroup row>
                        <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Input type="text" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="lastname" md={2}>Last Name</Label>
                        <Col md={10}>
                            <Input type="text" id="lastname" name="lastname"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                valid={errors.lastname === ''}
                                invalid={errors.lastname !== ''}
                                onBlur={this.handleBlur('lastname')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.lastname}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="email" md={2}>Email</Label>
                        <Col md={10}>
                            <Input type="email" id="email" name="email"
                                placeholder="Email"
                                value={this.state.email}
                                valid={errors.email === ''}
                                invalid={errors.email !== ''}
                                onBlur={this.handleBlur('email')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.email}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Input type="password" id="password" name="password"
                                placeholder="Password"
                                value={this.state.password}
                                valid={errors.password === ''}
                                invalid={errors.password !== ''}
                                onBlur={this.handleBlur('password')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.password}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="confirmpassword" md={2}>Confirm Password</Label>
                        <Col md={10}>
                            <Input type="password" id="confirmpassword" name="confirmpassword"
                                placeholder="Confirm Password"
                                value={this.state.confirmpassword}
                                valid={errors.confirmpassword === ''}
                                invalid={errors.confirmpassword !== ''}
                                onBlur={this.handleBlur('confirmpassword')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.confirmpassword}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>
      );
    }
  }
  
  export default Header;