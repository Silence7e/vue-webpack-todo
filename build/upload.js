const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu'); // eslint-disable-line

const cdnConfig = require('../app.config').cdn;

const {
  ak,
  sk,
  bucket,
} = cdnConfig;
console.log(ak, sk);
const mac = new qiniu.auth.digest.Mac(ak, sk);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

const doUpload = (key, file) => {
  console.log(key, file);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const options = {
    scope: `${bucket}:${key}`,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (respErr,
      respBody, respInfo) => {
      if (respErr) {
        return reject(respErr);
      }
      if (respInfo.statusCode === 200) {
        return resolve(respBody);
      }
      return reject(respBody);
    });
  });
};

const publicPath = path.join(__dirname, '../public');

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const key = prefix ? `${prefix}/${file}` : file;
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key);
    }
    return doUpload(key, filePath)
      .then(resp => console.log(resp))
      .catch(err => console.error(err));
  });
};

uploadAll(publicPath);
