function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function moveSlider(ct, d, e, index) {
  // console.log(ct);
  angular.element('body').controller().updateSliderLeft(ct, d, e, index);
}
