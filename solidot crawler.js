var configs = {
    domains: ["solidot.org"],// 网站域名，设置域名后只处理这些域名下的网页
    scanUrls: ["http://www.solidot.org/"],// 入口页链接，分别从这些链接开始爬取
    contentUrlRegexes: [
        /https:\/\/www\.leiphone\.com\/news\/\d+\/.+\.html/,
      /http:\/\/tieba.baidu.com\/p\/1613450337/,
      /http:\/\/ifeve.com\/*\//,
      /http:\/\/www\.solidot\.org\/story\?sid=\d+/
    ],// 内容页url的正则，符合这些正则的页面会被当作内容页处理
    helperUrlRegexes: [
        /https:\/\/www\.leiphone\.com\/search\?s=vr&site=article(&page=\d+)?/,
      /http:\/\/tieba\.baidu\.com\/f?kw=java&ie=utf-8&pn=50/,
      /http:\/\/ifeve\.com\/page\/\d+\//,
      /http:\/\/www\.solidot\.org\/\?issue=\d+/
    ],// 列表页url的正则，符合这些正则的页面会被当作列表页处理
    fields: [
      {
        name: "title",
        selector : "//H2",
        required : true,
      }
      
//         {
//             // 抽取内容页的文章标题
//             name: "article_title",
//             selector: "//h1[contains(@class,'headTit')]",
//             required: true  // required为true表示该项数据不能为空
//         },
//         {
//             // 抽取内容页的文章内容
//             name: "article_content",
//             selector: "//div[contains(@class,'lph-article-comView')]",
//             required: true
//         },
//         {
//             // 抽取内容页的文章发布日期
//             name: "article_publish_time",
//             selector: "//td[contains(@class,'time')]",
//             required: true
//         },
//         {
//             // 抽取内容页的文章作者
//             name: "article_author",
//             selector: "//td[contains(@class,'aut')]/a",
//             required: true
//         }
    ]
};
 
/*
  回调函数afterExtractField：对抽取出来的数据进行处理
*/
configs.afterExtractField = function(fieldName, data, page, site) {
    if (fieldName == "article_publish_time") {
        var timestamp = Date.parse(data);
        return isNaN(timestamp) ? 0 : parseInt(timestamp/1000);// 发布日期转换成时间戳
      // 使用神箭手进行数据发布时，默认处理的时间戳是10位。如非特殊，请转换成10位时间戳
    }
    return data;
};
 
// 使用以上配置创建一个爬虫对象
var crawler = new Crawler(configs);
// 启动该爬虫
crawler.start();