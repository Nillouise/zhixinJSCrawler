//贴吧的帖子加载是用ajax的，这段代码不能处理这种情况。
var configs = {
    domains: ["baidu.com"],
    scanUrls: ["http://tieba.baidu.com/f?kw=java&fr=wwwt"],
    contentUrlRegexes: [
        /\/p\/\d+/,
    ],
    helperUrlRegexes: [
        /http:\/\/tieba\.baidu\.com\/f\?kw=java&ie=utf-8(&pn=\d+)?/
    ],
    fields: [
      {
        name:"article_title",
        selector:"//H1",
        required:true
      },
      {
        name:"content",
        selector:"//CC/DIV[contains(concat(\" \",normalize-space(@class),\" \"),\"clearfix\")]",
      }
        // {
        //     // 抽取内容页的文章标题
        //     name: "article_title",
        //     selector: "//h1[contains(@class,'headTit')]",
        //     required: true
        // },
        // {
        //     // 抽取内容页的文章内容
        //     name: "article_content",
        //     selector: "//div[contains(@class,'lph-article-comView')]",
        //     required: true
        // },
        // {
        //     // 抽取内容页的文章发布日期
        //     name: "article_publish_time",
        //     selector: "//td[contains(@class,'time')]",
        //     required: true
        // },
        // {
        //     // 抽取内容页的文章作者
        //     name: "article_author",
        //     selector: "//td[contains(@class,'aut')]/a",
        //     required: true
        // }
    ]
};
 
// 在"afterExtractField回调函数"中将爬取到的时间转换为秒级时间戳
configs.afterExtractField = function(fieldName, data, page, site) {
    if (fieldName == "article_publish_time") {
        var timestamp = Date.parse(data);
        return isNaN(timestamp) ? 0 : parseInt(timestamp/1000);
    }
    return data;
};
 
// 使用以上配置创建一个采集爬虫
var crawler = new Crawler(configs);
// 启动该采集爬虫
crawler.start();