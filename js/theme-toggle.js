
(function(){
  const root = document.documentElement;
  const storageKey = 'site-theme';

  function getSaved(){
    return localStorage.getItem(storageKey);
  }
  function setSaved(v){ localStorage.setItem(storageKey, v); }

  function applyTheme(theme){
    if(theme === 'light') root.setAttribute('data-theme','light');
    else if(theme === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
  }


  function syncBodyClass(theme){
    if(theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  
  function sunIcon(){
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="#000000ff"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#111" stroke-width="1.2" stroke-linecap="round"/></svg>';
  }
  function moonIcon(){
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#ffffff"/></svg>';
  }

  
  function ensureOriginals(){
    document.querySelectorAll('img').forEach(img => {
      if(!img.dataset.originalSrc) img.dataset.originalSrc = img.src;
    });
  }

  function toWhite(src){
   
    return src.replace(/(\.svg|\.png|\.jpg|\.jpeg)$/i, function(m){
      return '_white'+m;
    });
  }

  function setImagesForTheme(theme){
    ensureOriginals();
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      const orig = img.dataset.originalSrc;
      if(theme === 'dark'){
        const white = toWhite(orig);
    
        const pre = new Image();
        pre.onload = ()=> { img.src = white; };
        pre.onerror = ()=> {  };
        pre.src = white;
      } else {
       
        if(orig) img.src = orig;
      }
    });
  }

 
  function setHeroForTheme(theme){
    const hero = document.querySelector('.hero-image');
    const title = document.querySelector('.hero-title');
    if(!hero) return;
   
    if(!hero.dataset.originalSrc) hero.dataset.originalSrc = hero.src;
    if(title && !title.dataset.originalText) title.dataset.originalText = title.textContent;

    const basePath = hero.dataset.originalSrc.replace(/[^\/]+$/,'');
    const lightSrc = hero.dataset.originalSrc; 
    const darkCandidate = basePath + 'villain.jpg';

    if(theme === 'dark'){
     
      const pre = new Image();
      pre.onload = ()=> { hero.src = darkCandidate; };
      pre.onerror = ()=> { hero.src = lightSrc; };
      pre.src = darkCandidate;

      if(title) title.textContent = 'Voldemort, Harry Potter';
    } else {
     
      hero.src = lightSrc;
      if(title && title.dataset.originalText) title.textContent = title.dataset.originalText;
    }
  }

  
  function setSpecificIcons(theme){
    
    const emailImg = Array.from(document.querySelectorAll('img')).find(i => i.alt && /email/i.test(i.alt));
    if(emailImg){
      if(!emailImg.dataset.originalSrc) emailImg.dataset.originalSrc = emailImg.src;
      const orig = emailImg.dataset.originalSrc;
      const white = toWhite(orig);
      if(theme === 'dark'){
        const pre = new Image(); pre.onload = ()=> { emailImg.src = white; }; pre.onerror = ()=> { /* ignore */ }; pre.src = white;
      } else {
        emailImg.src = emailImg.dataset.originalSrc;
      }
    }
  }

  
  function init(){
    ensureOriginals();
    const btn = document.querySelector('.theme-toggle');
   
    let theme = getSaved();
    if(!theme){
      if(document.body.classList.contains('dark')) theme = 'dark';
      else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
      else theme = 'light';
    }
    applyTheme(theme);
    syncBodyClass(theme);
    setImagesForTheme(theme);
    setHeroForTheme(theme);
    setSpecificIcons(theme);
    if(btn){
      btn.innerHTML = theme === 'light' ? sunIcon() : moonIcon();
      btn.addEventListener('click', ()=>{
        const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = cur === 'light' ? 'dark' : 'light';
        applyTheme(next);
        syncBodyClass(next);
        setSaved(next);
        setImagesForTheme(next);
        setHeroForTheme(next);
        setSpecificIcons(next);
        if(btn) btn.innerHTML = next === 'light' ? sunIcon() : moonIcon();
      });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
