import "bootstrap/dist/css/bootstrap.min.css";
import React /* , { Component } */ from "react";
import axios from "axios";

//EREN CODE
/* class App extends Component {
	constructor() {
		super();
		this.state = {
			fullName: "",
			email: "",
			password: "",
			username: ""
		};
		this.changeFullName = this.changeFullName.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	changeFullName(event) {
		this.setState({
			fullName: event.target.value
		});
	}
	changeUsername(event) {
		this.setState({
			username: event.target.value
		});
	}
	changeEmail(event) {
		this.setState({
			email: event.target.value
		});
	}
	changePassword(event) {
		this.setState({
			password: event.target.value
		});
	}
	onSubmit(event) {
		event.preventDefault();

		const registered = {
			fullName: this.state.fullName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};

		console.log(registered);

		axios.post("http://localhost:4000/app/signup", registered).then(response => console.log(response.data));

		this.setState({
			fullName: "",
			email: "",
			password: "",
			username: ""
		});
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="form-div">
						<form onSubmit={this.onSubmit}>
							<input type="text" placeholder="Full Name" onChange={this.changeFullName} value={this.state.fullName} className="form-control form-group " />

							<input type="text" placeholder="Username" onChange={this.changeUsername} value={this.state.username} className="form-control form-group " />

							<input type="text" placeholder="Email" onChange={this.changeEmail} value={this.state.email} className="form-control form-group " />
							<input type="password" className="form-control form-group" value={this.state.password} onChange={this.changePassword} placeholder="password" />

							<input type="submit" className="btn btn-danger btn-block" value="Submit" />
						</form>
					</div>
				</div>
			</div>
		);
	}
} 
export default App;
*/

import { BrowserRouter as Router, Routes, Route, Link, useMatch, useParams } from "react-router-dom";

export default function App() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/add">Add User</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
				</ul>

				<Routes>
					<Route path="/add" element={<AddUser />} />
					<Route path="/users" element={<ListOfUsers />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

function Home() {
	return <h2>Home</h2>;
}

function AddUser() {
	const [user, setUser] = React.useState({
		fullName: "",
		username: "",
		email: "",
		password: ""
	});

	const [users, setUsers] = React.useState([]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		const newUser = {
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			password: user.password
		};
		axios.post("http://localhost:4000/app/signup", newUser).then(response => console.log(response.data));
		setUser({
			fullName: "",
			username: "",
			email: "",
			password: ""
		});
	};

	return (
		<div>
			<div className="container">
				<div className="form-div">
					<form onSubmit={handleFormSubmit}>
						<input type="text" placeholder="Full Name" onChange={handleInputChange} value={user.fullName} className="form-control form-group " name="fullName" />

						<input type="text" placeholder="Username" onChange={handleInputChange} value={user.username} className="form-control form-group " name="username" />

						<input type="text" placeholder="Email" onChange={handleInputChange} value={user.email} className="form-control form-group " name="email" />

						<input type="password" className="form-control form-group" value={user.password} onChange={handleInputChange} placeholder="password" name="password" />

						<input type="submit" className="btn btn-danger btn-block" value="Submit" />
					</form>
				</div>
			</div>
		</div>
	);
}

//create list of users component with constructor and render method

class ListOfUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	//get users from the database
	componentDidMount() {
		axios.get("http://localhost:4000/app/getAll").then(response => {
			this.setState({ users: response.data });
		});
	}

	updateUser(event) {
		event.preventDefault();
		const payload = {
			fullName: this.state.fullName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};
		axios.put(`http://localhost:4000/app/update/${this.state._id}`, payload).then(response => console.log(response.data));
	}

	updateUsername(event, id) {
		//find the user in the state
		const user = this.state.users.find(user => user._id === id);

		//update the username
		user.username = event.target.value;
		this.setState({ users: this.state.users });
	}

	updateEmail(event, id) {
		//find the user in the state
		const user = this.state.users.find(user => user._id === id);

		//update the email
		user.email = event.target.value;
		this.setState({ users: this.state.users });
	}

	updateFullName(event, id) {
		//find the user in the state
		const user = this.state.users.find(user => user._id === id);

		//update the fullName
		user.fullName = event.target.value;
		this.setState({ users: this.state.users });
	}

	renderRows = () => {
		return this.state.users.map(user => {
			return (
				<tr key={user._id}>
					<td>
						<input type="text" defaultValue={user.fullName} onChange={event => this.updateFullName(event, user._id)} />
					</td>
					<td>
						<input type="text" defaultValue={user.username} onChange={event => this.updateUsername(event, user._id)} />
					</td>
					<td>
						<input type="text" defaultValue={user.email} onChange={event => this.updateEmail(event, user._id)} />
					</td>
					<td>
						<input type="password" defaultValue="*****" />
					</td>
					<td>
						<button className="btn btn-danger" onClick={() => this.handleDelete(user._id)}>
							Delete
						</button>
					</td>
					<td>
						<button className="btn btn-primary" onClick={() => this.handleUpdate(user._id)}>
							Update
						</button>
					</td>
				</tr>
			);
		});
	};

	handleDelete = id => {
		axios.delete(`http://localhost:4000/app/delete/${id}`).then(response => console.log(response.data));
		//remove the deleted user from the state
		this.setState({ users: this.state.users.filter(user => user._id !== id) });
	};

	handleUpdate = id => {
		//find the user in the state
		const user = this.state.users.find(user => user._id === id);

		//update the user
		const payload = {
			id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email
		};
		axios.put(`http://localhost:4000/app/update/${payload.id}`, payload).then(response => console.log(response.data));
	};

	render() {
		return (
			<div>
				<table className="table table-striped" style={{ marginTop: 20 }}>
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Password</th>
							<th colSpan="2">Action</th>
						</tr>
					</thead>
					<tbody>{this.renderRows()}</tbody>
				</table>
			</div>
		);
	}
}
