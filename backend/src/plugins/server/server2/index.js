// /src/plugins/truyenfull/index.js
const axios = require("axios");
require("dotenv").config();
const cheerio = require("cheerio");

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
    const numberChapter = req.params.numChapter;
    const _title = req.params.title;


    const url = `${BASE_URL}/doc-truyen/${_title}/${numberChapter}`;
    console.log('URL:', url);
    const html = await fetchHTML(url);

    const $ = cheerio.load(html);
    let header = $('.chapter.col-xs-12:first');
    let content = $('.chapter-c-content').find('.box-chap:first').html();
    let title = header.find('.truyen-title').text();
    let chapterTitle = header.find('h2').text()
    let date = header.find('p:eq(1)').text();

    // Tạo đối tượng JSON
    const responseData = {
      data: {
        story_name: title,
        chapter_name: chapterTitle,
        content: content
      }
    };

    // Trả về mảng chứa đối tượng JSON
    res.json(responseData);
    // console.log(responseData);
  } catch (error) {
    console.error(error);
    const data = {
    };
    res.status(500).json(data);
  }
};
const _getStoryContent = async (title, numberChapter) => {
  try {
    let _numberChapter = 'chuong-'+numberChapter;
    const url = `${BASE_URL}/doc-truyen/${title}/${_numberChapter}`;
    console.log('URL:', url);
    const html = await fetchHTML(url);

    const $ = cheerio.load(html);

    let header = $('.chapter.col-xs-12:first');
    let content = $('.chapter-c-content').find('.box-chap:first').html();
    let storyTitle = header.find('.truyen-title').text();
    let chapterTitle = header.find('h2').text();

    // Tạo đối tượng JSON
    const responseData = {
      story_name: storyTitle,
      chapter_name: chapterTitle,
      content: content
    };

    return responseData;
  } catch (error) {
    console.error(error);
    return {
      content: "Error fetching data"
    };
  }
};



const getStoryDownload = async (req, res) => {
  try {
    const _title = req.params.title;
    const totalChapters = await getNumChapter(req, res);

    let allChapters = [];
    for (let i = 1; i <= totalChapters; i++) {
      const chapterData = await _getStoryContent(_title, i);
      allChapters.push(chapterData);
    }
    const storyData = {
      data: allChapters
    }
    return storyData
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching or exporting story data" });
  }
};

const getSearchStory = async (req, res) => {
  try {
    const _title = req.params.title;
    const {page} = req.query;
    const url = `${BASE_URL}/ket-qua-tim-kiem?term=${_title}&page=${page}`;
    console.log("URL: ",url)
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title, authorName, bookUrl, imageUrl, intro, genre, is_full, chapters;
    $('.main-content-wrap .rank-view-list li').each((index, element) => {
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      is_full = ($(element).find('.book-mid-info .author span:first').text().trim() == "Đang ra") ? false : true;
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();

      bookResults.push({
        
          title: title,
          author: authorName,
          image: imageUrl,
          categories: genre,
          total_chapters: chapters,
          is_full: is_full
      });
    });
    res.json({data: bookResults}); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    //res.status(500).json({ error: "Error fetching data" });
  }
};

const getTimeDifference = (pastTime) => {
  const now = new Date();
  const past = new Date(pastTime);
  const difference = now.getTime() - past.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Build the message based on the time difference
  let message;
  if (years > 0) {
    message += `${years} năm trước`;
  } else if (months > 0) {
    message += `${months} tháng trước`;
  } else if (weeks > 0) {
    message += `${weeks} tháng trước`;
  } else if (days > 0) {
    message = `${days} ngày trước`;
  } else if (hours > 0) {
    message = `${hours} giờ trước`;
  } else if (minutes > 0) {
    message = `${minutes} phút trước`;
  } else {
    message = 'Vừa đăng';
  }

  return message;
}

const getStoryUpdate = async (req, res) => {
  try {
    const { page } = req.query;
    page ? page : 1;
    const url = `${BASE_URL}/tong-hop?page=${page}`;
    console.log("URL: ",url)
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];
    
    let title, authorName, bookUrl, imageUrl, intro, genre, is_full, chapters, time,titleUrl;
    $('.main-content-wrap .rank-view-list li').each((index, element) => {
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      is_full = ($(element).find('.book-mid-info .author span:first').text().trim() == "Đang ra") ? false : true;
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      time = $(element).find('.book-mid-info .update span').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      titleUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);

      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();

      bookResults.push({
          title: title,
          titleUrl: titleUrl,
          image: imageUrl,
          author: authorName,
          is_full: is_full,
          total_chapters: chapters,
          time: getTimeDifference(time),
          categories: genre
      });
    });

    res.json({data: bookResults}); // Trả về dữ liệu cho client
    // console.log("update: ",bookResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getStoryNew = async (req, res) => {
  try {
    const url = `${BASE_URL}/tong-hop?ord=new`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title, authorName, bookUrl,is_full, imageUrl, intro, genre, status, chapters, time,titleUrl;

    $('.main-content-wrap .rank-view-list li').each((index, element) => {
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      is_full = ($(element).find('.book-mid-info .author span:first').text().trim() == "Đang ra") ? false : true;
      status = $(element).find('.book-mid-info .author span:first').text().trim();
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      time = $(element).find('.book-mid-info .update span').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      titleUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);

      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();

      bookResults.push({
       
          title: title,
          titleUrl: titleUrl,
          image: imageUrl,
          author: authorName,
          is_full: is_full,
          total_chapters: chapters,
          time: getTimeDifference(time),
          categories: genre
        
      });
    });

    res.json({data: bookResults}); // Trả về dữ liệu cho client
    // console.log("new: ",bookResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const getListStory = async (req, res) => {
  try {
    const {cate, type, page,index} = req.query;
    let rank;
    let fns;

    if (type=== "truyen_hot") {
      rank = "vw";
    } else if (type=== "truyen_full") {
      fns='ht'
    } else {
      rank="",
      fns=""
    }


    const url = `${BASE_URL}/tong-hop?fns=${fns}&rank=${rank}&page=${page}&ctg=${index}`;

    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title, authorName, bookUrl,is_full, imageUrl, intro, genre, status, chapters, time,titleUrl;

    $('.main-content-wrap .rank-view-list li').each((index, element) => {
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      is_full = ($(element).find('.book-mid-info .author span:first').text().trim() == "Đang ra") ? false : true;
      status = $(element).find('.book-mid-info .author span:first').text().trim();
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      time = $(element).find('.book-mid-info .update span').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      titleUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);

      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();

      bookResults.push({
       
          title: title,
          titleUrl: titleUrl,
          image: imageUrl,
          author: authorName,
          is_full: is_full,
          total_chapters: chapters,
          time: getTimeDifference(time),
          categories: genre
        
      });
    });

    res.json({data: bookResults}); // Trả về dữ liệu cho client
    // console.log("new: ",bookResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};


const getStoryFinish = async (req, res) => {
  try {
    const url = `${BASE_URL}/tong-hop?fns=ht`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title, authorName, bookUrl, imageUrl, intro, genre, status, chapters, time,titleUrl;
    $('.main-content-wrap .rank-view-list li').each((index, element) => {
      title = $(element).find('.book-mid-info h4').text().trim();
      authorName = $(element).find('.book-mid-info .author .name').text().trim();
      genre = $(element).find('.author a[href*="/the-loai/"]').text().trim();
      status = $(element).find('.book-mid-info .author span:first').text().trim();
      chapters = $(element).find('.book-mid-info .author .KIBoOgno').text().trim();
      time = $(element).find('.book-mid-info .update span').text().trim();
      bookUrl = $(element).find('.book-mid-info h4 a').attr('href');
      imageUrl = $(element).find('.book-img-box img.lazy').attr('src');
      intro = $(element).find('.book-mid-info .intro').text().trim();
      titleUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
      

      bookResults.push({
        book: {
          title: title,
          titleUrl: titleUrl,
          image: imageUrl,
          author: authorName,
          is_full: is_full,
          total_chapters: chapters,
          time: getTimeDifference(time),
          categories: genre
        }
      });
    });

    res.json(bookResults); // Trả về dữ liệu cho client
    //console.log(bookResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getStoryDetail = async (req, res) => {
  try {
    const storyName = req.params.title; 
    const url = `${BASE_URL}/doc-truyen/${storyName}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const regex = /\d+/g;
    const bookInfo = $('.book-information');

    let imageUrl = bookInfo.find('.book-img img').attr('src');
    let title = bookInfo.find('.book-info ').find('h1').text();
    let authorName = bookInfo.find('.tag a:first').text();
    let status = bookInfo.find('.tag span').text();
    let genre = bookInfo.find('.tag a:last').text();
    let chapters = await getNumChapter(req, res);
    let intro = $('.book-info-detail .book-intro p').text();
    let timeStr = $('.catalog-content-wrap .volume h3 .count').text();
    let time = timeStr.substring(timeStr.indexOf(" ") + 1);

    const bookResult = {
        title: title,
        image: imageUrl,
        total_chapters: chapters,
        author: authorName,
        categories: genre,
        status: status,
        time: getTimeDifference(time),
        description: intro
    };

    //console.log(bookResult);
    res.json({data:bookResult}); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const getNumChapter = async (req, res) => {
  try {
    const storyName = req.params.title; 
    const url = `${BASE_URL}/doc-truyen/${storyName}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const regex = /\d+/g;

    // Tìm tất cả các liên kết chương trong nội dung
    const chapters = $('.catalog-content-wrap .volume a').map((i, element) => {
      const text = $(element).text();
      const match = text.match(regex);
      return match ? match[0] : null;
    }).get();

    // Lọc ra các giá trị null và chuyển đổi sang số nguyên
    const chapterNumbers = chapters.filter(num => num !== null).map(num => parseInt(num, 10));

    // Tìm số chương lớn nhất
    const totalChapters = Math.max(...chapterNumbers);
    console.log("totalChapters: ",totalChapters);

    return totalChapters
  } catch (error) {
    console.error(error);
  }
};


const getStoryChapters = async (req, res) => {
  try {
    const storyName = req.params.title; 
    const url = `${BASE_URL}/doc-truyen/${storyName}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const chapterTitles = [];

    const regex = /\d+/g;
    let chapters = parseInt($('#j-bookCatalogPage').text().match(regex)[0]);
    for (let i = 1; i <= chapters; i++) {
      chapterTitles.push({
        id: 'content',
        title: "Chương " + i.toString()
      });
    }

    //console.log(chapterTitles);
    res.json({data:chapterTitles}); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  name: "server2",
  getStoryContent,
  getSearchStory,
  getListStory,
  getStoryUpdate,
  getStoryNew,
  getStoryFinish,
  getStoryDetail,
  getStoryChapters,
  getStoryDownload,
};