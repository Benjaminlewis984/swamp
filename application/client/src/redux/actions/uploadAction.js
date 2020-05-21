export const upload = () => (dispatchEvent, getState) => {
  const axios = require("axios");
  const React = require("react");

  const file = getState().uploadReducer.file;               // file
  const preview = getState().uploadReducer.preview;         // file

  const title = getState().uploadReducer.title;             // string
  const description = getState().uploadReducer.description; // string
  const category = getState().uploadReducer.category;       // string

  axios.post(`http://18.191.184.143:3001/upload`, {
    file: file,
    preview: preview,
    title: title,
    description: description,
    category: category,

    validateStatus: false
  })
  .then((response) => {
    if(response.data.success==='true') {
      window.location.reload(false);
    }
  })
  .catch(e => {
    dispatchEvent(setLoadingState('error'));
  });
};