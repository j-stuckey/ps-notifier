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
            this.setState({
                gistData: res.data,
                files: Object.values(res.data.files)
            });
        });
    }

    componentDidUpdate() {
        const { gistData } = this.state;
        console.log('Updating...');
        console.log(gistData);

        // Here I am trying to get the info that
        // will display how long ago the changes were
        const history = gistData.history.map(item => {
            return new Date(item.committed_at);
        });
        // console.log(history);
    }

    render() {
        const { files } = this.state;

        return (
            <div className="App">
                {files.length > 0 && (
                    <ChangelogFile
                        content={files[0].content}
                        name={files[0].filename}
                    />
                )}
            </div>
        );
    }
}

const ChangelogFile = props => {
    return (
        <div className="ChangelogContainer">
            <h1>{props.name}</h1>

            <p>{props.content}</p>
        </div>
    );
};

export default App;
