angular.module('mainController', [])

.controller('mainController', function($scope) {

  var vm = this;
  vm.audioList = [document.getElementById("myAudio")];
  vm.playingList = [false];
  vm.pausedList = [true];
  vm.durationList = [0];
  vm.timeRemainingList = [0];
  vm.activeAudio = null;

  vm.aud_play = function(index) {
    if (!vm.playingList[index]) {

      if (vm.activeAudio != null && vm.activeAudio !== vm.audioList[index]) {

        vm.activeAudio.pause();
      }

      vm.activeAudio = vm.audioList[index];
      vm.audioList[index].play();
      vm.playingList[index] = true;
      vm.pausedList[index] = false;
    }
    //
    // myAudio.onended = function() {
    //   vm.ended = true;
    //   console.log("the audio has ended");
    //   console.log(vm.ended);
    // };
  };

  vm.aud_pause = function(index) {
    if (!vm.pausedList[index]) {
      vm.audioList[index].pause();
      vm.playingList[index] = false;
      vm.pausedList[index] = true;
    }

    if (vm.audioList[index].ended) {

      document.getElementById('tracktime').innerHTML = Math.floor((vm.audioList[index].duration) * 10) / 10;
    }
  };

  vm.getDuration = function() {
    for (var i = 0; i < vm.audioList.length; i ++ ) {
      vm.durationList[i] = vm.audioList[i].duration;
      vm.timeRemainingList[i] = Math.floor((vm.audioList[i].duration - vm.audioList[i].currentTime) * 10) / 10;
    }
  }
  vm.getDuration();
  return vm;
});
