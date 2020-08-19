const fetchCheerioObject = require("fetch-cheerio-object");
const cheerio = require("cheerio");

const config = require("./memeconfig");

let Parser = require("rss-parser");
let parser = new Parser();

const _9gag = require("9gag");

async function getCheerioObject(url) {
  return await fetchCheerioObject(url);
}
async function getRssObject(url) {
  return await parser.parseURL(url);
}

//TODO: get the caption, or title of each meme?
const getRedditMemes = async () => {
  let returnInfo = [];
  const $ = await getCheerioObject(config.REDDIT);
  $(".media-element").each(function(i, element) {
    let temp = $(this).attr("src");
    if (typeof temp == "undefined") {
      returnInfo.push(
        $(this)
          .children()
          .attr("src")
      );
    } else {
      returnInfo.push(temp);
    }
  });
  //1. Remove all entries that are "undefined"
  var filtered = returnInfo
    .filter(meme => typeof meme !== "undefined");

  //2. remove all entries that direct to an external resource
  filtered = filtered
    .filter(meme => meme.indexOf("external") == -1);

  //3. remove all entries that are not images, but gifs
  filtered = filtered
    .filter(meme => meme.indexOf("gif") == -1);

  //4. clean up the entries so a url like: preview.reddit.it/302930.jpg?q=monkey is
  //just i.reddit.it/302930.jpg
  filtered = filtered
    .map((item, i) => {
      if (item.indexOf("preview") !== -1) {
        item = item.replace("preview", "i");
        const queryStringStart = item.indexOf("?");
        item = item.slice(0, queryStringStart);
        return item;
      }
      return item;
    });
  return filtered;
};

const getUberHumorMemes = async () => {
  const feed = await getRssObject(config.UBERHUMOR);

  let pages = [];
  feed.items.map(item => {
    if (item.title.includes("Daily Fresh Memes")) {
      pages.push(getCheerioObject(item.link));
    }
  });

  let returnInfo = [];
  await Promise.all(pages).then(response => {
    response.forEach(page => {
      page(".homepagealin div img").each(function(i, el) {
        let link = page(this).attr("data-image");
        returnInfo.push(link);
      });
    });
  });

  returnInfo = returnInfo
    .filter(meme => meme.indexOf("gif") == -1);

  return returnInfo;
};

const getThunderDungeonMemes = async () => {
  const feed = await getRssObject(config.THUNDERDUNGEON_RSS);

  let pages = [];
  feed.items.map(item => {
    if (item.title.includes("Nightcap")) {
      pages.push(getCheerioObject(item.link));
    }
    if (item.title.includes("Workday")) {
      pages.push(getCheerioObject(item.link));
    }
    if(item.title.includes("midday")){
      pages.push(getCheerioObject(item.link));
    }
  });

  let returnInfo = [];
  await Promise.all(pages).then(response => {
    response.forEach(page => {
      page("[data-attachment-id] > img").each((i, el) => {
        el.attribs.src !== "#!loading"
          ? returnInfo.push(el.attribs.src)
          : returnInfo.push(el.attribs["data-asset-async-src-image"]);
      });
    });
  });

  returnInfo = returnInfo
    .filter(meme => meme.indexOf("gif") == -1);
  return returnInfo;
};

const get9GagMemes = async () => {
  const HttpClient = _9gag.HttpClient;
  const Scraper = _9gag.Scraper;
  const Downloader = _9gag.Downloader;
  let returnInfo = [];

  try {
    const scraper = new Scraper(50, "hot", 3);
    const posts = await scraper.scrap();
    posts.forEach(p => {
      if (p.type == "Image") {
        returnInfo.push(p.content);
      }
    });
  } catch (e) {
    console.error(e);
  } finally {
    returnInfo = returnInfo
      .filter(meme => meme.indexOf("gif") == -1);
    return returnInfo;
  }
};

const getChiveMemes = async () =>{
  const feed = await getRssObject(config.THECHIVE_RSS);

  let pages = [];
  feed.items.map(item => {
    if (item.title.includes("Daily")) {
      pages.push(getCheerioObject(item.comments));
    }
  });

  let returnInfo = [];
  let data = {};
  await Promise.all(pages).then(response => {
    response.forEach(page => {
      page("script").each((i, el)=>{
        if(el["firstChild"] != null){
          let innerValue = el["firstChild"]["data"].toString();
          if(innerValue.indexOf("CHIVE_GALLERY_ITEMS") != -1){
            //clean up the json before parsing it
            const equalSignStart = innerValue.indexOf("=");
            innerValue = innerValue.slice((equalSignStart + 1), (innerValue.length -2));
            innerValue = innerValue.replace(/\\n/g, "\\n")
                                   .replace(/\\'/g, "\\'")
                                   .replace(/\\"/g, '\\"')
                                   .replace(/\\&/g, "\\&")
                                   .replace(/\\r/g, "\\r")
                                   .replace(/\\t/g, "\\t")
                                   .replace(/\\b/g, "\\b")
                                   .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            innerValue = innerValue.replace(/[\u0000-\u0019]+/g,"");
            data = JSON.parse(innerValue);
          };
        };
      });
    });
  });

  data.items.forEach( (item, key) =>{
    if(item.html != null){
       const $ = cheerio.load(item.html);
       let link = $(".size-gallery-item-full").attr("src");
       returnInfo.push(link);
    }
  });

  //clean the returnInfo
  returnInfo = returnInfo
    .filter(meme => meme.indexOf("gif") == -1);

    returnInfo = returnInfo
      .map((item, i) => {
        const queryStringStart = item.indexOf("?");
        item = item.slice(0, queryStringStart);
      return item;
    });
  return returnInfo;
}

module.exports = {
  getRedditMemes,
  getUberHumorMemes,
  getThunderDungeonMemes,
  get9GagMemes,
  getChiveMemes
<<<<<<< HEAD
};
=======
};
>>>>>>> master
