import React, { Component } from "react";
import {
	Row,
	Col,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	Collapse,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Dropdown
} from "reactstrap";
import { country_list } from "./countries";
import {
	DateRangePicker,
	SingleDatePicker,
	DayPickerRangeController
} from "react-dates";

class forms extends Component {
	constructor(props) {
		super(props);
		this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this); // bind this to for the doParentToggleFromChild method..
		this.handleChange = this.handleChange.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
		this.counter = 0;
		this.toggle = this.toggle.bind(this);
		this.addCountry = this.addCountry.bind(this);
		this.state = {
			dropdownOpen: false,
			country: "",
			value: "",
			Arr: [],
			items: []
		};
	}
	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	handleEditChange(e) {
		let value = e.target.value;
		let keys = e.target.dataset;
		let temp = this.state.items;
		temp[keys.key] = value;
		this.props.doEdit(temp);
	}
	handleChange(e) {
		let value = e.target.value;
		let keys = e.target.dataset;
		var temp = this.state.Arr;
		temp[keys.key] = value;
		this.props.doAdd(temp);
	}

	componentWillMount() {
		if (this.props.Edit) {
			this.setState({ items: this.props.Items });
		}
	}
	doParentToggleFromChild() {
		this.props.parentToggle(this.counter++);
	}
	addCountry(e) {
		var value = e.target.value;
		var thekey = e.target.dataset;

		this.setState({ value: value });
	}

	render() {
		var dropdown = country_list.map(result => {
			return <option value={result}>{result}</option>;
		});

		var items = this.props.Items;
		var objMap = new Map(Object.entries(items));

		if (this.props.Edit) {
			var form = Object.keys(items).map((item, i) => {
				if (item === "country_name") {
					return (
						<FormGroup>
							<InputGroup>
								<Input
									type="select"
									placeholder={item}
									data-key={item}
									defaultValue={items[item]}
									onChange={this.handleEditChange}
								>
									{dropdown}
								</Input>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="fa fa-user" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					);
				} else if (item === "id" || item === "country") {
				} else if (items[item] instanceof Date) {
					return (
						<SingleDatePicker
							date={items[item] || this.state.date}
							// momentPropTypes.momentObj or null
							onDateChange={date => this.setState({ date })}
							// PropTypes.func.isRequired
							focused={this.state.focused}
							// PropTypes.bool
							onFocusChange={({ focused }) => this.setState({ focused })}
						/>
					);
				} else {
					return (
						<FormGroup>
							<InputGroup>
								<Input
									type="text"
									placeholder={item}
									data-key={item}
									defaultValue={items[item]}
									onChange={this.handleEditChange}
								/>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="fa fa-user" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					);
				}
			});
		} else {
			var form = Object.keys(items).map((item, i) => {
				if (item === "country_name") {
					return (
						<FormGroup>
							<InputGroup>
								<Input
									type="select"
									placeholder={item}
									data-key={item}
									onChange={this.handleChange}
								>
									{dropdown}
								</Input>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="fa fa-user" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					);
				} else if (item === "id") {
				} else if (item === "country") {
				} else if (Number.isInteger(items[item])) {
					return (
						<FormGroup>
							<InputGroup>
								<Input
									type="number"
									placeholder={item}
									data-key={item}
									onChange={this.handleChange}
								/>

								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="fa fa-user" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					);
				} else if (items[item] instanceof Date) {
					return (
						<div>
							<SingleDatePicker
								date={this.state.date}
								// momentPropTypes.momentObj or null
								onDateChange={date => this.setState({ date })}
								// PropTypes.func.isRequired
								focused={this.state.focused}
								// PropTypes.bool
								onFocusChange={({ focused }) => this.setState({ focused })}
							/>
						</div>
					);
				} else {
					return (
						<FormGroup>
							<InputGroup>
								<Input
									type="text"
									placeholder={item}
									data-key={item}
									onChange={this.handleChange}
								/>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="fa fa-user" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					);
				}
			});
		}
		// var form = headers.map(result => {
		// 	if (result === "country") {
		// 		return (
		// 			<FormGroup>
		// 				<InputGroup>
		// 					<Input
		// 						type="select"
		// 						id="username2"
		// 						name={result}
		// 						placeholder={result}
		// 						data-key={result}
		// 						onChange={this.addCountry}
		// 					>
		// 						{dropdown}
		// 					</Input>
		// 					<InputGroupAddon addonType="append">
		// 						<InputGroupText>
		// 							<i className="fa fa-user" />
		// 						</InputGroupText>
		// 					</InputGroupAddon>
		// 				</InputGroup>
		// 			</FormGroup>
		// 		);
		// 	}
		// 	return (
		// 		<FormGroup>
		// 			<InputGroup>
		// 				<Input
		// 					type="text"
		// 					id="username2"
		// 					name="username2"
		// 					placeholder={result}
		// 					data-key={result}
		// 					onChange={this.addCountry}
		// 				/>
		// 				<InputGroupAddon addonType="append">
		// 					<InputGroupText>
		// 						<i className="fa fa-user" />
		// 					</InputGroupText>
		// 				</InputGroupAddon>
		// 			</InputGroup>
		// 		</FormGroup>
		// 	);
		// });

		return (
			<div>
				<Card>
					<CardHeader>Client {this.props.Edit ? "edit" : "add"} </CardHeader>
					<CardBody>
						<Form action="" method="post">
							{form}
						</Form>
					</CardBody>
				</Card>
			</div>
		);
	}
}
export default forms;
