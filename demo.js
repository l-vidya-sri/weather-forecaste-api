let cityName=document.getElementById("city-name")
let cityTemp=document.getElementById("demo")
let form=document.getElementById("form")
let apiKey="3df68cd300ed0dfce29e5b36497564a6"
var arr=[]

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    //console.log(cityName.value)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`
    fetch(url)
    .then((res)=>{
        console.log(res)
        return res.json()
    })
    .then((res)=>{
        console.log(res)
        if(res.cod=='404'){
            alert("City not found")
            return;
        }
       if(arr.includes(res.id)){
        alert("Data already exist")
        return;
       }
       else{
        const div=document.createElement("div")   //creating an element
        div.classList.add("city")                 //to give name to the above class
        const {main,sys,name,weather}=res              //destructuring

        let description = weather[0].description.toLowerCase();  // Convert to lowercase for consistency

        if (description.includes("scattered cloud")) {
        div.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/03/77/63/43/360_F_377634392_MjmHeMYznYU75C0AOU8yW4EpJG3uKVnX.jpg')";
        } else if (description.includes("haze")) {
        div.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmOMGuWa1IUNfDB_Y1SyKkhqRxl2Nc8-TIw&s')";
        } else if (description.includes("overcast clouds")) {
        div.style.backgroundImage = "url('https://i.pinimg.com/736x/64/97/a3/6497a3be05ffa588f0e1d385c48cbb8d.jpg')";
        } else if (description.includes("broken clouds")) {
        div.style.backgroundImage = "url('https://st4.depositphotos.com/29453646/41066/i/450/depositphotos_410662634-stock-photo-sky-covered-soft-cirrus-clouds.jpg')";
        } else if (description.includes("rainy")) {
        div.style.backgroundImage = "url('https://www.shutterstock.com/image-photo/heavy-rain-tree-parking-260nw-681346432.jpg')";
        } else {
        div.style.backgroundImage = "url('https://cdn2.hubspot.net/hubfs/2936356/maxresdefault.jpg')";  
        }
        div.style.backgroundSize = "cover";  
        div.style.backgroundPosition = "center";  

            let result=`
                <div>
                <h1>${name}</h1>
                <p>
                    ${main.temp}<sup>0</sup>C
                    ${sys.country}
                </p>
                <p>Weather:${weather[0].main}</p>
                 <p>Description:${weather[0].description}</p>
                </div>`
            arr.push(res.id)
            div.innerHTML=result
            cityTemp.appendChild(div)
       }
    })
})