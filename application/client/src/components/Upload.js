import React, { Component, useState, setState } from 'react'
import '../styles/Upload.css'
import logo from '../imgs/gator.png';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("document");
    // const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    var selectedFile;


    const fileSelectedHandler = (event) => {
        // console.log(event.target.files[0])
        selectedFile = event.target.files;
    }

    const getFileType1 = () => {
        // var type = document.getElementsByTagName("type-upload");
        var type = document.getElementsByClassName("type-upload1");
        console.log(type[0].value);
    }
    const getFileType2 = () => {
        // var type = document.getElementsByTagName("type-upload");
        var type = document.getElementsByClassName("type-upload2");
        console.log(type[0].value);
    }

    const fileDescriptionHandler = (event) => {
        setDescription(event.target.value)
    }


    const submit = () => {
        console.log('Submitting Upload');
        const axios = require('axios');
        console.log(selectedFile);
        var formData = new FormData();
        var file = document.querySelector('#file');
        formData.append('image', file.files[0]);
        
        axios.post(`http://18.191.184.143:3001/upload`, {    
        "body": {
                "file": selectedFile,
                "preview": null,
                "title": "testingSubmit",
                "description": "description",
                "category": "document",
                "price": 10,
                "academic": 0,
                "type": "digital",
                "acc_id": 3,
                withCredentials: true
            }
        })
            .then((res) => {
                console.log(res);
                // console.log(res.success);

            }).catch(err => console.log("Did not upload"));
    }


    return (
        // <div>
        //     <input type="file" onChange={fileSelectedHandler} />
        //     <button onClick={submit}>Upload</button>
        // </div>

        <div class="container-fluid bg-light py-3" >
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card card-body">
                        <h3 class="text-center mb-4">Upload</h3>
                        <p class="lead text-center">contribute to the swamp</p>

                        <fieldset>
                            <div class="form-group has-success">
                                <label for="title">Title</label>
                                <input class="form-control input-lg"
                                    placeholder="Title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}>
                                </input>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control"
                                    placeholder="Please be informative about what you are uploading"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div class="form-group has-success">
                                <label for="price">Price</label>
                                <input class="form-control input-lg"
                                    placeholder="Price ($)"
                                    name="price"
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}>
                                </input>
                            </div>
                            <div class="form-group has-success" >
                                <div class="form-check" onClick={getFileType1}>
                                    <input class="form-check-input type-upload1" type="radio" value="digital" checked></input>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Digital  </label>
                                </div>
                                <div class="form-check" onClick={getFileType2}>
                                    <input class="form-check-input type-upload2" type="radio" value="physical"></input>
                                    <label class="form-check-label" for="exampleRadios2">
                                        Physical
  </label>
                                </div>
                            </div>
                            <div class="form-group has-success">
                                <label for="upload">Upload file here</label>
                                <div class="col-lg-5 mx-auto">
                                    <label for="fileUpload"
                                        class="file-upload btn btn-block rounded-pill shadow">
                                        <i class="fa fa-upload mr-2"></i>Browse
                                            <input id="fileUpload" type="file" onChange={fileSelectedHandler}></input>
                                    </label>
                                </div>
                            </div>
                            <div class="form-group has-success">
                                <div class="col-lg-5 mx-auto" onClick={submit}>
                                    <label for="submit"
                                        class="btn btn-block btn-success rounded-pill shadow">
                                        <i class="fas fa-paper-plane"></i> Submit
        </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Upload;
