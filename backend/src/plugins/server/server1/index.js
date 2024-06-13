// /src/plugins/truyenfull/index.js
const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "https://api.truyenfull.vn";
const USER_AGENT = process.env.USER_AGENT || "Edg/124.0.0.0";

const getStoryContent = async (req, res) => {
  try {
    const chapter = req.params.chapterId;
    // console.log('Search query 4:', id);
    const response = await axios.get(
      `${API_URL}/v1/chapter/detail/${chapter}`,
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
    // return response.data;
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

const getStoryDownload = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('Search query 4:', id);
    const response = await axios.get(`${API_URL}/v1/story/detail/${id}/download`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    // console.log(response.data);
    // res.json(response.data); // Trả về dữ liệu cho client
    return response.data;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
// const fetchStoryDetail = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/v1/story/detail/${id}`, {
//       headers: {
//         "User-Agent": USER_AGENT,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching story detail:', error);
//     throw error;
//   }
// };

module.exports = {
  name: "server1",
    getStoryContent,
    searchStory,
    getStoryUpdate,
    getStoryNew,
    getStoryDetail,
    getStoryChapters,
    getStoryDownload,
    // fetchStoryDetail,
};
