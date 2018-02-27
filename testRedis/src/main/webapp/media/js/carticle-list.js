var ArticleList = function () {

    var handlePagination = function(pageNum) {
        
        var pidx = GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 6 
        }).on('page', function(event, num){
            var pstatus = GetQueryString("status");
            var ptype = GetQueryString("type");
            var author = GetQueryString("author");
            var recommender = GetQueryString("recommender");
            var carticleid = GetQueryString("cArticleId");
            
            var paraStr = "pIndex=" +num;
            if (pstatus != null &&pstatus !="-1")
                paraStr += "&status=" + pstatus;
            if (ptype != null&&ptype !="-1")
                paraStr += "&type=" +ptype;
            if (author != null && author !="")
                paraStr += "&author=" +author;
            if (recommender != null && recommender !="")
                paraStr += "&recommender=" +recommender;
            if (carticleid != null && carticleid !="")
                paraStr += "&carticleid=" +carticleid;

            window.location.href='/carticle/list?'+paraStr;
        });

       
    }

    var GetQueryString = function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }

    return {
        //main function to initiate the module
        init: function (pageNum) {
            handlePagination(pageNum);
        }

    };

}();