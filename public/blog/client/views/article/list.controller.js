(function(){
    angular
        .module("BlogApp")
        .controller("ListController", listController);

    function listController($scope, ArticleService, $location, $routeParams){
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
                    console.log(lists);
                    console.log("allpage = " + allpage);
                    var pages = [];
                    for (var j = 0; j <= allpage; j++) {
                        pages.push(j + 1);
                    }

                    $scope.articles = [];

                    for (var i = (page - 1) * 5; i < page * 5; i++) {
                        if (!lists[i]) {
                            break;
                        }
                        $scope.articles.push(lists[i]);
                    }

                    $scope.pages = pages;

                    console.log($scope.articles);

                    console.log(pages);
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
            console.log(article);
            ArticleService
                .deleteArticle(article)
                .then(function(response) {
                    init();
                    $scope.message = "Successfully delete the article.";
                })
        }
    }

})();
