// Globals
var xStep = 15.7;
var yStep = 34.5;
var steptime = 1;
var masterTimeScale = 1;

// Bezier Points
var bezPoints =
    document.getElementById("guide")
        .getAttribute("points")
        .split(" ")
        .map(function(p){
            p = p.split(",");
            x = "" + ((p[0] - 1381) / 2.9);
            y = "" + ((p[1] - 703) / 2.9);
            x = x[0] == "-" ? "-=" + x.substring(1) : "+=" + x;
            y = y[0] == "-" ? "-=" + y.substring(1) : "+=" + y;
            return {x: x, y: y};
        })

// Helpers
var hideIt = {display: "none"};
var showIt = {display: "inline-block"};


// Escalator Loop
var escalatorLoop = TweenMax.to("#steps", steptime, {x: "-=45", y: "-=100", ease: Bounce.Out, repeat: -1})



// Penguin Sequence
function penguinTl (col, prog, timescale) {
    var tl = new TimelineMax({repeat: -1});
        tl.timeScale(timescale);

    tl.set("#"+col+"-back-look-left", {display: "inline-block"})

    for (var i = 0; i < 12; i++ ){
        tl.to("#"+col, steptime, {x: "-="+ xStep, y: "-="+ yStep, ease: Bounce.Out}, "penguinstep" + i);
    }

    tl.set("#"+col, {zIndex: 8})
    tl.to("#"+col, steptime / 2, {x: "-=30", y: "-=10"}, "fromtop")

    var slideDown = TweenMax.to("#"+col, 5, {bezier: {type: "thru", values: bezPoints}}, "slidedown")

    tl.add(slideDown);

    // Penguin Changes

    tl.set("#"+col, {zIndex: 3}, "fromtop+=0.5")
      .set("#"+col+"-back-look-left", hideIt, "fromtop+=0.6")
      .set("#"+col+"-look-left", showIt, "fromtop+=0.6")
      .set("#"+col, {zIndex: 13}, "fromtop+=0.7")
      .set("#"+col+"-look-left", hideIt, "fromtop+=0.7")
      .set("#"+col+"-look-right", showIt, "fromtop+=0.7")
      .set("#"+col+"-look-right", hideIt, "fromtop+=0.9")
      .set("#"+col+"-back-look-right", showIt, "fromtop+=0.9")

      .set("#"+col+"-back-look-right", hideIt, "fromtop+=1.3")
      .set("#"+col+"-back-look-left", showIt, "fromtop+=1.3")
      .set("#"+col, {zIndex: 3}, "fromtop+=1.3")

      .set("#"+col+"-back-look-left", hideIt, "fromtop+=2")
      .set("#"+col+"-look-left", showIt, "fromtop+=2")
      .set("#"+col+"-look-left", hideIt, "fromtop+=2.1")
      .set("#"+col+"-look-right", showIt, "fromtop+=2.1")
      .set("#"+col, {zIndex: 13}, "fromtop+=2.1")

      .set("#"+col+"-look-right", hideIt, "fromtop+=2.2")
      .set("#"+col+"-back-look-right", showIt, "fromtop+=2.2")

      .to("#"+col, 0.05, {opacity: 0}, "fromtop+=2.5")
      .set("#"+col, {opacity: 1}, "fromtop+=2.6")
      .set("#"+col, {zIndex: 3}, "fromtop+=2.6")
      .set("#"+col+"-back-look-right", hideIt, "fromtop+=2.6")
      .set("#"+col+"-look-right", showIt, "fromtop+=2.6")

      .set("#"+col, {opacity: 1}, "fromtop+=2.6")
      .set("#"+col, {zIndex: 3}, "fromtop+=2.6")

      .set("#"+col, {zIndex: 13}, "fromtop+=3.5")
      .set("#"+col+"-look-right", hideIt, "fromtop+=3.8")
      .set("#"+col+"-look-front", showIt, "fromtop+=3.8")
      .set("#"+col+"-look-front", hideIt, "fromtop+=4")
      .set("#"+col+"-look-left", showIt, "fromtop+=4")

      .set("#"+col+"-look-left", hideIt, "fromtop+=4.2")
      .set("#"+col+"-back-look-left", showIt, "fromtop+=4.2")

      .set("#"+col, {zIndex: 8}, "fromtop+=5.2")
      .set("#"+col, {zIndex: 8}, "fromtop+=6")

    tl.seek(prog);

    return tl;

}

// Master
var masterTl = new TimelineMax({paused: true});
    masterTl.set(".container", {opacity: 0});
    masterTl.add(penguinTl.bind(null, "blue", 2, masterTimeScale), "blue")
    masterTl.add(penguinTl.bind(null, "red", 5, masterTimeScale), "red")
    masterTl.add(penguinTl.bind(null, "black", 28, masterTimeScale), "black")
    masterTl.add(escalatorLoop)
    masterTl.to(".container", 3, {opacity: 1}, .5);

    setTimeout(function(){
      masterTl.resume();
    },200);

    masterTl.timeScale(masterTimeScale);
