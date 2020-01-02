const puppeteer = require("puppeteer");
module.exports = {
  getClass: async function(className, classNumber, openOnly) {
    if (className == undefined || classNumber == undefined) return;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://css.unlv.nevada.edu/psc/lvcssprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U&TargetFrameName=None",
      { waitUntil: "networkidle2" }
    );

    //class name
    await page.evaluate(() => {
      document.getElementById("SSR_CLSRCH_WRK_SUBJECT$0").focus();
      //there is javascript embedded for onchange, need to focus for script to fire
    });
    await page.keyboard.type(className);

    //class num
    await page.evaluate(() => {
      document.getElementById("SSR_CLSRCH_WRK_CATALOG_NBR$1").focus();
    });
    await page.keyboard.type(classNumber);

    //is open
    if (openOnly === false) {
      //i dont know bro, javascript bruh
      await page.evaluate(() => {
        document.querySelector("#SSR_CLSRCH_WRK_SSR_OPEN_ONLY\\$3").click();
      });
    }

    //class name needs to be looked up and replaced in their script, wait till its done
    await page.evaluate(() => {
      lol();

      function lol() {
        if (document.querySelector("#WAIT_win0").style.display != "none") {
          setTimeout(() => {
            lol();
          }, 500);
        }
      }
    });

    //safe space bruh
    await page.waitFor(2000);
    await page.click("#CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH");

    //more waiting for page to load
    await waitForNetworkIdle(page, 1000, 0);
    try {
      await page.waitForSelector("#win0divSSR_CLSRSLT_WRK_GROUPBOX1", {
        timeout: 5000
      });
    } catch (err) {
      console.log("shit");
    }

    //pull data from fields
    var out = await page.evaluate(() => {
      let out = {};
      var x = document.getElementById("ACE_$ICField48$0");
      if (x == undefined) return;
      let rowsLength = x.rows.length;

      //record count
      out.count = rowsLength / 2;

      let classes = [];
      for (let i = 0; i < rowsLength / 2; i++) {
        let sectionNum = document.getElementById(`MTG_CLASSNAME$${i}`)
          .textContent;
        let room = document.getElementById(`MTG_ROOM$${i}`).textContent;
        let teacher = document.getElementById(`MTG_INSTR$${i}`).textContent;
        let dayTime = document.getElementById(`MTG_DAYTIME$${i}`).textContent;
        let status = document.querySelector(
          `#win0divDERIVED_CLSRCH_SSR_STATUS_LONG\\$${i} > div > img`
        ).alt;

        classes.push({
          sectionNum,
          room,
          teacher,
          dayTime,
          status
        });
      }
      out.classes = classes;
      return out;
    });

    //if class not found 
    if(out == undefined) {
      return {
        className: className + classNumber,
        error: "Class not found"
      }
    }

    out.className = className + classNumber;
    
    await browser.close();
    return out;
  }
};

//HAX
function waitForNetworkIdle(page, timeout, maxInflightRequests = 0) {
  page.on("request", onRequestStarted);
  page.on("requestfinished", onRequestFinished);
  page.on("requestfailed", onRequestFinished);

  let inflight = 0;
  let fulfill;
  let promise = new Promise(x => (fulfill = x));
  let timeoutId = setTimeout(onTimeoutDone, timeout);
  return promise;

  function onTimeoutDone() {
    page.removeListener("request", onRequestStarted);
    page.removeListener("requestfinished", onRequestFinished);
    page.removeListener("requestfailed", onRequestFinished);
    fulfill();
  }

  function onRequestStarted() {
    ++inflight;
    if (inflight > maxInflightRequests) clearTimeout(timeoutId);
  }

  function onRequestFinished() {
    if (inflight === 0) return;
    --inflight;
    if (inflight === maxInflightRequests)
      timeoutId = setTimeout(onTimeoutDone, timeout);
  }
}