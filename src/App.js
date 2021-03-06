import React from 'react';
import './App.css';
import icon from './assets/user.png';
import axios from 'axios';

import { GITHUB_BASE_URL } from './config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            gistData: null,
            files: [
				// Example data
                {
                    filename: 'Release 1',
                    content:
                        'We added this amazing new feature. It lets you do amazing things and so much more. Try it out today to see for yourself.'
                },
                {
                    filename: 'Release 2',
                    content:
                        'We added this amazing new feature. It lets you do amazing things and so much more. Try it out today to see for yourself.'
                }
            ]
        };
    }

    async componentDidMount() {
		const gistId = 'c0e89effa749de86473b43845918b130';
		
		// Should fetch the data needed from API

        // This uses v3 of the Github API
        // grabs gist from github for changelog
        // const response = await axios.get(`${GITHUB_BASE_URL}/gists/${gistId}`);

		// 

        // this.setState({
        //     gistData: response.data,
        //     files: Object.values(response.data.files)
        // });
    }

    handleClick = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    };

    render() {
        const { files, modalIsOpen } = this.state;

        return (
            <div className={modalIsOpen ? 'Darkened' : 'App'}>
                <header>
                    <button
                        className="ProfileButton"
                        onClick={this.handleClick}
                    >
                        <img
                            src={icon}
                            alt="profile icon"
                            className="ProfileIcon"
                        />
                    </button>
                </header>
                {modalIsOpen && files.length > 0 && (
                    <div className="ChangelogModal">
                        <button
                            onClick={this.handleClick}
                            className="CloseModalButton"
                        >
                            X
                        </button>
                        <ChangelogFile
                            content={files[0].content}
                            name={files[0].filename}
                        />
                        <ChangelogFile
                            content={files[1].content}
                            name={files[1].filename}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const ChangelogFile = props => {
    return (
        <div className="ChangelogItem">
            <h1>{props.name}</h1>

            <p>{props.content}</p>
            <div className="SeparatorLine" />
        </div>
    );
};

export default App;
