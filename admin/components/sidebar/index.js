/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Sidebar",
          [
            '$scope', 'api',
            function ($scope, api) {
              $scope.links = [
                {
                  'title': 'Projects',
                  'icon': 'product-hunt',
                  'sublinks': []
                },
                {
                  'title': 'Master',
                  'icon': 'sitemap',
                  'sublinks': [
                    {
                      'title': 'Clients',
                      'link': 'app.admin.clients'
                    },
                    {
                      'title': 'Sites',
                      'link': 'app.admin.sites'
                    },
                    {
                      'title': 'Branches',
                      'link': 'app.admin.branches'
                    },
                    {
                      'title': 'Protocols',
                      'link': 'app.admin.projects'
                    },
                    {
                      'title': 'Users',
                      'link': 'app.admin.users'
                    },
                    {
                      'title': 'Items',
                      'link': 'app.admin.items'
                    },
                    {
                      'title': 'Payment',
                      'link': 'app.admin.payments'
                    }
                  ]
                },
                {
                  'title': 'Links',
                  'icon': 'external-link',
                  'sublinks': [
                    {
                      'title': 'Github',
                      'link': 'http://github.com',
                      'icon': 'github',
                      'external': true,
                      'target': '_blank'
                    },
                    {
                      'title': 'Yahoo',
                      'link': 'http://yahoo.com',
                      'icon': 'yahoo',
                      'external': true,
                      'target': '_blank'
                    }
                  ]
                }
              ];

              api
                  .project()
                  .get()
                  .$promise
                  .then(function(res){
                    var data = res.data;
                    _.each(data, function(d, i){
                      if(i < 3){
                        $scope.links[0]
                            .sublinks
                            .push({
                              "title": d.attributes.name,
                              "link": "app.admin.projects.show({id: " + d.id + "})"
                            });
                      }
                    });

                    $scope.links[0]
                        .sublinks
                        .push({
                          'title': '...more',
                          'link': 'app.admin.projects'
                        });
                  });
            }
          ]
      );
})();