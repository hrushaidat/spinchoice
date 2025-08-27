// Shared JS for both landing page and personal wheel

function drawWheel(canvas, names){
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const radius = size/2;
  const slices = names.length;
  const sliceAngle = 2*Math.PI/slices;
  ctx.clearRect(0,0,size,size);

  for (let i=0;i<slices;i++){
    ctx.beginPath();
    ctx.moveTo(radius,radius);
    ctx.arc(radius,radius,radius,i*sliceAngle,(i+1)*sliceAngle);
    ctx.fillStyle = i%2===0 ? "#a8dadc" : "#dee2e6";
    ctx.fill();
    ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.stroke();

    ctx.save();
    ctx.translate(radius,radius);
    ctx.rotate(i*sliceAngle + sliceAngle/2);
    ctx.textAlign="right";
    ctx.fillStyle="#222";
    ctx.font="18px Segoe UI";
    ctx.fillText(names[i], radius-15,5);
    ctx.restore();
  }
}

function spinWheel(canvas, names, spinStep, winnerEl, callback){
  const slices = names.length;
  const sliceAngle = 360/slices;
  const winnerName = names[spinStep % names.length];
  const winnerIndex = names.indexOf(winnerName);
  const stopAngle = 360*5 + (270 - (winnerIndex*sliceAngle + sliceAngle/2));
  let start=null; const duration=4500;

  function animate(timestamp){
    if(!start) start=timestamp;
    const progress = Math.min((timestamp-start)/duration,1);
    const eased = 1-Math.pow(1-progress,3);
    const angle = stopAngle*eased;
    canvas.style.transform = `rotate(${angle}deg)`;
    if(progress<1){ requestAnimationFrame(animate); }
    else { winnerEl.textContent = "🎉 " + winnerName + " was picked!"; if(callback) callback(); }
  }
  requestAnimationFrame(animate);
}
