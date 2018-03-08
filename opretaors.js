opVarChar = {
	"=": "EXACT",
	like: "CONTAINS"
};

opInteger = {
	"=": "EXACT",
	"<": "LT",
	"<=": "LTE",
	">": "GT",
	"=>": "GTE"
};
opDateTime = {
	in: "IN",
	"=": "EXACT",
	"<": "LT",
	"<=": "LTE",
	">": "GT",
	"=>": "GTE",
	between: "BETWEEN"
};
