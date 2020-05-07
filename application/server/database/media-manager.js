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

exports.deleteMedia = async (m_id) => {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`media content\` WHERE m_id = ?;`, [m_id]);
  if(count[0]['COUNT(*)'] == 0) {
    return undefined;
  }
  await databaseManager.queryDatabase(`DELETE FROM \`media content\` WHERE m_id = ?;`, [m_id]);
  return '';
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

exports.getPurchases = async (count, offset, acc_id) => {
  const result = await databaseManager.queryDatabase(`SELECT DISTINCT * FROM checkout co INNER JOIN \`registered users\` ru ON co.reg_id = ru.reg_id WHERE ru.acc_id = ?;`, [acc_id]);
  let approvedIDString = '';
  await result.forEach((result, idx) => {
    approvedIDString += result.approved_id;
    if (idx != result.length - 1) {
      approvedIDString += ", ";
    }
  });

  if (result.length == 0) {
    return [];
  }

  let approvedMediaQuery = `SELECT DISTINCT * FROM \`approved media\` WHERE approved_id IN (${approvedIDString}) LIMIT ${count} OFFSET ${offset};`;
  const secondResult = await databaseManager.queryDatabase(approvedMediaQuery, []);
  let mediaIDString = '';
  secondResult.forEach(async (result, idx) => {
    mediaIDString += result.m_id;
    if (idx != secondResult.length - 1) {
      mediaIDString += ", ";
    }
  });

  let mediaContentQuery = `SELECT DISTINCT * FROM \`media content\` WHERE m_id IN (${mediaIDString});`;
  const thirdResult = await databaseManager.queryDatabase(mediaContentQuery, []);
  return thirdResult;
}

exports.getListings = async (count, offset, username) => {
  const result = await databaseManager.queryDatabase(`SELECT * FROM \`media content\` mc INNER JOIN accounts acc ON acc.acc_id = mc.acc_id WHERE acc.username = ? LIMIT ? OFFSET ?;`, [username, count, offset]);
  return result;
}

exports.getPurchaseCount = async (m_id) => {
  const result = await databaseManager.queryDatabase(`SELECT DISTINCT * FROM \`digital media\` WHERE m_id = ?;`, [m_id]);
  return result[0].sold;
}