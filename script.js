// THEME
  const themeBtn=document.getElementById('themeBtn');
  themeBtn.addEventListener('click',()=>{
    const dark=document.documentElement.getAttribute('data-theme')==='dark';
    document.documentElement.setAttribute('data-theme',dark?'light':'dark');
    themeBtn.textContent=dark?'☀️':'🌙';
  });

  // TYPING
  const words=['Web Developer','Frontend Developer','DSA Learner','IBM Certified','Open Source Enthusiast'];
  let wi=0,ci=0,del=false;
  const el=document.getElementById('typed-text');
  function type(){
    const w=words[wi];
    if(!del){el.textContent=w.slice(0,ci+1);ci++;if(ci===w.length){del=true;setTimeout(type,1800);return;}}
    else{el.textContent=w.slice(0,ci-1);ci--;if(ci===0){del=false;wi=(wi+1)%words.length;}}
    setTimeout(type,del?60:100);
  }
  type();

  // SCROLL REVEAL
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});
  },{threshold:0.1});
  document.querySelectorAll('.service-card,.project-card,.skill-tag,.exp-card,.cert-card').forEach(el=>{
    el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .5s ease,transform .5s ease';obs.observe(el);
  });