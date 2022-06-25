const fs = require("fs");
const fetch = require("node-fetch");
const filePath = "urls.txt";
const existURLsPath = "existurls.txt";
const nonexistURLsPath = "nonexisturls.txt"
const timerCycle = 2000;

const checkUrl = async (url) => {
  const response = await fetch(url, {
    method: "HEAD",
  });
  if (response.ok === true) {
    fs.writeFile(existURLsPath, url, { flag: "a" }, (err) => {});
    console.log("Exist : " + url);
  } else {
    fs.writeFile(nonexistURLsPath, url, { flag: "a" }, (err) => {});
    console.log("Not Exist : " + url);
  }
};

fs.readFile(filePath, async function (error, data) {
  if (error) {
    console.log(error);
    return;
  }
  const dataArray = data.toString().split("\n");
  const arrayLength = dataArray.length;
  let i = 0;
  console.log("Links Fetched and Controlling");

  let id = setInterval(async function () {
    if (i >= arrayLength) {
        clearInterval(id);
        return;
    }
    if (dataArray[i]) {
      await checkUrl(dataArray[i]);
    }
    i++;
  }, timerCycle);
});
