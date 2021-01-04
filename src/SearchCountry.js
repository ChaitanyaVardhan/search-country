import React from 'react'


const CountryList = (props) => {
    return (
	props.countryList.map(i => <li key={i.name+1}>{i.name}</li> )
    )
}


/*const SearchBar = (props) => {    return (
	    <input value={props.country} />
    )
}*/


class SearchCountry extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    input: '',
	    countries: []
	};

	this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
	fetch("https://restcountries.eu/rest/v2/all")
	    .then(res => res.json())
	    .then(
		(result) => {
		    this.setState({
			countries: result
		    });
		},
		// Note: it's important to handle errors here
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components.
		(error) => {
		    this.setState({
			error
		    });
		}
	    )
    }

    handleChange(event) {
	this.setState({
	    input: event.target.value
	})

    }

    render() {
	const countries = this.state.input ? this.state.countries.filter(country => country.name.toLowerCase() === this.state.input.toLowerCase()) : this.state.countries
	
	return (
	<>
		<input
	    value={this.state.input}
	    onChange={this.handleChange} />
		<CountryList countryList={countries} />
	</>
	)
    }
}

export default SearchCountry
