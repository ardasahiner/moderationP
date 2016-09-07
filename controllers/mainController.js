angular.module('mainController', [])

.controller('mainController', function($window) {

  var vm = this;
  vm.audioList = [document.getElementById("audio0"), document.getElementById("audio1"), document.getElementById("audio2")];
  vm.loadedList = [false, false, false];
  vm.playingList = [false, false, false];
  vm.pausedList = [true, true, true];
  vm.durationList = [0, 0, 0];
  vm.timeRemainingList = [0, 0, 0];
  vm.activeAudio = document.getElementById("audio0"); // default to 0
  vm.activeAudioIndex = 0; // default to 0

  vm.aud_play = function(index) {
    if (!vm.playingList[index]) {

      if (vm.activeAudio != null && vm.activeAudioIndex !== index) {

        vm.aud_pause(vm.activeAudioIndex);
      }

      vm.activeAudio = vm.audioList[index];
      vm.activeAudioIndex = index;
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

      var the_id = 'tracktime' + index;
      document.getElementById(the_id).innerHTML = Math.floor((vm.audioList[index].duration));
    }
  };

  vm.getDuration = function() {
    for (var i = 0; i < vm.audioList.length; i ++ ) {
      if (vm.audioList[i].readyState >= 1) {
        vm.durationList[i] = vm.audioList[i].duration;
      } else {
        console.log("something happened");
        vm.durationList[i] = vm.audioList[i].duration;
      }
      vm.timeRemainingList[i] = Math.floor(vm.audioList[i].duration - vm.audioList[i].currentTime);
    }

    for (var i = 0; i < vm.audioList.length; i ++ ) {

      if (isNaN(vm.durationList[i])) {
        $window.location.reload();
      } else {

        vm.loadedList[i] = true;
      }
    }
  }

  function sleep(seconds) {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }

  vm.getDuration();
  return vm;
});
