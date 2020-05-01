import React, { Component, useState } from 'react'
import '../styles/Upload.css'
import logo from '../imgs/gator.png';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div class="container-fluid bg-light py-3">
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
                            <div class="form-group has-success">
                                <label for="upload">Upload file here</label>
                                <div class="col-lg-5 mx-auto">
                                    <label for="fileUpload"
                                        class="file-upload btn btn-block rounded-pill shadow">
                                        <i class="fa fa-upload mr-2"></i>Browse
                                    <input id="fileUpload" type="file"></input>
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