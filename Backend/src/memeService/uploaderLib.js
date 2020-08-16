const cloudinary = require("cloudinary");
const config = require("./memeconfig");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
});

async function uploadMemes(memes) {
  let arrayOfPromises = [];
  memes.forEach(el =>
    arrayOfPromises.push(
      cloudinary.v2.uploader.upload(el, {
        use_filename: false,
        folder: "testMemeUpload"
      })
    )
  );
  try {
    return await Promise.all(arrayOfPromises);
  } catch (e) {
    console.error(e);
  }
}

module.exports = uploadMemes;

/*
Cloudinary Response
{
 public_id: 'sample',
 version: '1312461204',
 width: 864,
 height: 564,
 format: 'jpg',
 created_at: '2017-08-10T09:55:32Z',
 resource_type: 'image',
 tags: [],
 bytes: 9597,
 type: 'upload',
 etag: 'd1ac0ee70a9a36b14887aca7f7211737',
 url: 'http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
 secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
 signature: 'abcdefgc024acceb1c1baa8dca46717137fa5ae0c3',
 original_filename: 'sample'
}
*/