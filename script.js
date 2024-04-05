const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAmazonHomepage() {
  try {
    const response = await axios.get('https://www.amazon.in');
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract specific data from the page using selectors
    const title = $('title').text();
    const header = $('#nav-logo').attr('alt');

    // Log the extracted data to the console
    console.log('Title:', title);
    console.log('Header:', header);
  } catch (error) {
    console.error('Error scraping Amazon homepage:', error);
  }
}

scrapeAmazonHomepage();
