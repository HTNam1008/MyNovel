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

// const getStoryContent = async (req, res) => {
//   try {
//     const chapter = req.params.chapter;
//     // console.log('Search query 4:', id);
//     const response = await axios.get(
//       `${API_URL}/v1/chapter/detail/${chapter}`,
//       {
//         headers: {
//           "User-Agent": USER_AGENT,
//         },
//       }
//     );
//     // console.log(response.data);
//     res.json(response.data); // Trả về dữ liệu cho client
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching data" });
//   }
// };

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
