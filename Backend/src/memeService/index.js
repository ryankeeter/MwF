const {
<<<<<<< HEAD
  getRedditMemes,
  getUberHumorMemes,
  getThunderDungeonMemes,
  get9GagMemes,
  getChiveMemes
} = require("./memeLib");

const uploadMemes = require("./uploaderLib");

const go = async () => {
  let memes = [];
  let redditMemes = await getRedditMemes();
  let uberMemes = await getUberHumorMemes();
  let TDMemes = await getThunderDungeonMemes();
  let _9gagMemes = await get9GagMemes();
  let chiveMemes = await getChiveMemes();

  redditMemes.forEach(el => memes.push(el));
  uberMemes.forEach(el => memes.push(el));
  TDMemes.forEach(el => memes.push(el));
  _9gagMemes.forEach(el => memes.push(el));
  chiveMemes.forEach(el => memes.push(el));

  console.table(memes);
  return await uploadMemes(memes);
}

//go().then(result => console.table(result));

=======
    getRedditMemes,
    getUberHumorMemes,
    getThunderDungeonMemes,
    get9GagMemes,
    getChiveMemes
  } = require("./memeLib");

  const uploadMemes = require("./uploaderLib");

  const go = async () => {
    let memes = [];
    let redditMemes = await getRedditMemes();
    let uberMemes = await getUberHumorMemes();
    let TDMemes = await getThunderDungeonMemes();
    let _9gagMemes = await get9GagMemes();
    let chiveMemes = await getChiveMemes();

    redditMemes.forEach(el => memes.push(el));
    uberMemes.forEach(el => memes.push(el));
    TDMemes.forEach(el => memes.push(el));
    _9gagMemes.forEach(el => memes.push(el));
    chiveMemes.forEach(el => memes.push(el));

    console.table(memes);
    return await uploadMemes(memes);
  }

  //go().then(result => console.table(result));
>>>>>>> master
