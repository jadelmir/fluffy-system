import React, { Component } from "React";
import { WithContext as ReactTags } from "react-tag-input";
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
	UncontrolledButtonDropdown
} from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "./style.css";
import {
	DateRangePicker,
	SingleDatePicker,
	DayPickerRangeController
} from "react-dates";
import { country_list, country_list_with_id } from "./countries";
class FilterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedInput: null,
			startDate: "",
			endDate: "",
			tempdata: [],
			dat: [],
			operator: [
				"less than",
				"less",
				"greater than ",
				"greater",
				"equal",
				"between"
			],
			tags: [],
			suggestions: []
		};
		this.onDatesChange = this.onDatesChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.dropdwonClicked = this.dropdwonClicked.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
	}
	handleEditChange(e) {
		console.log(e.target);
		var countryTag = e.target.value;

		this.handleAddition(countryTag);
	}
	dropdwonClicked(event) {
		var temp = [];

		var operant = false;
		let data = event.target.dataset;
		if (event.target.dataset.key === "between") {
			operant = false;
		} else {
			operant = true;
		}
		let forinputitem = event.target.dataset.item;
		let dat = this.state.dat;
		temp[forinputitem] = data.key;
		dat[forinputitem] = temp[forinputitem];
		this.setState({ dat: dat });
	}
	handleChange(event) {
		var temp = [];
		let data = event.target.value;
		let thekey = event.target.dataset;
		temp[thekey.key] = data;
		let tempdata = this.state.tempdata;
		tempdata[thekey.key] = temp[thekey.key];
		console.log("the temporary data are:", tempdata);
		this.props.handleFiltering(tempdata);
	}
	onDatesChange({ startDate, endDate }) {
		this.setState({ startDate, endDate });
	}

	onFocusChange(focusedInput) {
		this.setState({ focusedInput });
	}
	componentWillMount() {
		var startDate = moment();
		var endDate = moment();
		this.setState({
			startDate: startDate,
			endDate: endDate,
			suggestions: country_list_with_id.name
		});
	}
	handleAddition(tag) {
		console.log(tag);
		let tags = this.state.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.setState({ tags: tags });
		this.props.handleCountryFiltering(this.state.tags);
	}
	handleDelete(i) {
		let tags = this.state.tags;
		tags.splice(i, 1);
		this.setState({ tags: tags });
	}
	handleDrag(tag, currPos, newPos) {
		let tags = this.state.tags;

		// mutate array
		tags.splice(currPos, 1);
		tags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: tags });
	}

	render() {
		var dropdown = country_list_with_id.map(result => {
			return (
				<option value={result.name} data-key={result.id} label={result.name}>
					{result.name}
				</option>
			);
		});

		const { focusedInput, startDate, endDate } = this.state;
		const items = this.props.Items;

		// var date1 = new Date();
		//
		// items["date1"] = date1;
		let formtext = null;
		var form = Object.keys(items).map((item, i) => {
			let into = null;
			let dat = this.state.dat;
			if (item === "id") {
			} else if (item === "country") {
			} else if (items[item] instanceof Date) {
				if (dat[item] !== "between") {
					into = (
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
					into = (
						<div>
							<DateRangePicker
								startDateId="your_unique_start_date_id"
								endDateId="your_unique_end_date_id"
								onDatesChange={this.onDatesChange}
								onFocusChange={this.onFocusChange}
								focusedInput={focusedInput}
								startDate={startDate}
								endDate={endDate}
							/>
						</div>
					);
				}

				return (
					<FormGroup row="row">
						<Col md="3">
							<Label
								htmlFor="hf-email"
								style={{
									fontSize: 20
								}}
							>
								{item}
							</Label>
						</Col>
						<Col cd="3">{into}</Col>
						<Col xs="12" md="3">
							<div>
								<UncontrolledButtonDropdown>
									<DropdownToggle caret="caret" size="xs">
										{dat[item]}
									</DropdownToggle>
									<DropdownMenu>
										{this.state.operator.map((result, key) => [
											<DropdownItem
												onClick={this.dropdwonClicked}
												data-key={result}
												data-item={item}
											>
												{result}
											</DropdownItem>
										])}
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
						</Col>
					</FormGroup>
				);
			} else if (item == "country_name") {
				const { tags, suggestions } = this.state;
				return (
					<div>
						<div className="element">
							<div className="inputCountries">
								<Label
									htmlFor="hf-email"
									style={{
										fontSize: 20
									}}
								>
									{item}
								</Label>
							</div>

							<div>
								<ReactTags
									tags={tags}
									suggestions={suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.handleAddition}
									handleDrag={this.handleDrag}
								/>
							</div>
						</div>
						<div className="inputCountries">
							<Input
								type="select"
								placeholder={item}
								data-key={item}
								defaultValue={items[item]}
								onChange={this.handleEditChange}
							>
								{dropdown}
							</Input>
						</div>
					</div>
				);
			} else {
				return (
					<FormGroup row="row">
						<Col md="3">
							<Label
								htmlFor="hf-email"
								style={{
									fontSize: 20
								}}
							>
								{item}
							</Label>
						</Col>
						<Col cd="3">
							<Input
								type="email"
								id="hf-email"
								name="hf-email"
								placeholder={item}
								onChange={this.handleChange}
								data-key={item}
							/>
						</Col>
						<Col md="3">
							<div>
								<UncontrolledButtonDropdown>
									<DropdownToggle caret="caret" size="xs">
										{dat[item]}
									</DropdownToggle>
									<DropdownMenu>
										{this.state.operator.map((result, key) => [
											<DropdownItem
												onClick={this.dropdwonClicked}
												data-key={result}
												data-item={item}
											>
												{result}
											</DropdownItem>
										])}
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
						</Col>
					</FormGroup>
				);
			}
		});

		return (
			<div>
				<h1>
					<Col md="12" lg="12" xl="12">
						<Card>
							<CardBody>
								<Form action="" method="post" className="form-horizontal">
									{form}
								</Form>
							</CardBody>
							<CardFooter>
								<Button type="reset" size="md" color="danger">
									<i className="fa fa-ban" />
									Reset
								</Button>
							</CardFooter>
						</Card>
					</Col>
				</h1>
			</div>
		);
	}
}
export default FilterForm;
