(function(){
    angular
        .module("BlogApp")
        .controller("ListController", listController);

    function listController($scope, ArticleService, $location, $routeParams, $sce){
        var allpage;
        var page;
        var newpage;
        $scope.next = next;
        $scope.prev = prev;
        $scope.deleteArticle = deleteArticle;

        function init(){
            $scope.pages = [];
            $scope.articles = [];
            page = $routeParams.page;
            if (!page) {
                page = 1;
            }

            ArticleService
                .findAllArticles()
                .then(function(response) {
                    var lists = response.data;
                    //console.log(lists);
                    allpage = Math.floor(lists.length / 5);
                    var pages = [];
                    for (var j = 0; j <= allpage; j++) {
                        pages.push(j + 1);
                    }

                    $scope.articles = [];

                    for (var i = (page - 1) * 5; i < page * 5; i++) {
                        if (!lists[i]) {
                            break;
                        }
                        if (lists[i].body.length > 150) {
                            lists[i].body = lists[i].body.substring(0, 150);
                        }
                        lists[i].body = $sce.trustAsHtml(lists[i].body);
                        $scope.articles.push(lists[i]);
                    }

                    $scope.pages = pages;

                })
        }
        init();

        function next() {
            newpage = page;
            if (newpage < allpage + 1) {
                newpage++;
            }
            $location.url("/list/"+ newpage);
        }

        function prev() {
            newpage = page;
            if (newpage > 1) {
                newpage--;
            }
            $location.url("/list/"+ newpage);
        }

        function deleteArticle(article) {
            ArticleService
                .deleteArticle(article)
                .then(function(response) {
                    console.log(response);
                    init();
                })
        }
    }

})();
