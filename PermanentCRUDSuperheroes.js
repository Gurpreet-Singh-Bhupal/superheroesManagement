window.onload=function(){
    let superheroes=[
        {
            Name : "Thor",
            age:1500,
            planet:"Asgard",
            height:"6'3\""
        },
        {
            Name : "Iron Man",
            age:34,
            planet:"Earth",
            height:"5'10\""
        },
        {
            Name : "Captain America",
            age:101,
            planet:"Earth",
            height:"6'"
        }
    ];

    if(localStorage.getItem("superheroes")===null){
        // let superheroesNew=JSON.stringify(superheroes);
        // console.log(JSON.stringify(superheroes));
        localStorage.setItem("superheroes",JSON.stringify(superheroes));
    }
};


function displayHeroes(matchedHeroes=undefined){
    // let srNo=1;
    let superheroes;
    if(matchedHeroes==undefined){
        superheroes=JSON.parse(localStorage.getItem("superheroes"));
    }
    else{
            superheroes=matchedHeroes;
    }
    let tableContent="";
    // console.log(localStorage.getItem("superheroes"));
    
    // console.log(superheroes);
    superheroes.forEach(function (superhero,index){
        tableContent+= `<tr><td>${index+1}</td>
        <td>${superhero.Name}</td>
        <td>${superhero.age}</td>
        <td>${superhero.planet}</td>
        <td>${superhero.height}</td>
        <td>
        <button onclick="deleteSuperHero(${index})">Delete</button>
        <button onclick="showModal(${index})" >Update</button></td></tr>`;
        // srNo++;
        // console.log(superhero);
    })
    document.getElementsByClassName('table')[0].innerHTML= tableContent;
}



function addSuperhero(e){
    e.preventDefault();
    // console.log("object")
    let obj={};
    obj.Name=document.getElementById("nameId").value;
    obj.age=document.getElementById("ageId").value;
    obj.planet=document.getElementById("planetId").value;
    obj.height=document.getElementById("heightId").value;

    let superheroes=JSON.parse(localStorage.getItem("superheroes"));
    superheroes.push(obj);
    document.getElementById("nameId").value="";
    document.getElementById("ageId").value="";
    document.getElementById("planetId").value="";
    document.getElementById("heightId").value="";
    // console.log(obj);
    // console.log(superheroes);
    obj={};
    // srNo=1;
    // console.log(superheroes);
    localStorage.setItem("superheroes",JSON.stringify(superheroes));
    displayHeroes();
    // console.log(localStorage.getItem("superheroes"));
}
// console.log(superheroes);
displayHeroes();


function searchSuperheroByName(){
    // e.preventDefault();
    let searchvalue=document.getElementById("search");
    // console.log(searchvalue.value);
    // matchedHeroes=[];
    let superheroes=JSON.parse(localStorage.getItem("superheroes"));
    matchedHeroes=superheroes.filter((superhero)=>{
        return superhero.Name.toLowerCase().indexOf(searchvalue.value.toLowerCase())!=-1;
        // return superhero.Name.toLowerCase().includes(searchvalue.value.toLowerCase());
    })
    

    displayHeroes(matchedHeroes);
}

function deleteSuperHero(index){
    let superheroes=JSON.parse(localStorage.getItem("superheroes"));
    superheroes.splice(index,1);
    localStorage.setItem("superheroes",JSON.stringify(superheroes));
    // superheroes.pop(index); //This is not working
    displayHeroes(superheroes);
}

let selectedHeroIndex;

function copySuperhero(index){
    selectedHeroIndex=index;
    // console.log(selectedHeroIndex);
    // console.log(superheroes[index]);
    let superheroes=JSON.parse(localStorage.getItem("superheroes"));
    document.getElementById('upnameId').value=superheroes[index].Name;
    document.getElementById('upageId').value=superheroes[index].age;
    document.getElementById('upplanetId').value=superheroes[index].planet;
    document.getElementById('upheightId').value=superheroes[index].height;

}

function updateSuperhero(e){
    e.preventDefault();
    // console.log("object")
    let superheroes=JSON.parse(localStorage.getItem("superheroes"));
    superheroes[selectedHeroIndex].Name=document.getElementById("upnameId").value;
    superheroes[selectedHeroIndex].age=document.getElementById("upageId").value;
    superheroes[selectedHeroIndex].planet=document.getElementById("upplanetId").value;
    superheroes[selectedHeroIndex].height=document.getElementById("upheightId").value;
    localStorage.setItem("superheroes",JSON.stringify(superheroes));
    displayHeroes(superheroes);
    document.getElementsByClassName("modal")[0].style.display="none"; 
}


function showModal(index){
    document.getElementsByClassName("modal")[0].style.display="block";
    // console.log("object")
    // console.log(superheroes[index])
    copySuperhero(index);
}
function hideModal(e){
    
    if(e.target.className==='modal'){
        document.getElementsByClassName("modal")[0].style.display="none";        
    }
}

