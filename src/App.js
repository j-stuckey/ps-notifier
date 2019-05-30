import React from 'react';
import './App.css';
import axios from 'axios';

import { GITHUB_BASE_URL } from './config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { gistData: null, files: [] };
    }

    componentDidMount() {
        const gistId = 'c0e89effa749de86473b43845918b130';
        console.log('Mounting');

        // This uses v3 of the Github API
        // grabs gist from github for changelog
        axios.get(`${GITHUB_BASE_URL}/gists/${gistId}`).then(res => {
            this.setState({ gistData: res.data });
        });
    }

    componentDidUpdate() {
        const { gistData } = this.state;
        console.log('Updating...');
		console.log(gistData);
		
		const history = gistData.history.map(item => {
			return new Date(item.committed_at);
		});
		console.log(history);

        // fetch each of the files and content
        const files = Object.values(gistData.files);
        console.log(files);
    }

    render() {
        const { data } = this.state;
        return (
            <div className="App">
                <header>Hello world</header>

                <ChangelogFile data={null} />
            </div>
        );
    }
}

const ChangelogFile = props => {
    return <h1>{props.description || 'default'}</h1>;
};

export default App;
