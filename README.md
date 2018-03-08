# fluffy-system
generic-table-for-reactjs

to use this table you should 


install using npm 

	npm i --save loadash
	npm i --save reactstrap
	npm i --save react-dates
	npm i --save moments

functions needed 


	filterBycountry(_country) {
		console.log("countries are  in the client page", _country);
	}
	filterOthers(_data) {
		console.log("data is in the client page ", _data);
	}

	onAdd(_Add) {
		console.log("the add is in here ", _Add);
	}
	onEdit(_user) {
		console.log("user being edited is ", _user);
	}
	onDelete(_id) {
		console.log("user delet is of id:", _id);
	}
	onSorting(_Sort) {
		console.log("sort in here is clicked", _Sort);
		console.log("before sorting the data is", this.state.listitems);
		// this.handleSorting(_Sort);
	}
	onExport() {
		console.log("the export is in the client page");
	}

	getNextClients() {
		let nextURL = this.state.nextClientsURL;
		this.setState(
			{
				currentURL: nextURL
			},
			() => {
				this.getAllClients();
			}
		);
		console.log("get next client is clicked and arrived to the function");
	}

	getPreviousClients() {
		let previousURL = this.state.previousClientsURL;
		this.setState(
			{
				currentURL: previousURL
			},
			() => {
				this.getAllClients();
			}
		);
		console.log("get previous client is clicked and arrived to the function");
	}
	getAllClients() {
		console.log("the currentURl is :", this.state.currentURL);
		axios.get(this.state.currentURL).then(response => {
			let result = response.data.results;
			this.setState({
				nextClientsURL: response.data.next,
				previousClientsURL: response.data.previous,
				listitems: result,
				test: 5
			});
		});
	}
	componentDidMount() {
		this.getAllClients();
	}
	
	
import TableSearch 
then 

the stats needed :
				tableheader: "ExampleTable",
			nextClientsURL: null,
			previousClientsURL: null,
			currentURL: YOUR_URL,//need to be changed
			order: "desc",
			listitems:[YOURARRAY]//need to be changed
			test: 0
	
then use the table 
	
	<TableSearch
						Items={this.state.listitems}
						Tableheader={this.state.tableheader}
						onAdd={this.onAdd}
						onEdit={this.onEdit}
						onDelete={this.onDelete}
						filterBycountry={this.filterBycountry}
						filterOthers={this.filterOthers}
						getNextClients={this.getNextClients}
						getPreviousClients={this.getPreviousClients}
						onSorting={this.onSorting}
						onExport={this.onExport}
					/>
