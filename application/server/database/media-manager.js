const databaseManager = require('./database-manager.js');

/*exports.addMedia = (author_id, title, description, preview_path, raw_path, category) => {
  var queryString = "('" + author_id + "', '" + title + "', '" + description + "', '" + preview_path + "', '" + raw_path + "', '" + category + "');";
  databaseManager.queryDatabase("INSERT INTO media(author_id, title, description, preview_path, raw_path, category) VALUES " + queryString, (result) => {});
}*/

exports.addMedia = (title, description, preview_path, raw_path, category, price = 0, acc_id, academic = 0) => {
  let date = new Date().toJSON().slice(0,10);
  let time = new Date().toJSON().slice(11,19);
  databaseManager.queryDatabase(`INSERT INTO \`media content\`(title, \`description\`, preview_path, raw_path, category, price, acc_id, academic, \`date\`, \`time\`) VALUES ('${title}', '${description}', '${preview_path}', '${raw_path}', '${category}', ${price}, ${acc_id}, ${academic}, '${date}', '${time}');`, (result) => {});
}

exports.deleteMedia = (title) => {
  var queryString = "'" + title + "';";
  databaseManager.queryDatabase("DELETE FROM media WHERE title = " + queryString, (result) => {});
}

/*
exports.approveMedia = (id) => {
  var queryTitle = "'" + id + "';";
  databaseManager.queryDatabase("UPDATE media SET status = 'approved' WHERE id = " + queryTitle, (result) => {});
}
*/

exports.approveMedia = (m_id, admin_id) => {
  databaseManager.queryDatabase(`UPDATE \`media content\` SET status = 'approved' WHERE m_id = ${m_id};`, (result) => {});
  databaseManager.queryDatabase(`INSERT INTO \`approved media\`(m_id, status, status_by) VALUES (${m_id}, 'approved', ${admin_id})`, (result) => {})
}

/*
exports.rejectMedia = (id) => {
  var queryTitle = "'" + id + "';";
  databaseManager.queryDatabase("UPDATE media SET status = 'rejected' WHERE id = " + queryTitle, (result) => {});
}
*/

exports.rejectMedia = (m_id, admin_id) => {
  databaseManager.queryDatabase(`UPDATE \`media content\` SET status = 'rejected' WHERE m_id = ${m_id};`, (result) => {});
  databaseManager.queryDatabase(`INSERT INTO \`rejected media\`(m_id, status, status_by) VALUES (${m_id}, 'rejected', ${admin_id});`, (result) => {});
}

exports.getMediaFromStatus = (status, action) => {
  databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`media content\` WHERE status = '${status}';`, (count) => {
    if(count[0]['COUNT(*)'] > 0) {
      databaseManager.queryDatabase(`SELECT * FROM \`media content\` WHERE status = '${status}';`, (result) => {
        action(result);
      });
    } else {
      action(undefined);
    }
  });
}

/*
exports.deleteRejectedMedia = () => {
  databaseManager.queryDatabase(`DELETE FROM media WHERE status = 'rejected'`);
}
*/

exports.deleteRejectedMedia = () => {
  databaseManager.queryDatabase(`DELETE FROM \`media content\` media INNER JOIN \`rejected media\` rejected ON media.m_id = rejected.m_id`)
}

exports.getMediaFilter = (count, offset, filter, action) => {
  var queryString = "SELECT * FROM `media content` ";

  if (filter.status !== undefined || filter.category !== undefined || filter.title !== undefined) {
    queryString += "WHERE ";
  }

  if (filter.status !== undefined) {
    queryString += "`status` = \'" + filter.status + "\' ";
  }

  if (filter.category !== undefined) {
    if (filter.status !== undefined) {
      queryString += "AND ";
    }

    queryString += "category = \'" + filter.category + "\' ";
  }

  if (filter.title !== undefined) {
    if (filter.status !== undefined || filter.category !== undefined) {
      queryString += "AND ";
    }

    queryString += "title = \'" + filter.title + "\' ";
  }

  queryString += "LIMIT " + count + " OFFSET " + offset + ";";

  databaseManager.queryDatabase(queryString, (result) => {
    action(result);
  });
}