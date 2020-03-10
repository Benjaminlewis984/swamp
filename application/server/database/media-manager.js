var databaseManager = require('./database-manager.js');

exports.addMedia = (author_id, title, description, preview_path, raw_path, category) => {
  var queryString = "('" + author_id + "', '" + title + "', '" + description + "', '" + preview_path + "', '" + raw_path + "', '" + category + "');";
  databaseManager.queryDatabase("INSERT INTO media(author_id, title, description, preview_path, raw_path, category) VALUES " + queryString, (result) => {});
}

exports.deleteMedia = (title) => {
  var queryString = "'" + title + "';";
  databaseManager.queryDatabase("DELETE FROM media WHERE title = " + queryString, (result) => {});
}

exports.approveMedia = (id) => {
  var queryTitle = "'" + id + "';";
  databaseManager.queryDatabase("UPDATE media SET status = 'approved' WHERE id = " + queryTitle, (result) => {});
}

exports.rejectMedia = (id) => {
  var queryTitle = "'" + id + "';";
  databaseManager.queryDatabase("UPDATE media SET status = 'rejected' WHERE id = " + queryTitle, (result) => {});
}

exports.getMediaFromStatus = (status, action) => {
  databaseManager.queryDatabase(`SELECT COUNT(*) FROM media WHERE status = '${status}';`, (count) => {
    // console.log(count);
    if(count[0]['COUNT(*)'] > 0) {
      databaseManager.queryDatabase(`SELECT * FROM media WHERE status = '${status}';`, (result) => {
        action(result);
      });
    } else {
      action(undefined);
    }
  });
}

exports.deleteRejectedMedia = () => {
  databaseManager.queryDatabase(`DELETE FROM media WHERE status = 'rejected'`);
}

exports.getMediaApproved = (count, offset, action) => {
  var queryString = "LIMIT " + count + " OFFSET " + offset + ";";

  databaseManager.queryDatabase('SELECT * FROM media WHERE status = \'approved\' ' + queryString, (result) => {
    action(result);
  });
}