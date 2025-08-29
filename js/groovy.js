(function(){

  const originalImgs = Array.from(
    document.querySelectorAll('#mainItem img[src^="img/store/기타/aviot"]')
  );
  if (originalImgs.length === 0) return;


  const srcList = originalImgs.map(img => img.getAttribute('src'));
  const widthPxList = originalImgs.map(img => getComputedStyle(img).width);


  const hostItem = document.querySelector('#mainItem .item1') || document.querySelector('#mainItem'); 
  const stage = document.createElement('div');
  stage.className = 'image-stage';
  hostItem.appendChild(stage);

  originalImgs.forEach(img => { img.style.visibility = 'hidden'; });

 
  let currentIdx = 0;
  let currentImg = document.createElement('img');
  currentImg.className = 'stage-img at-center';
  currentImg.src = srcList[currentIdx];
  currentImg.style.width = widthPxList[currentIdx];
  stage.appendChild(currentImg);


  const indexToHex = ['#fff' , '#FF8F95', '#056800', '#121212'];
  const hexToIndex = indexToHex.reduce((a,h,i)=>{a[h.toLowerCase()] = i; return a;}, {});
  const figures = Array.from(document.querySelectorAll('.colorPack figure'));

  function getFigureHex(fig){
    const s = fig.getAttribute('style') || '';
    const m = s.match(/background-color:\s*([^;]+)/i);
    return (m ? m[1] : '').toLowerCase();
  }
  function updateColorUI(activeIdx){
    const activeHex = (indexToHex[activeIdx] || '').toLowerCase();
    figures.forEach(f => f.classList.toggle('on', getFigureHex(f) === activeHex));
  }
  updateColorUI(currentIdx);


  function switchTo(nextIdx){
    if (nextIdx == null || nextIdx === currentIdx) return;

    const dir = nextIdx > currentIdx ? 'right' : 'left';

   
    const incoming = document.createElement('img');
    incoming.className = 'stage-img ' + (dir === 'right' ? 'enter-from-right' : 'enter-from-left');
    incoming.src = srcList[nextIdx];
    incoming.style.width = widthPxList[nextIdx];
    stage.appendChild(incoming);


    incoming.getBoundingClientRect();
    incoming.classList.add('at-center');

    currentImg.classList.add(dir === 'right' ? 'leave-to-left' : 'leave-to-right');


    incoming.addEventListener('transitionend', () => {
      currentImg.remove();
      currentImg = incoming;
      currentIdx = nextIdx;
      updateColorUI(currentIdx);
    }, { once:true });
  }

  figures.forEach(fig => {
    fig.addEventListener('click', () => {
      const hex = getFigureHex(fig);
      const idx = hexToIndex[hex];
      switchTo(idx);
    });
  });

  window.addEventListener('resize', () => {
    originalImgs.forEach((img, i) => { widthPxList[i] = getComputedStyle(img).width; });
    currentImg.style.width = widthPxList[currentIdx];
  });
})();

