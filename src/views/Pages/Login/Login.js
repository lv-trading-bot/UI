import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormText } from 'reactstrap';
import { requestApi } from '../../../api/requestApi';
import { postLogin } from '../../../api/login';
import axios from 'axios';

class Login extends Component {
	state = {
		isTouchUsername: false,
		username: "",
		isTouchPassword: false,
		password: "",
		isSubmited: false,
		errorMessage: ""
	}

	onSubmit = () => {
		this.setState({isSubmited: true}, () => {
			if(this.state.username === "" || this.state.password === "") {
				return;
			} else {
				requestApi(postLogin(this.state.username, this.state.password))
				.then(res => {
					let token = res.token;
					localStorage.setItem('token', token);
					axios.defaults.headers.common['Authorization'] = token;
					let prevUrl = window.location.hash.split("prevUrl=")[1];
					window.location.hash = `/#/${prevUrl}`;
					setTimeout(() => {
						window.location.reload();
					}, 1000)
				})
				.catch(error => {
					if(error.response && error.response.data) {
						this.setState({errorMessage: error.response.data.error});
					}
				})
			}
		})
	}

	onChangeValue = (field, val) => {
		this.setState({
			[field]: val
		})
	}

	render() {
		let isErrorUsername = (this.state.isSubmited || this.state.isTouchUsername) && this.state.username === "";
		let isErrornPassword = (this.state.isSubmited || this.state.isTouchPassword) && this.state.password === "";

		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<Form>
											<h1>Login</h1>
											<p className="text-muted">Sign In to your account</p>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="text"
													placeholder="Username"
													autoComplete="username"
													onBlur={() => this.setState({ isTouchUsername: true })}
													invalid={isErrorUsername}
													onChange={(e) => this.onChangeValue('username', e.target.value)}
												/>
											</InputGroup>
											{isErrorUsername 
												&& <FormText color="danger" className="mb-3">Username is required</FormText>}
											<InputGroup className="mb-4">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-lock"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="password"
													placeholder="Password"
													autoComplete="current-password"
													onBlur={() => this.setState({ isTouchPassword: true })}
													invalid={isErrornPassword}
													onChange={(e) => this.onChangeValue('password', e.target.value)}
												/>
											</InputGroup>
											{isErrornPassword 
											&& <FormText color="danger" className="mb-3">Password is required</FormText>}
											{this.state.errorMessage 
											&& <FormText color="danger" className="mb-3">{this.state.errorMessage}</FormText>}
											<Row>
												<Col xs="6">
													<Button 
														color="primary" 
														className="px-4"
														onClick={this.onSubmit}
													>Login</Button>
												</Col>
												{/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
											</Row>
										</Form>
									</CardBody>
								</Card>
								{/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Login;
