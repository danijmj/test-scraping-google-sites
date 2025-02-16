import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

const url = 'https://www.google.com.my/travel/hotels/sachsenheim-hotels/entity/ChcIwcmYy7fAwZsWGgsvZy8xdGRrZmx5ehAB/reviews?utm_campaign=sharing&utm_medium=link&utm_source=htls&ved=0CAAQ5JsGahcKEwjgoPLBqJiLAxUAAAAAHQAAAAAQBA&ts=CAEaIAoCGgASGhIUCgcI6Q8QARgdEgcI6Q8QARgeGAEyAhAAKgkKBToDRVVSGgA';
// const url = 'https://www.google.com.my/travel/hotels/sachsenheim-hotels/entity/ChcIwcmYy7fAwZsWGgsvZy8xdGRrZmx5ehAB/reviews';
// const url = 'https://en.wikipedia.org/wiki/Deutsche_Telekom';

var allComments: string[] = [];
var timer: NodeJS.Timeout;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  console.log('Browser opened');
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

  // Load more comments
  
  let index = 0;
  while ((await loadMore(page))) {
    index ++;
    console.log('loaded: ', index);
  }
  allComments = await evaluate(page, cclass)
  console.log('allComments size: ', allComments.length)
  console.log('allComments', allComments);

  /* body = page.locator('body');
  await body.scroll(true); */

  // Extrae los comentarios

  await browser.close();
})();

/**
 * Get all comments after do a scroll
 * @param {*} page page object
 * @param {*} cclass css class of the wrapper
 * @returns 
 */
async function evaluate (page: Page, cclass = ".Svr5cf.bKhjM"): Promise<string[]> {

  let resolve!: (node: string[]) => void;
  const promise: Promise<string[]> = new Promise(res => {
    return (resolve = res);
  });
  const commentsArray: string[] = [];
  const mainCommentResultWrapper = await page.$('div[jsname="UcPrk"] div[jsname="nzKQQc"]');
  // we have a result in 'lotes'
  const multipleCommentsWrapper = await mainCommentResultWrapper?.$$('div[jsname="Pa5DKe"]');
  console.log('multipleCommentsWrapper', multipleCommentsWrapper?.length)

  if (! multipleCommentsWrapper) {return [];}

  for (const mainCommentWrapper of multipleCommentsWrapper) {

    const comments = await mainCommentWrapper.$$(cclass);

    for (const comment of comments) {

      let textItem;
      if ( await comment.$('.kVathc.eoY5cb')) {
        textItem = await comment.$('.kVathc.eoY5cb div[jsname="NwoMSd"] .K7oBsc > div > span');
      } else {
        textItem = await comment.$('.STQFb.eoY5cb .K7oBsc > div > span');
      }
      /* textItem.then( async (el) => {
        if (el) {
          commentsArray.push(await el?.evaluate(el => el.textContent))
        } else {
          // Nothing
        }
      }) */
        commentsArray.push(await textItem?.evaluate((el: { textContent: any; }) => el.textContent))
      // console.log(await textItem?.evaluate(el => el.textContent))
      
      // console.log((await pureText?.textContent))
    };
  }

  console.log('tamaño', commentsArray.length)
  resolve(commentsArray);
  return promise;
 
  // console.log(comments);
}

/**
 * Method to load new items with the scroll method
 * @param {*} page 
 * @returns true if new items has been loaded
 */
async function loadMore(page: Page) {
  // const scrollDownItem = '#location'
  /* await page.locator(scrollDownItem).scroll({
    scrollLeft: 0,
    scrollTo: 0,
  }); */

  // loading
  // Wait for the loading item
  try {
    await scrollAction(page);
    return true;
  } catch (error) {
    try {
      window.scrollBy(0, -200);
      await scrollAction(page);
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
async function scrollAction(page: Page) {
  // Scroll
  await autoScroll(page);

  // loading
  // Wait for the loading item
  await page.locator('div[jscontroller="GFartf"]')
    .filter(item => item.getAttribute('data-active') === 'true').setTimeout(300).wait()
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
async function autoScroll(page: Page): Promise<void> {
  clearInterval(timer);
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 2;
      let lastItem = window.scrollY;
      timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        totalHeight += distance;
        window.scrollBy(0, totalHeight);

        if (totalHeight >= scrollHeight || window.scrollY === lastItem) {
          clearInterval(timer);
          resolve();
          console.log('cleaned');
        } else {
          lastItem = window.scrollY;
        }
      }, 20);
    });
  });
}