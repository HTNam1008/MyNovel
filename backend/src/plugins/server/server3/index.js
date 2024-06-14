// /src/plugins/truyenfull/index.js
const axios = require("axios");
require("dotenv").config();
const cheerio = require("cheerio");

axios.create({
  maxConnections: 100,
  timeout: 30000,
});

const BASE_URL = "https://truyencv.vn";

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": process.env.USER_AGENT || "Edg/124.0.0.0",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    throw error;
  }
};

const upperCase = (str) => {
  return str
    .replace("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
    message = "Vừa đăng";
  }

  return message;
};

//xong
const searchStory = async (req, res) => {
  try {
    const _title = req.params.title;
    const url = `${BASE_URL}/tim-kiem?tukhoa=${_title}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    $(".grid.grid-cols-12").each((index, element) => {
      let imageUrl, title, bookUrl, titleInUrl, authorName, totalChapter;
      //console.log($(element).attr('class'));
      imageUrl = $(element).find(".col-span-3 a img").attr("src");
      title = $(element).find(".col-span-9 .w-full .flex:first h3 a").text();
      bookUrl = $(element)
        .find(" .col-span-9 .w-full .flex:first h3 a")
        .attr("href");
      titleInUrl = BASE_URL + bookUrl.substring(bookUrl.lastIndexOf("/"));
      authorName = $(element)
        .find(".col-span-9 .w-full .flex:eq(1) span:last")
        .text();
      totalChapter = $(element)
        .find('.col-span-9 .w-full a[rel="nofollow"]')
        .text();
      const chapterNumber = (() => {
        const match = totalChapter.match(/\d+/);
        return match ? parseInt(match[0]) : null;
      })();

      bookResults.push({
        book: {
          title: title,
          titleUrl: titleInUrl,
          image: imageUrl,
          author: authorName,
          totalChapter: chapterNumber,
        },
      });
    });
    // console.log(bookResults);
    res.json(bookResults); // Trả về dữ liệu cho client
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

//xong
const getStoryContent = async (req, res) => {
  try {
    const numberChapter = req.params.numChapter;
    const _title = req.params.title;
    const url = `${BASE_URL}/${_title}/${numberChapter}`;
    //const url = `${BASE_URL}/chi-ton-tu-la/chuong-1`;
    console.log("URL:", url);

    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const storyTitle = $("div.w-full > a[title]").attr("title");
    const chapterTitle = $("h2 a.capitalize").text();
    const chapterLink = BASE_URL + $("h2 a.capitalize").attr("href");
    const chapterContent = $("#content-chapter p")
      .map(function () {
        return $(this).text();
      })
      .get()
      .join("\n");

    // Tạo đối tượng JSON
    const responseData = {
      data: {
        story_name: storyTitle,
        chapter_name: chapterTitle,
        chapterUrl: chapterLink,
        content: chapterContent,
      },
    };
    //console.log(JSON.stringify(responseData, null, 2));
    res.json(responseData);
  } catch (error) {
    console.error(error);
    const data = {
      data: {
        content: "Error fetching data",
      },
    };
    res.status(500).json(data);
  }
};
//xong
const getStoryDetail = async (req, res) => {
  try {
    const storyName = req.params.title;
    const url = `${BASE_URL}/${storyName}`;
    //const url = `${BASE_URL}/chi-ton-tu-la`;

    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const capitalizeFirstLetter = (str) => {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    const title = $("h3.uppercase.text-center.font-bold.text-xl.px-4.pb-2.mb-1")
      .text()
      .trim();
    const authorName = $('a[itemprop="url"] span[itemprop="name"]')
      .text()
      .trim();

    const imageUrl = $(".book-images img").attr("src");
    const genres = $('a.story-category[itemprop="genre"]')
      .map((i, el) => capitalizeFirstLetter($(el).text().trim()))
      .get()
      .join(", ");

    const status = $(".text-base").find("span").eq(1).text().trim();

    const chapters = $(".text-base").find("span").eq(2).text().trim();
    const numChapters = parseInt(chapters.match(/\d+/)[0]);

    const intro = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join("\n");

    // console.log(intro)
    const responseData = {
      title: title,
      image: imageUrl,
      total_chapters: numChapters,
      author: authorName,
      categories: genres,
      status: status,
      //time: getTimeDifference(time),
      description: intro,
    };

    res.json({ data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

// xong
const getStoryUpdate = async (req, res) => {
  try {
    const { page } = req.query;
    page < 1 ? 1 : page;
    const url = `${BASE_URL}/danh-sach/truyen-moi/trang-${page}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const bookResults = [];

    let title, authorName, bookUrl, imageUrl, titleInUrl;
    $(".grid.grid-cols-12").each((index, element) => {
      imageUrl = $(element).find(".col-span-3 a img").attr("src");
      title = $(element).find(".col-span-9 .w-full .flex:first h3 a").text();
      bookUrl = $(element)
        .find(".col-span-9 .w-full .flex:first h3 a")
        .attr("href");
      titleInUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
      authorName = $(element)
        .find(".col-span-9 .w-full .flex:eq(1) span:last")
        .text();
      totalChapter = $(element)
        .find('.col-span-9 .w-full a[rel="nofollow"]')
        .text();
      const chapterNumber = (() => {
        const match = totalChapter.match(/\d+/);
        return match ? parseInt(match[0]) : null;
      })();

      bookResults.push({
        title: title,
        titleUrl: titleInUrl,
        image: imageUrl,
        author: authorName,
        total_chapters: chapterNumber,
      });
    });

    res.json({ data: bookResults }); // Trả về dữ liệu cho client
    // console.log(bookResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

// xong
const getStoryNew = async (req, res) => {
  try {
    const url = `${BASE_URL}/danh-sach/truyen-hot`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title, authorName, bookUrl, imageUrl, titleInUrl;
    $(".grid.grid-cols-12").each((index, element) => {
      imageUrl = $(element).find(".col-span-3 a img").attr("src");
      title = $(element).find(".col-span-9 .w-full .flex:first h3 a").text();
      bookUrl = $(element)
        .find(".col-span-9 .w-full .flex:first h3 a")
        .attr("href");
      titleInUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
      authorName = $(element)
        .find(".col-span-9 .w-full .flex:eq(1) span:last")
        .text();
      totalChapter = $(element)
        .find('.col-span-9 .w-full a[rel="nofollow"]')
        .text();
      const chapterNumber = (() => {
        const match = totalChapter.match(/\d+/);
        return match ? parseInt(match[0]) : null;
      })();

      bookResults.push({
        title: title,
        titleUrl: titleInUrl,
        image: imageUrl,
        author: authorName,
        total_chapters: chapterNumber,
        time: "Vừa đăng",
      });
    });
    // console.log(bookResults);
    res.json({ data: bookResults }); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error fetching data" });
  }
};
//xong
const getStoryFinish = async (req, res) => {
  try {
    const url = `${BASE_URL}/danh-sach/truyen-full`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const bookResults = [];

    let title,
      authorName,
      bookUrl,
      imageUrl,
      intro,
      genre,
      isFull,
      chapters,
      time,
      titleInUrl;
    let count = 0;
    $(".grid.grid-cols-12").each((index, element) => {
      imageUrl = $(element).find(".col-span-3 a img").attr("src");
      title = $(element).find(".col-span-9 .w-full .flex:first h3 a").text();
      bookUrl = $(element)
        .find(".col-span-9 .w-full .flex:first h3 a")
        .attr("href");
      titleInUrl = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
      authorName = $(element)
        .find(".col-span-9 .w-full .flex:eq(1) span:last")
        .text();
      let regexResult = $(element)
        .find(".col-span-9 .w-full a.change-color")
        .text()
        .match(/\d+/g);
      chapters = regexResult == null ? "Đang cập nhật" : regexResult[0];

      bookResults.push({
        data: {
          title: title,
          titleUrl: titleInUrl,
          image: imageUrl,
          author: authorName,
          total_chapters: chapters,
        },
      });
    });
    // console.log(bookResults);
    res.json(bookResults); // Trả về dữ liệu cho client
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getNumChapter = async (title) => {
  try {
    const url = `${BASE_URL}/${title}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const chapters = $(".text-base .flex:eq(3) .capitalize").text();
    const numChapters = parseInt(chapters.match(/\d+/)[0]);

    return numChapters;
  } catch (error) {
    console.error(error);
    return {
      content: "Error fetching data",
    };
  }
};

// const getNumChapter = async (req, res) => {
//   try {
//     const storyName = req.params.title; 
//     const url = `${BASE_URL}/${storyName}`;
//     const html = await fetchHTML(url);
//     const $ = cheerio.load(html);

//     const regex = /\d+/g;

//     // Tìm tất cả các liên kết chương trong nội dung
//     const chapters = $('.catalog-content-wrap .volume a').map((i, element) => {
//       const text = $(element).text();
//       const match = text.match(regex);
//       return match ? match[0] : null;
//     }).get();

//     // Lọc ra các giá trị null và chuyển đổi sang số nguyên
//     const chapterNumbers = chapters.filter(num => num !== null).map(num => parseInt(num, 10));

//     // Tìm số chương lớn nhất
//     const totalChapters = Math.max(...chapterNumbers);
//     console.log("totalChapters: ",totalChapters);

//     return totalChapters
//   } catch (error) {
//     console.error(error);
//   }
// };

const _getStoryContent = async (_title, numberChapter) => {
  try {
    let _numberChapter = 'chuong-'+numberChapter;

    const url = `${BASE_URL}/${_title}/${_numberChapter}`;
    //const url = `${BASE_URL}/chi-ton-tu-la/chuong-1`;
    console.log("URL:", url);

    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const storyTitle = $("div.w-full > a[title]").attr("title");
    const chapterTitle = $("h2 a.capitalize").text();
    const chapterContent = $("#content-chapter p")
      .map(function () {
        return $(this).text();
      })
      .get()
      .join("\n");

    // Tạo đối tượng JSON
    const responseData = {
        story_name: storyTitle,
        chapter_name: chapterTitle,
        content: chapterContent,
    };
    //console.log(JSON.stringify(responseData, null, 2));
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
    const totalChapters = await getNumChapter(_title);
    // console.log("total chapter: ",totalChapters)
    let allChapters = [];
    for (let i = 1; i <= totalChapters; i++) {
      const chapterData = await _getStoryContent(_title, i);
      allChapters.push(chapterData);
    }
    const storyData = {
      data: allChapters,
    };
    return storyData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching or exporting story data" });
  }
};

// const _getChaptersInPage = async (i, title) => {
//   try {
//     const url = `${BASE_URL}/${title}?page=${i}/#danh-sach-chuong`;
//     const html = await fetchHTML(url);
//     const $ = cheerio.load(html);
//     const chapters = [];

//     let chapter, chapterNum;
//     $("#danh-sach-chuong .col-span-6 li.flex.items-center").each(
//       (index, element) => {
//         chapter = upperCase($(element).find("a").text());
//         chapterNum = chapter.match(/\d+/)[0];
//         chapters.push({
//           id: "chuong-" + chapterNum,
//           title: chapter,
//         });
//       }
//     );
//     console.log(chapterNum);

//     return chapters;
//   } catch (error) {
//     console.error(error);
//     return {
//       content: "Error fetching data",
//     };
//   }
// };


const getStoryChapters = async (req, res) => {
  try {
    const storyName = req.params.title;
    //const storyName = 'tho-san-my-thuc';
    const allChapters = [];
    const totalChapters = await getNumChapter(storyName);
    const totalPages = (totalChapters - 1) / 50 + 1;

    let chapterNum = 1;
    for (let i = 1; i <= totalPages; i++) {
      const url = `${BASE_URL}/${storyName}?page=${i}/#danh-sach-chuong`;
      const html = await fetchHTML(url);
      const $ = cheerio.load(html);
      const chaptersInPage = [];

      let chapter;
      $("#danh-sach-chuong .col-span-6 li.flex.items-center").each(
        (index, element) => {
          chapter = upperCase($(element).find("a").text());
          chaptersInPage.push({
            id: "content",
            _title: chapter,
            title: "chuong-" + chapterNum,
          });
          chapterNum++;
        }
      );
      allChapters.push(...chaptersInPage);
    }

    const storyData = {
      data: allChapters,
    };

    //console.log(storyData);
    res.json(storyData); // Trả về dữ liệu cho client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  name: "server3",
  getStoryContent,
  searchStory,
  getStoryUpdate,
  getStoryNew,
  getStoryFinish,
  getStoryDetail,
  getNumChapter,
  getStoryDownload,
  getStoryChapters,
};
