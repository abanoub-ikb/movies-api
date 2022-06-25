// form variabl collection
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let pw = document.getElementById('passwordInput');
let rePw = document.getElementById('rePasswordInput');


// open and close navbar
$('.menu-icon').click(()=>{
   if(document.getElementById('navBar').style.transform==='translateX(-75%)'){
    $('nav').css('transform','translateX(0%)');
    
   }else {
    $('nav').css('transform','translateX(-75%)');
   }
});
// --------------------------------------------------------------------------------------------------------------


// api collection

let popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=de55ce6c08b2552de9f2b864e5eca06d&language=en-US&page=1`;
let trendingApiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=de55ce6c08b2552de9f2b864e5eca06d`;
let topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=de55ce6c08b2552de9f2b864e5eca06d&language=en-US&page=1`;
let nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=de55ce6c08b2552de9f2b864e5eca06d&language=en-US&page=1`;
let upComingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=de55ce6c08b2552de9f2b864e5eca06d&language=en-US&page=1`;

// -------------------------------------------------------------------------------------------------------------

// base function to fetch all api collection the function param = api variable

async function fetchData(url){
   let response = await fetch(url);
   let result = await response.json()
   let finalResult = result.results;
   let dataContainer = ``;
   finalResult.map((ele)=>{
      dataContainer+=`  <div class="col-lg-4 col-md-6 ">
      <div class="box position-relative ">
          <img id="poster" class="w-100" src="https://image.tmdb.org/t/p/w500${ele.poster_path}" alt="">
         <div class="box-caption">
           <h3 id="title" class="py-4">${ele.original_title||''}</h3>
           <p id="overView" >${ele.overview||''}</p>
           <p id="rate" class="text-danger py-2">Rate: ${ele.vote_average||''}</p>
           <p id="date">${ele.release_date||''}</p>
        </div>
      </div>
  </div>`
   })
   document.getElementById('htmlDataContainer').innerHTML=dataContainer;
};

// --------------------------------------------------------------------------------------------------------------

//  search movies 

fetchData(trendingApiUrl);

let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input',()=>{
   let find = searchInput.value
   let searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=de55ce6c08b2552de9f2b864e5eca06d&query=${find}`
   if(find.length===0){
      fetchData(trendingApiUrl)
   }else{
      fetchData(searchApiUrl)
   }
   
});

//---------------------------------------------------------------------------------------------------------- 

// show now playing movies by clicking the link in navbar
$('#nowPlaying').click(()=>fetchData(nowPlayingMovies));
// -------------------------------------------------------

// show the popular movies
$('#popular').click(()=>fetchData(popularMovies));
// ------------------------------------------------------

// show top rated movies
$('#topRated').click(()=>fetchData(topRatedMovies));
//------------------------------------------------------

// show trending movies
$('#trending').click(()=>fetchData(trendingApiUrl));
// -----------------------------------------------------

// show upcoming movies
$('#upcoming').click(()=>fetchData(upComingMovies));
// ----------------------------------------------------

// sign-up function

$('#submit').click((e)=>{
   e.preventDefault();
   if(checkFormInputs()===true){
     if(validateName()===true && validateEmail()===true && validatePw()===true && validatePhone()===true && validatAge()===true){

        
         $('#finish').css('display','flex');
         $('#finish').fadeOut(5000);
         clearForm();
     }
   }
});

// ____________________________________________

// remove all alerts while oninput
$('form input').on('input',()=>{
   $('form p').text('')
})

// show and hide form password
$('#toggler').click(()=>{

   if(pw.type === 'password' && rePw.type ==='password'){
      pw.type = 'text';
      rePw.type ='text';
   }else{
      pw.type = 'password';
      rePw.type ='password';
   }
});
// -------------------------------------------------------
//  name validation

function validateName(){
   let regexName=/^([a-z]|\d|\w){5,12}$/i;
   if(regexName.test(nameInput.value)===true)
        {
            return true;
        }
        else{
            document.getElementById('nameError').innerHTML='user name must contain between 5 to 12 letters number or _    ';
           return false;
        }
};

// -------------------------------------------------------

//  email validation

function validateEmail(){

   let  regexEmail=/^([a-z]|\d|\w)+@[a-z]+(\.com)$/;

   if(regexEmail.test(emailInput.value)===true)
   {
       return true;
   }
   else{
      document.getElementById('emailError').innerHTML='incorrect email form ';
       return false;
   }
};

// -------------------------------------------------------

// password validation

function validatePw(){

   let regexPw=/^([a-z]|\d|\w){6,12}$/i;
   if(regexPw.test(pw.value)===true && pw.value===rePw.value)
   {
       return true;
   }
   else{
      document.getElementById('passwordError')='password must contain between 6 to 12 letters numbers or _';
       return false;
   }
};

// --------------------------------------------------------

// phone number validation

function validatePhone(){
   let regexPhone = /^01[01258][0-9]{8}$/;
   if(regexPhone.test(phoneInput.value)===true){
      return true;
   }else{
      document.getElementById('phoneError').innerHTML='incorrect phone number form';
   }
};
// -------------------------------------------------------

// age validation

function validatAge(){
   let ageRegex = /^[1-9]{1}[0-9]{1}$/;
   if(ageRegex.test(ageInput.value)===true){
      return true;
   }else{
      document.getElementById('ageError').innerHTML='incorrect age form';
   }
};
// --------------------------------------------------------

// check inputs 

function checkFormInputs(){
   if(nameInput.value.length===0){
      document.getElementById('nameError').innerHTML='please fill the input';
      
   }
   if(emailInput.value.length===0){
      document.getElementById('emailError').innerHTML='please fill the input';
   }
   if(phoneInput.value.length===0){
      document.getElementById('phoneError').innerHTML='please fill the input';
   }
   if(ageInput.value.length===0){
      document.getElementById('ageError').innerHTML='please fill the input';
   }
   if(pw.value.length===0){
      document.getElementById('passwordError').innerHTML='please fill the input';
   }
   if(rePw.value !== pw.value){
      document.getElementById('unmatchedError').innerHTML='Unmatched password';
   }
   if(nameInput.value.length===0||emailInput.value.length===0||ageInput.value.length===0||phoneInput.value.length===0||pw.value.length===0||pw.value!== rePw.value){
      return false;
   } else{
      
      return true;
   }
};
// ---------------------------------------------------------------------------
function clearForm(){
   nameInput.value='';
   emailInput.value='';
   phoneInput.value='';
   ageInput.value='';
   pw.value='';
   rePw.value='';
};