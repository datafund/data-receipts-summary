import React from 'react';
import ReactDOM from 'react-dom';
import {ConsentsSummary} from "./lib";

// const App = () => (
//     <div style={{ width: 640, margin: "15px auto" }}>
//         <h1>Consents Summary</h1>
//
//         <label className="btn btn-primary d-inline" htmlFor={"file"}><i
//             className="fa fa-upload"></i> Upload JWT.CR file(s)
//             File <input id="file" className="mt-4" type="file"
//                         accept=".json,application/json"
//                         onChange={_this.onInputFileChange} style={{
//                 width: '0px',
//                 height: '0px',
//                 overflow: 'hidden'
//             }}/></label>
//
//         <ConsentsSummary data={{"test": "lorem ipsum"}} />
//     </div>
// );
//
// render(<App />, document.getElementById("root"));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }

        this.onInputFileChange = this.onInputFileChange.bind(this);
    }

    componentDidMount() {

    }

    onInputFileChange(e) {
        const _this = this;

        if (window.FileReader) {


            // e.target.files.FileList.forEach(function(element, index) {
            //     console.log(element, index);
            // });
            console.log(e.target.files);

            let files = e.target.files;

            console.log(files);

            for (let index = 0, len = files.length; index < len; ++index) {
                console.log(files[index]);

                let file = files[index], reader = new FileReader();
                reader.onload = function (r) {
                    let importedData = window.atob(r.target.result.substr(37));

                    _this.state.files.push(importedData);
                    _this.forceUpdate();
                }
                reader.readAsDataURL(file);


            }

            //console.log(reader);
        } else {
            console.log('Sorry, your browser does\'nt support for preview');
        }
    }

    render() {
        const _this = this;


        return (
            <div style={{width: 640, margin: "15px auto"}}>
                <h1 className="mb-3">Consents Summary</h1>

                <label className="btn btn-primary mt-5 mb-3 d-inline" htmlFor={"file"}><i
                    className="fa fa-upload"></i> Upload JWT.CR file(s)
                    <input id="file" className="mt-4" type="file"
                           accept=".CR,text/plain"
                           multiple={"multiple"}
                           onChange={_this.onInputFileChange} style={{
                        width: '0px',
                        height: '0px',
                        overflow: 'hidden'
                    }}/></label>

                <ConsentsSummary data={_this.state.files}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
