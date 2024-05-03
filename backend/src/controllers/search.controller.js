'use strict'
const axios = require('axios');
require('dotenv').config();


const API_URL=process.env.API_URL || 'https://api.truyenfull.vn'
const USER_AGENT=process.env.USER_AGENT || 'Edg/124.0.0.0'


exports.search = async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/v1/tim-kiem`, {
        headers: {
          'User-Agent': USER_AGENT
        }
      });
      console.log(response.data);
      res.json(response.data); // Trả về dữ liệu cho client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  };