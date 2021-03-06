'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:NoticelistCtrl
 * @description
 * # NoticelistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('NoticelistCtrl', function ($scope, $state, commonService, $loading, $location, $stateParams) {
    //通知公告
    $scope.paginationConf = $.extend({}, paginationConf, {itemsPerPage: 10});
    $scope.getNoticeList = function (options) {
      $loading.start('noticeAnnouncement');
      var parmas = $.extend({},ALL_PORT.NoticeList.data,{rows:10},options);
      commonService.getData(ALL_PORT.NoticeList.url, 'POST', parmas)
        .then(function(response) {
          $loading.finish('noticeAnnouncement');
          $scope.noticeListData = response.Data;
          $scope.paginationConf.totalItems = response.Data.Count;
        });
    }
  
    $scope.$watch('paginationConf.currentPage', function () {
      var pageOptions = {
        page: $scope.paginationConf.currentPage,
        search: $scope.searchTitle
      };
      $scope.getNoticeList(pageOptions);
    });

    //获取文章分类
        commonService.getData(ALL_PORT.ArticleCategory.url, 'POST',
          $.extend({}, ALL_PORT.ArticleCategory.data,{parentId:'23'}))
          .then(function (response) {
            $scope.categoryData = response.Data;
          });
    
  });
