// Initialize Locomotive Scroll for smooth scrolling
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});


// Sync Locomotive Scroll updates with ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);


// Proxy methods for ScrollTrigger to work with Locomotive Scroll
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// Refresh ScrollTrigger and LocomotiveScroll on window updates 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();




// Timeline for the first page animation
var tl = gsap.timeline({
  scrollTrigger:{
      trigger:".page1 h1",
      scroller:".main",
      start:"top 27%",
      end:"top 0",
      scrub:3
  }})
 
// Animations within the timeline
tl.to(".page1 h1",{ x:-100,},"anim")
  .to(".page1 h2",{  x:100,},"anim")
  .to(".page1 video",{width:"90%",}, "anim")


// Second timeline for changing the color of the main page
 var tl2 = gsap.timeline({
  scrollTrigger:{
      trigger:".page2 h1",
      scroller:".main",
      start:"top 50%",
      end:"end 10%",
      scrub:3
  }
});


// Animation to change background color
  tl2.to(".main",{backgroundColor: "#fff"}); 
  
  

// Timeline to revert color changes for the next section
      var tl3 = gsap.timeline({
        scrollTrigger:{
            trigger:".page3 h1",
            scroller:".main",
            start:"top 50%",
            end:"top 30%",
            scrub:3
        }
      });


// Revert color and change text color
 tl3.to(".main",{backgroundColor: "#0F0D0D"}) 
    .to(".page3 h1",{color: "#fff"},0); 

    
    
// Function to handle custom cursor behavior
     
      function cursor(){
      var crsr = document.querySelector("#cursor");
    
    
  document.addEventListener("mousemove", function(dets){
      crsr.style.left = dets.x - 10 + "px";
      crsr.style.top = dets.y - 10 + "px";
   
  })
  
// Cursor changes when entering/exiting video elements
 
 var videos =  document.querySelectorAll("video");
     videos.forEach(function(video){
        video.addEventListener("mouseenter",function(){
          crsr.style.width = "80px";
          crsr.style.height = "80px";
          crsr.style.borderRadius =  "50%";
          crsr.style.transform = "translate(-50%,-50%)";
          crsr.style.mixBlendMode = "normal";
          crsr.innerHTML = "View ";
      
      });
        video.addEventListener("mouseleave",function(){
          crsr.style.width = "20px";
          crsr.style.borderRadius =  "50%";
          crsr.innerHTML = "";
          crsr.style.transform = "translate(0%,0%)";
          crsr.style.mixBlendMode = "difference";
          crsr.style.height = "20px";
    
      })



     })
  }
// Call the cursor function
  cursor();


// Code for changing display on nav element hover

  var purple = document.querySelector(".purple")
  var h4 = document.querySelectorAll(" .nav h4")
  var nav = document.querySelector(".nav")
  var alag = document.querySelectorAll(".text-box h1");
  var textbox = document.querySelectorAll(".text-box")
  
  h4.forEach(function(elem){
      elem.addEventListener("mouseenter",function(){
        purple.style.display = "flex"
          purple.style.opacity = "1"
          alag.forEach(function(e){
          e.innerHTML = elem.innerHTML
         
        })
          textbox.forEach(function(v){
          v.style.display = "flex"
  
        })
        
       })
       
        nav.addEventListener("mouseleave",function(){
        purple.style.display = "none"
        purple.style.opacity = "0" 
      })
  
  })

//page5 photo animation on mousemove and mouseleave
      
    var box = document.querySelectorAll(".page5 .box");
    box.forEach(function(smallbox){
    var rotate = 0;
    var diffrot = 0;

    smallbox.addEventListener("mousemove",function(dets){
        
        var diff = dets.clientY - smallbox.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(smallbox.querySelectorAll("h3,h4"),{
          opacity: 0.5,
          color: "#EDBFFF",
          ease: Power3, 
         
      });
        
        gsap.to(smallbox.querySelector("img"),{
            opacity: 1,
            ease: Power3, 
            top : diff - 100 + 'px',
            left: dets.clientX - 200 + 'px',
            rotate: gsap.utils.clamp(-20,20,diffrot)
        });
    });
    smallbox.addEventListener("mouseleave",function(dets){
           
       gsap.to(smallbox.querySelector("img"),{
            opacity: 0,
            ease: Power3, 
            duration: 0.5,
            
         
        });
        gsap.to(smallbox.querySelectorAll("h3,h4"),{
          opacity: 1,
          color:"#fff",
          ease: Power3, 
         
      });
    });
} 
);

