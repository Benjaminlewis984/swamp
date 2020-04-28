const databaseManager = require('./database-manager.js');

exports.addMedia = async (title, description, preview_path, raw_path, category, price = 0, acc_id, academic = 0, type) => {
  const date = new Date().toJSON().slice(0,10);
  const time = new Date().toJSON().slice(11,19);
  await databaseManager.queryDatabase(`INSERT INTO \`media content\`
    (title, \`description\`, preview_path, raw_path, category, price, acc_id, academic, \`date\`, \`time\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
    [title, description, preview_path, raw_path, category, price, acc_id, academic, date, time]);
  const last_id = await databaseManager.queryDatabase(`SELECT MAX(m_id) FROM \`media content\`;`);
  const m_id = last_id[0]['MAX(m_id)'];

  if(type == 'digital') { await databaseManager.queryDatabase(`INSERT INTO \`digital media\`(m_id, sold) VALUES (?, 0);`, [m_id]); }
  else { await databaseManager.queryDatabase(`INSERT INTO \`physical media\`(m_id) VALUES (?);`, [m_id]);}
}

exports.deleteMedia = async (title) => {
  await databaseManager.queryDatabase(`DELETE FROM media WHERE title = ?;`, [title]);
}

exports.approveMedia = async (m_id, admin_id) => {
  await databaseManager.queryDatabase(`UPDATE \`media content\` SET status = 'approved' WHERE m_id = ?;`, [m_id]);
  await databaseManager.queryDatabase(`INSERT INTO \`approved media\`(m_id, status, status_by) VALUES (?, ?, ?);`, [m_id, 'approved', admin_id])
}

exports.rejectMedia = async (m_id, admin_id) => {
  await databaseManager.queryDatabase(`UPDATE \`media content\` SET status = 'rejected' WHERE m_id = ?;`, [m_id]);
  await databaseManager.queryDatabase(`INSERT INTO \`rejected media\`(m_id, status, status_by) VALUES (?, ?, ?);`, [m_id, 'rejected',admin_id]);
}

exports.getMediaFromStatus = async (status) => {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`media content\` WHERE status = ?;`, [status]);
  if(count[0]['COUNT(*)'] > 0) {
    const result = await databaseManager.queryDatabase(`SELECT * FROM \`media content\` WHERE status = ?;`, [status]);
    return result;
  }
  return undefined;
}

exports.deleteRejectedMedia = () => {
  databaseManager.queryDatabase(`DELETE FROM \`media content\` media INNER JOIN \`rejected media\` rejected ON media.m_id = rejected.m_id;`, []);
}

exports.getMediaFilter = async (count, offset, filter) => {
  let queryString = "SELECT DISTINCT * FROM `media content` ";
  let params = [];

  if (filter.status !== undefined || filter.category !== undefined || filter.search !== undefined) {
    queryString += "WHERE ";
  }

  if (filter.status !== undefined) {
    queryString += "`status` = ? ";
    params.push(filter.status);
  }

  if (filter.category !== undefined) {
    if (filter.status !== undefined) {
      queryString += "AND ";
    }

    queryString += "category = ? ";
    params.push(filter.category);
  }

  if (filter.search !== undefined) {
    if (filter.status !== undefined || filter.category !== undefined) {
      queryString += "AND ";
    }

    queryString += "title LIKE ? OR `description` LIKE ? ";
    params.push('%' + filter.search[0] + '%', '%' + filter.search[0] + '%');

    for(let i = 1; i < filter.search.length; ++i) {
      queryString += " OR title LIKE ? OR `description` LIKE ? ";
      params.push('%' + filter.search[i] + '%', '%' + filter.search[i] + '%');
    }
  }

  queryString += "LIMIT " + count + " OFFSET " + offset + ";";
  
  const result = await databaseManager.queryDatabase(queryString, params);
  return result;
}

exports.getPurchases = async (count, offset, accountID) => {
  let registeredUserQuery = "SELECT DISTINCT * FROM `registered users` WHERE `acc_id` = " + accountID + ";";
  const firstResult = await databaseManager.queryDatabase(registeredUserQuery);
  const registeredID = firstResult[0].reg_id;

  let checkoutQuery = "SELECT DISTINCT * FROM `checkout` WHERE `reg_id` = " + registeredID + ";";
  const secondResult = await databaseManager.queryDatabase(checkoutQuery);
  let approvedIDString = "";
  secondResult.forEach(async (result, idx) => {
    approvedIDString += result.approved_id;
    if (idx != secondResult.length - 1) {
      approvedIDString += ", ";
    }
  });

  let approvedMediaQuery = "SELECT DISTINCT * FROM `approved media` WHERE `approved_id` IN (" + approvedIDString + ") LIMIT " + count + " OFFSET " + offset + ";";
  const thirdResult = await databaseManager.queryDatabase(approvedMediaQuery);
  let mediaIDString = "";
  thirdResult.forEach(async (result, idx) => {
    mediaIDString += result.m_id;
    if (idx != thirdResult.length - 1) {
      mediaIDString += ", ";
    }
  });

  let mediaContentQuery = "SELECT DISTINCT * FROM `media content` WHERE `m_id` IN (" + approvedIDString + ");";
  const fourthResult = await databaseManager.queryDatabase(mediaContentQuery);
  return fourthResult;
}

exports.getListings = async (count, offset, accountID) => {
  let mediaContentQuery = "SELECT DISTINCT * FROM `media content` WHERE `acc_id` = " + accountID + " LIMIT " + count + " OFFSET " + offset + ";";
  const firstResult = await databaseManager.queryDatabase(mediaContentQuery);
  return firstResult;
}

exports.getPurchaseCount = async (mediaID) => {
  let digitalMediaQuery = "SELECT DISTINCT * FROM `digital media` WHERE `m_id` = " + mediaID + ";";
  const firstResult = await databaseManager.queryDatabase(digitalMediaQuery);

  return firstResult[0].sold;
}