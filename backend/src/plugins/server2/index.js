// /src/plugins/truyenfull/index.js
const axios = require("axios");
require("dotenv").config();
const cheerio = require("cheerio");
const API_URL = process.env.API_URL || "https://api.truyenfull.vn";

const USER_AGENT = process.env.USER_AGENT || "Edg/124.0.0.0";
const BASE_URL = 'https://truyen.tangthuvien.vn';

const fetchHTML = async (url) => {
  try {
      const { data } = await axios.get(url, {
          headers: {
              'User-Agent': process.env.USER_AGENT || 'Edg/124.0.0.0'
          }
      });
      return data;
  } catch (error) {
      console.error('Error fetching HTML:', error);
      throw error;
  }
}
// Khi nguoi dung bam vao mot chuong, thuc hien ham nay
const getStoryContent = async (req, res) => {
  try {
    const numberChapter= req.params.numChapter;
    const _title= req.params.title;
    const url = `${BASE_URL}/doc-truyen/${_title}/${numberChapter}`;
    console.log('URL:', url)
    const html = await fetchHTML(url);

    const $ = cheerio.load(html);

    let header = $('.chapter.col-xs-12:first');
    let content = $('.chapter-c-content').find('.box-chap:first').text();
    let title = header.find('.truyen-title').text();
    let chapterTitle = header.find('h2').text();
    let date = header.find('p:eq(1)').text();

    // Tạo đối tượng JSON
    const responseData = {
      data : {
      title: title,
      chapter: chapterTitle,
      date: date,
      content: content
      }
    };

    // Trả về mảng chứa đối tượng JSON
    res.json(responseData);

  } catch (error) {
    // console.error(error);
    const data = {
      data : {
      content: "Error fetching data"
      }
    };
    res.status(500).json(data);
  }
};


const searchStory = async (req, res) => {
  try {
    const title = req.params.title;
    // console.log('Search query 4:', title);
    const response = await axios.get(`${API_URL}/v1/tim-kiem?title=${title}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    // console.log(response.data);
    res.json(response.data); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getStoryUpdate = async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/story/index?type=story_update`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );
    // console.log(response.data);
    res.json(response.data); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getStoryNew = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/v1/story/all?type=story_new`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    // console.log(response.data);
    res.json(response.data); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getBookInfo = async () => {
  const url = `${BASE_URL}/tong-hop`;
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  const categoryInfo = await getCategoryInfo(url);
  const urls = [];

  categoryInfo.forEach((category) => {
      let url_new = `${BASE_URL}/tong-hop?ctg=${category.categoryValue}`;
      urls.push(url_new);
  });

  console.log('Các URL:');
  urls.forEach((url) => {
      console.log(url);
  });
  console.log(`Total URLs: ${urls.length}`);

  const books = [];

  for (let i = 0; i < urls.length; i++) {
      try {
          const booksForCategory = await getBooksInfoForCategory(urls[i]);
          const lastPageElement = $('.main-content-wrap .pagination li').last().prev();
          const secondLastPageNumber = parseInt($(lastPageElement).find('a').text());
          console.log(`Số trang: ${secondLastPageNumber}`);
          books.push(...booksForCategory);
      } catch (err) {
          console.error(`Error fetching books for URL ${urls[i]}: `, err);
      }
  }

  console.log('Đã lấy thông tin sách xong!');
  return books;
};

const getBooksInfoForCategory = async (url) => {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  const booksForCategory = [];

  $('.main-content-wrap .rank-view-list li').each((index, element) => {
      let title, authorName, bookUrl, imageUrl, intro, genre, status, chapters;
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      status = $(element).find('.book-mid-info .author span:first').text().trim();
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();

      booksForCategory.push({
          title,
          authorName,
          genre,
          status,
          chapters,
          bookUrl,
          imageUrl,
          intro,
      });

      //   console.log(`Title: ${title}`);
      //   console.log(`Author: ${authorName}`);
      //   console.log(`URL: ${bookUrl}`);
      //   console.log(`Image: ${imageUrl}`);
      //   console.log(`Intro: ${intro}`);
      //   console.log('---');
  });

  return booksForCategory;
};
const getStoryDetail = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('Search query 4:', id);
    const response = await axios.get(`${API_URL}/v1/story/detail/${id}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    // console.log(response.data);
    res.json(response.data); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getStoryChapters = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Search query 4:", id);
    const response = await axios.get(
      `${API_URL}/v1/story/detail/${id}/chapters`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );
    // console.log(response.data);
    res.json(response.data); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  name: "server2",
    getStoryContent,
    searchStory,
    getStoryUpdate,
    getStoryNew,
    getStoryDetail,
    getStoryChapters,
};
