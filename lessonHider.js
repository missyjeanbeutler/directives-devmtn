angular.module('directivePractice')
.directive('lessonHider', function(){
    return {
        restrict: 'AE',
        templateUrl: 'lessonHider.html',
        scope: {
            lesson: '=',
            dayAlert: '&',
        },
        link: function($scope, element, attributes){
            $scope.getSchedule.then(function(response){
                $scope.schedule = response.data;
                $scope.schedule.forEach(function(scheduleDay, i) {
                    if (scheduleDay.lesson === $scope.lesson) {
                        element.css('text-decoration', 'line-through');
                        $scope.lessonDay = scheduleDay.weekday;                        
                    }
                })
            })
            var checked = false;
            $scope.crossLine = function() {
                if (checked === false) {
                    element.css('text-decoration', 'line-through');
                    checked = true;
                } else if (checked === true) {
                    element.css('text-decoration', 'none');
                    checked = false;
                }

            }
            $scope.removeLesson = function(){
                element.css('display', 'none');
            }
            
        },
        controller: function($scope, lessonService) {
            $scope.getSchedule = lessonService.getSchedule();
        }
    }
})