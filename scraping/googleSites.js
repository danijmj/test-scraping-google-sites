// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
const { makeValidJsonKey } = require('../helper/texts')

// const url = 'https://www.google.com.my/travel/hotels/sachsenheim-hotels/entity/ChcIwcmYy7fAwZsWGgsvZy8xdGRrZmx5ehAB/reviews?utm_campaign=sharing&utm_medium=link&utm_source=htls&ved=0CAAQ5JsGahcKEwjgoPLBqJiLAxUAAAAAHQAAAAAQBA&ts=CAEaIAoCGgASGhIUCgcI6Q8QARgdEgcI6Q8QARgeGAEyAhAAKgkKBToDRVVSGgA';
// const url = 'https://www.google.com.my/travel/hotels/sachsenheim-hotels/entity/ChcIwcmYy7fAwZsWGgsvZy8xdGRrZmx5ehAB/reviews';
// const url = 'https://en.wikipedia.org/wiki/Deutsche_Telekom';

/**
 * Method to get the comments from google site
 * @param {*} url url of the resource
 * @returns a json with the comments
 */
class GoogleSites {
  
  constructor() {
    // The timer object
    this.timer = null;
    
  }

  async getCommentsFromUrl (url) {
    
    var allComments = [];

    const browser = await puppeteer.launch({ headless: true });
    console.log('Browser opened: ', url);
    const page = await browser.newPage();
    console.log('newPage opened');

    // Navega a la página de Google Maps del lugar que te interesa
    await page.goto(url);


    console.log('Page opened');

    await page.setViewport({width: 800, height: 550});
    // Espera a que los comentarios se carguen
    await page.waitForSelector('body');
    await console.log('loaded body');


    /* const body = page.locator('body');
    await body.scroll(true); */

    /* setTimeout(async () => {
      const texts = []
      body.map((el) => { texts.push(el.getHTML()) });
      console.log(JSON.stringify(texts));
    }, 5000); */

    // Espera a que los comentarios se carguen
    // await page.waitForSelector('.XrgjBc');
    // const textSelector = await page.waitForSelector('.XrgjBc');
    // let body = await page.$('body');
    // Botón de rechazar todo
    await page.locator('form[jsaction="JIbuQc:fN3dRc(tWT92d)"] .UywwFc-vQzf8d').click();
    console.log('clicked Botón de rechazar todo');

    // We get the current cookies
    // const cookies = await browser.defaultBrowserContext().cookies();

    // comment wrapper
    const cclass = '.Svr5cf.bKhjM'
    // Wait for the comments wrapper
    await page.waitForSelector(cclass);
    await page.waitForSelector('div[jsname="e6qyKf"].roEV7c.C1c7Td.eO2Zfd');

    // Load more comments
    
    let index = 0;
    while ((await this.loadMore(page))) {
      index ++;
      console.log('loaded: ', index);
    }
    allComments = await this.evaluate(page, cclass)
    console.log('allComments size: ', allComments.length)

    /* body = page.locator('body');
    await body.scroll(true); */

    // Extrae los comentarios

    await browser.close();

    return allComments;
  };

  /**
   * Get all comments after do a scroll
   * @param {*} page page object
   * @param {*} cclass css class of the wrapper
   * @returns 
   */
  async evaluate(page, cclass = ".Svr5cf.bKhjM") {
    let resolve;
    const promise = new Promise(res => {
      return (resolve = res);
    });
    const commentsArray = [];
    const mainCommentResultWrapper = await page.$('div[jsname="UcPrk"] div[jsname="nzKQQc"]');
    
    // we have a result in 'lotes'
    const multipleCommentsWrapper = await mainCommentResultWrapper?.$$('div[jsname="Pa5DKe"]');
    console.log('multipleCommentsWrapper', multipleCommentsWrapper?.length);
  
    if (!multipleCommentsWrapper) { return []; }
  
    for (const mainCommentWrapper of multipleCommentsWrapper) {
      const comments = await mainCommentWrapper.$$(cclass);
  
      for (const comment of comments) {
        let textItem, google_review_value, type_stay , review_values, date_review;
  
        // Scraping the comment text
        if (await comment.$('.kVathc.eoY5cb')) {
          textItem = await comment.$('.kVathc.eoY5cb div[jsname="NwoMSd"] .K7oBsc > div > span');
        } else {
          textItem = await comment.$('.STQFb.eoY5cb .K7oBsc > div > span');
        }
        const commentText = await textItem?.evaluate((el) => el.textContent);
  
        // Scraping other items based on their HTML structure
        google_review_value = await comment.$eval('.GDWaad', el => el.textContent) || 0;

        const typeStay = await comment.$('.ThUm5b');
        if (typeStay) {
          type_stay = await typeStay.evaluate(el => el.textContent) || '';
        }

        review_values = await this.extractScoreKeyValue(comment, '.dA5Vzb');

        // Getting the highlighs
        let highlightsJson = await this.extractKeyValue(comment, '.iTppcd');
        /* roomCustomerDescription = await comment.$eval('.Iw4tIc', el => el.textContent) || "";
        roomSecurity = await comment.$eval('.Iw4tIc', el => el.textContent) || "";
        foodAndDrink = await comment.$eval('.Iw4tIc', el => el.textContent) || ""; */
        // Getting the others highlights like room and food
        let highlightsOthersJson = await this.extractKeyValue(comment, '.Iw4tIc');
        date_review = await comment.$eval('.iUtr1.CQYfx', el => el.textContent) || undefined;

        if (commentText) {
          commentsArray.push({
            comment: commentText,
            google_review_value,
            type_stay,
            ...review_values,
            ...highlightsJson,
            ...highlightsOthersJson,
            date_review
          });
        }
      }
    }
  
    console.log('tamaño', commentsArray.length);
    resolve(commentsArray);
    return promise;
  }

  /**
   * Methdo to get multiple items selectors of
   * @param {*} section section from
   * @param {*} selector selector (class or item) to get
   * @returns 
   */
  async extractScoreKeyValue(section, selector) {
    let result = {};
    const elements = await section.$$(selector)
    for (const element of elements) {

      if (!element) return null;
      
      const spanKey = await element.$('span');
      const spanValue = await spanKey.evaluateHandle(el => el.nextElementSibling);
      result = {
        ...result,
        ['score_'+makeValidJsonKey(await spanKey?.evaluate((el) => el.textContent))]: await spanValue?.evaluate((el) => el.textContent)
      }
    }

    return result;

  }

  async extractKeyValue(section, selector) {
    let highlightsJson = {}
    const highlights = (await section.$$(selector))
    if (highlights) {
      for (const highlightKey of highlights) {
        const highlightValue = await highlightKey.evaluateHandle(el => el.nextElementSibling);
        highlightsJson = {
          ...highlightsJson,
          [makeValidJsonKey(await highlightKey?.evaluate((el) => el.textContent))]: await highlightValue?.evaluate((el) => el.textContent)
        }
      }
    }
    return highlightsJson;
  }

  /**
   * Method to load new items with the scroll method
   * @param {*} page 
   * @returns true if new items has been loaded
   */
  async loadMore (page) {
    // const scrollDownItem = '#location'
    /* await page.locator(scrollDownItem).scroll({
      scrollLeft: 0,
      scrollTo: 0,
    }); */

    // loading
    // Wait for the loading item
    try {
      await this.scrollAction(page);
      return true;
    } catch (error) {
      try {
        window.scrollBy(0, -200);
        await this.scrollAction(page);
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Funtion to call the auto scroll and wait to load the new items
   * @param {*} page 
   */
  async scrollAction (page) {
    // Scroll
    await this.autoScroll(page);

    // loading
    // Wait for the loading item
    await page.locator('div[jscontroller="GFartf"]')
      .filter(item => item.getAttribute('data-active') === 'true').setTimeout(1000).wait()
    console.log('loading...');
    // wait for end the loading item
    await page.locator('div[jscontroller="GFartf"]')
      .filter(item => item.getAttribute('data-active') === 'false')
      .wait();
  }

  /**
   * Function to create the auto scroll to the down of the page
   * @param {*} page 
   */
  async autoScroll (page) {
    clearInterval(this.timer);
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 2;
        let lastItem = window.scrollY;
        this.timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          totalHeight += distance;
          window.scrollBy(0, totalHeight);

          if (totalHeight >= scrollHeight || window.scrollY === lastItem) {
            clearInterval(this.timer);
            resolve();
            console.log('cleaned');
          } else {
            lastItem = window.scrollY;
          }
        }, 20);
      });
    });
  }
}

module.exports = { GoogleSites };