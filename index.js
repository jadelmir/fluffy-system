import {
	Table,
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from "reactstrap";
import React, { Component } from "react";
import MyForm from "./form";
import FilterForm from "./FilterForm";
import { map } from "lodash";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class TableSearch extends Component {
	addFilter() {
		console.log("in the addFilter section ", this.state._filterOthers);
		if (this.state.filterBycountry) {
			this.props.filterBycountry(this.state.filterBycountry);
		}
		if (this.state._filterOthers) {
			this.props.filterOthers(this.state._filterOthers);
		}

		this.filtertoggle();
	}
	//on clicking on the ADD buton in the modal will triger this event
	// userADD to close back the modal
	//state.edit true when we are editing a user

	addUser() {
		this.setState({ userADD: true });
		this.forceUpdate();
		this.toggle();
		if (this.state.edit) {
			this.props.onEdit(this.state.editedUser);
		} else {
			this.props.onAdd(this.state.DataAdd);
		}
	}

	//is done each time the user add a row or change it

	doEdit(_user) {
		this.setState({
			editedUser: _user
		});
	}

	//done after the modal of the delete is done

	handleDelete() {
		let id = this.state.idTodelete;
		var Removed = this.state.items.filter(function(el) {
			return el.id !== id;
		});
		this.props.onDelete(id);
		this.setState({ items: Removed, nestedModal: false });
		this.forceUpdate();
	}

	//on press edit
	//edit to know if it is an edit input or add input
	handleCountryFiltering(_country) {
		this.setState({
			filterBycountry: _country
		});
	}
	handleEdit(id) {
		this.setState({
			edit: true,
			id: id,
			modal: !this.state.modal
		});
		this.forceUpdate();
	}

	handleFiltering(_data) {
		console.log("data are :", _data);
		this.setState({
			_filterOthers: _data
		});
	}
	//toggle to open the modal

	toggle(id) {
		this.setState({
			modal: !this.state.modal,
			edit: false
		});
		this.forceUpdate();
	}
	//toggle nested to open the small modal of the onDelete

	toggleNested(id) {
		console.log(id);
		this.setState({
			nestedModal: !this.state.nestedModal,
			idTodelete: id
		});
		this.forceUpdate();
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.items != nextState.items;
	}
	handleChange(event) {
		var thekey = event.target.dataset;
		console.log("event target dataset", thekey);
		var res = event.target.value;
		var temp = this.state.tempArr;
		temp[thekey.key] = event.target.value;
		var pushList = temp;
		console.log(pushList);
		this.filter(pushList, thekey, res);
	}
	filter(pushList, thekey, res) {
		var updatedList = this.state.items.filter(item => {
			if (item[thekey.key] == null) {
			} else {
				return item[thekey.key].toLowerCase().search(res.toLowerCase()) !== -1;
			}
		});
		console.log("updatedList is :", updatedList);
		this.setState({ items: updatedList });
		this.forceUpdate();
	}
	componentWillMount() {
		var items = this.props.Items;
		console.log("component has mounted again and again");
		this.setState({ items: items, width: window.innerWidth });
	}
	doParentToggle(_toggle) {
		this.setState({ counter: _toggle });
	}
	doAdd(_Add) {
		console.log(_Add);
		this.setState({
			DataAdd: _Add
		});
	}
	filtertoggle() {
		this.setState({
			filtermodal: !this.state.filtermodal
		});
		this.forceUpdate();
	}
	compareValues(key, order = "asc") {
		return function(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				return 0;
			}

			const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
			const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return order == "desc" ? comparison * -1 : comparison;
		};
	}
	handleSorting(result) {
		let order = this.state.order;
		let items = this.state.items.sort(this.compareValues(result, order));
		if (this.state.order == "asc") {
			order = "desc";
		} else {
			order = "asc";
		}
		this.setState({
			order: order,
			items: items
		});
		console.log(items);
		this.forceUpdate();
	}
	constructor(props) {
		super(props);
		this.state = {
			listitems: [],
			result: "",
			tempArr: [],
			items: [],
			modal: false,
			edit: false,
			id: 1,
			nestedModal: false,
			idTodelete: null,
			userADD: false,
			counter: 0,
			filtermodal: false,
			width: "",
			DataAdd: [],
			comparison: false,
			order: "asc",
			editedUser: [],
			_filterOthers: {},
			filterBycountry: [],
			items: this.props.items || []
		};

		this.addUser = this.addUser.bind(this);
		this.addFilter = this.addFilter.bind(this);
		this.handleFiltering = this.handleFiltering.bind(this);
		this.handleCountryFiltering = this.handleCountryFiltering.bind(this);
		this.doAdd = this.doAdd.bind(this);
		this.doEdit = this.doEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.toggleNested = this.toggleNested.bind(this);
		this.doParentToggle = this.doParentToggle.bind(this);
		this.filtertoggle = this.filtertoggle.bind(this);
		this.handleSorting = this.handleSorting.bind(this);
		this.compareValues = this.compareValues.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.Items[0] !== nextProps.Items[0]) {
			this.setState({
				items: this.props.Items
			});
			console.log("should component update is true here");
			return true;
		} else {
			return false;
		}
	}
	componentDidUpdate(prev, prevState) {
		console.log("component did update is here");
		// this.setState(
		// 	{
		// 		items: this.props.Items
		// 	},
		// 	() => {
		// 		//callback
		// 		console.log("set state has finished", this.state.items);
		// 	}
		// );
	}
	toString(string) {
		var newString = string.replace("_", " ");
		console.log("the new string is :", newString);
		return newString.charAt(0).toUpperCase() + newString.slice(1);
	}
	render() {
		let h = this.props.Items;
		let Thead = Object.getOwnPropertyNames(h[0]);
		// console.log(Thead);

		const Heads = Thead.map((result, key) => {
			if (result == "id" || result == "country") {
			} else {
				result = this.toString(result);
				return (
					<th>
						{result}
						<i
							className="fa fa-sort"
							onClick={() => this.props.onSorting(result)}
						/>
					</th>
				);
			}
		});

		// for input fields that handles filter sorting
		// not needed for now
		const inputs = Thead.map((result, key) => {
			if (result == "id") {
			} else {
				return (
					<td>
						<input
							type="text"
							name="name"
							placeholder={result}
							data-key={result}
							onChange={this.handleChange}
						/>
					</td>
				);
			}
		});

		// state doesn't change so
		// if it is not changed we you the props
		// else we use the state
		if (this.state.items.length > 1) {
			var theitems = this.state.items;
		} else {
			var theitems = this.props.Items;
		}
		const items = theitems.map((result, keys) => {
			const eachOne = map(result, (item, key) => {
				if (item == result.id || item == result.country) {
				} else if (item == null) {
					return <td>null</td>;
				} else {
					return <td>{item}</td>;
				}
			});

			return (
				<tr>
					{eachOne}
					<td
						style={{
							cursor: "pointer"
						}}
					>
						<i
							className="fa fa-remove"
							onClick={() => this.toggleNested(result.id)}
						/>{" "}
						<i
							className="fa fa-pencil"
							onClick={() => this.handleEdit(result.id)}
							style={{
								paddingLeft: 10
							}}
						/>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<Row>
					<Col xs="12" xl="12">
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify" />
								<strong>{this.props.Tableheader}</strong>
								<div className="card-actions">
									<a
										target="_blank"
										onClick={this.props.onExport}
										style={{
											cursor: "pointer"
										}}
									>
										<small className="text-muted">
											<i className="fa fa-share-square" />
										</small>
									</a>
									<a
										target="_blank"
										onClick={this.filtertoggle}
										style={{
											cursor: "pointer"
										}}
									>
										<small className="text-muted">
											<i className="fa fa-filter" />
										</small>
									</a>
									<a
										target="_blank"
										onClick={this.toggle}
										style={{
											cursor: "pointer"
										}}
									>
										<small className="text-muted">
											<i className="fa fa-plus" />
										</small>
									</a>
								</div>
							</CardHeader>
							<CardBody>
								<Table responsive="responsive">
									<thead>
										<tr>
											{Heads}
											<th>CRUD</th>
										</tr>
									</thead>
									<tbody>
										{/* <tr>{inputs}</tr> */}
										{items}
									</tbody>
								</Table>
								<Pagination size="lg">
									<PaginationItem>
										<PaginationLink
											previous
											onClick={this.props.getPreviousClients}
										/>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink next onClick={this.props.getNextClients} />
									</PaginationItem>
								</Pagination>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<div>
					<Modal
						isOpen={this.state.filtermodal}
						toggle={this.filtertoggle}
						className={this.props.className}
					>
						<ModalHeader toggle={this.filtertoggle}>
							Filter {this.props.Tableheader}
						</ModalHeader>
						<ModalBody>
							<FilterForm
								Items={this.props.Items[this.state.id - 1]}
								handleFiltering={this.handleFiltering}
								handleCountryFiltering={this.handleCountryFiltering}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.addFilter}>
								Filter
							</Button>{" "}
							<Button color="secondary" onClick={this.filtertoggle}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>
					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						className={this.props.className}
					>
						<ModalHeader toggle={this.toggle}>
							{this.state.edit ? "Edit" : "ADD"} {this.props.Tableheader}
						</ModalHeader>
						<ModalBody>
							<MyForm
								Items={this.props.Items[this.state.id - 1]}
								Edit={this.state.edit}
								userAded={this.state.userADD}
								parentToggle={this.doParentToggle}
								doAdd={this.doAdd}
								doEdit={this.doEdit}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.addUser}>
								{this.state.edit ? "Edit" : "ADD"}
							</Button>{" "}
							<Button color="secondary" onClick={this.toggle}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>

					<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
						<ModalHeader>Are you sure you want to delete</ModalHeader>
						<ModalBody>Stuff and things</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggleNested}>
								cancel
							</Button>{" "}
							<Button color="secondary" onClick={this.handleDelete}>
								delete
							</Button>
						</ModalFooter>
					</Modal>
				</div>
				<h1>{this.state.counter}</h1>
			</div>
		);
	}
}
export default TableSearch;
