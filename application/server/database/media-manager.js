var databaseManager = require('./database-manager.js');

exports.addMedia = (title, description, category, preview_path, raw_path) => {
  var queryString = "('" + title + "', '" + description + "', '" + category + "', '" + preview_path + "', '" + raw_path + "');";
  databaseManager.queryDatabase("INSERT INTO media(title, description, category, preview_path, raw_path) VALUES " + queryString, (result) => {});
}