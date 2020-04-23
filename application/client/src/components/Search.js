import React, { Component } from 'react'
import axios from 'axios';
import { Input, Table } from 'reactstrap';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {},
        };

        this.cancel = '';
    }

    fetchSearchResults = (query) => {

        console.log('Search by title called')

        axios.post('http://18.191.184.143:3001/browse', {
            category: 'all',
            search: query,
        }).then((res) => {
            console.log('TEST');
            console.log(res.data.results);
            this.setState({
                results: res.data.results,

            })

            let element = document.getElementById('results');
            element.style.display = "block";
        }).catch(err => console.log(err));
    };

    handleOnInputChange = (event) => {
        const query = event;
        console.log(query);
    };

    render() {

        const { query, results } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title pt-5"> swamp </div>
                </div>
                <div className="input-group">
                    <div className="input-group-btn search-panel">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <span id="search_concept"> Filter </span>
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#All">All</a></li>
                            <li><a href="#Documents">Documents</a></li>
                            <li><a href="#Images">Images</a></li>
                            <li><a href="#Music">Music</a></li>
                            <li><a href="#Video">Video</a></li>
                        </ul>
                    </div>
                    <Input type='text' value={query} onChange={e => this.handleOnInputChange(e.target.value)} placeholder='Search by title..' />
                    <button onClick={this.fetchSearchResults}>Search</button>
                    <Table id='results' display="none">
                        {/* <th class='results th'>
            <td>Title</td>
            <td>Description</td>
            <td>Category</td>
            <td>Preview</td>
          </th> */}

                        {/* {result.map(items =>
            <tr>
              <td>{items.title}</td>
              <td>{items.description}</td>
              <td>{items.category}</td>
              <td> <img src={`http://localhost:3001/${items.preview_path}`}></img></td>
            </tr>)} */}
                    </Table>
                </div>
            </div>
        )
    }
}

export default Search