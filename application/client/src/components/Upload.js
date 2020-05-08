import React, { Component, useState, setState } from 'react'
import '../styles/Upload.css'
import logo from '../imgs/gator.png';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("document");

    var selectedFile;
    var previewFile;


    const fileSelectedHandler = (event) => {
        selectedFile = event.target.files[0];
        console.log(selectedFile);
    }

    const previewSelectedHandler = (event) => {
        selectedFile = event.target.files[0];
        console.log(selectedFile);
    }

    const getFileType1 = () => {
        setType(document.getElementsByClassName("type-upload1"));
        console.log(type[0].value);
    }

    const getFileType2 = () => {
        setType(document.getElementsByClassName("type-upload2"));
        console.log(type[0].value);
    }

    const fileDescriptionHandler = (event) => {
        setDescription(event.target.value)
    }


    const submit = () => {
        console.log('Submitting Upload');
        const axios = require('axios');
        axios.defaults.withCredentials = true;
        // console.log(selectedFile);

        var formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("preview", null);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", "document");
        formData.append("type", type);
        // formData.append("academic", 0);
        formData.append("acc_id", 3);
        axios.post(`http://18.191.184.143:3001/upload`,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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
                                    <div>

                                        <div class="form-check">
                                            <input class="type-upload1" type="radio" name="exampleRadios"  value="digital" checked onClick={getFileType1}></input>
                                            <label class="form-check-label" for="exampleRadios1">
                                                Digital
          </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="type-upload2" type="radio" name="exampleRadios"  value="physical" onClick={getFileType2}></input>
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
                                        <label for="upload">Preview file</label>
                                        <div class="col-lg-5 mx-auto">
                                            <label for="fileUpload"
                                                class="file-upload btn btn-block rounded-pill shadow">
                                                <i class="fa fa-upload mr-2"></i>Browse Preview
                                                    <input id="fileUpload" type="file" onChange={previewSelectedHandler}></input>
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
