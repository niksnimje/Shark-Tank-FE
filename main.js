    let mainSection = document.getElementById("data-list-wrapper");

    // pitch
    let pitchTitleInput = document.getElementById("pitch-title");
    let pitchImageInput = document.getElementById("pitch-image");
    let pitchCategoryInput = document.getElementById("pitch-category");
    let pitchfounderInput = document.getElementById("pitch-founder");
    let pitchPriceInput = document.getElementById("pitch-price");
    let pitchCreateBtn = document.getElementById("add-pitch");

    // Update pitch
    let updatePitchIdInput = document.getElementById("update-pitch-id");
    let updatePitchTitleInput = document.getElementById("update-pitch-title");
    let updatePitchImageInput = document.getElementById("update-pitch-image");
    let updatePitchfounderInput = document.getElementById("update-pitch-founder");
    let updatePitchCategoryInput = document.getElementById("update-pitch-category");
    let updatePitchPriceInput = document.getElementById("update-pitch-price");
    let updatePitchBtn = document.getElementById("update-pitch");

    //Update price
    let updatePricePitchId = document.getElementById("update-price-pitch-id");
    let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
    let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

    //sort and filter
    let sortAtoZBtn = document.getElementById("sort-low-to-high");
    let sortZtoABtn = document.getElementById("sort-high-to-low");
    let filterFood = document.getElementById("filter-Food");
    let filterElectronics = document.getElementById("filter-Electronics");
    let filterPersonalCare = document.getElementById("filter-Personal-Care");

    //Search by title/founder

    let searchBySelect = document.getElementById("search-by-select");
    let searchByInput = document.getElementById("search-by-input");
    let searchByButton = document.getElementById("search-by-button");

    // Problem 1. List of pitches on page load [3}

    let Product_data=[]

    function FetchData()
    {
        fetch("https://shark-tank-be-1.onrender.com/pitches")
        .then((res)=>res.json())
        .then((data)=>{
            CardList(data)
            Product_data=data
        })
        .catch((err)=>console.log(err))
    }
    FetchData()


    function CardList(data)
    {
        let store=data.map((el)=>Card(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))
        mainSection.innerHTML=store.join("")
    }



    function Card(id,image,title,price,founder,category)
    {
        let SingelData=`
        <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}">
        <div class="card" data-id=${id}> 
        <div class="card-img">
        <img src=${image}>
        </div>
        <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">${price}</p>
        <a href="#" data-id=${id} class="card-link">Edit</a>
        <button data-id=${id} class="card-button">Delete</button>
        </div>
        </div>
        </a>
        `
        return SingelData

    }


    // ++++++++++++++++++++++++++++++ POST  ++++++++++++++++++++++++++++++

    pitchCreateBtn.addEventListener("click",()=>{

        let productNew={
            title:pitchTitleInput.value,
            price:pitchPriceInput.value,
            category:pitchCategoryInput.value,
            image:pitchImageInput.value,
            founder:pitchfounderInput.value
        }

        console.log(productNew)

        fetch('https://shark-tank-be-1.onrender.com/pitches',{

            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(productNew)
        })

        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            alert('Product Add Ho Gya !!! ')
        })

        .catch((err)=>{
            console.log(err)
            alert('Something Went Wrong.... ')
        })
        
        

    })  


    // ++++++++++++++++++++++++++++++ Delete Part  ++++++++++++++++++++++++++++++

    document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("card-button"))
        {
            console.log()
            DeleteBtn(e.target.dataset.id)
        }
    })

    function DeleteBtn(id){

        fetch(`https://shark-tank-be-1.onrender.com/pitches/${id}`,{
            method:'DELETE'

        }).then((res)=>res.json())
        .then((data)=>
        {
            alert("DELETE KAR DIYA")
            console.log(data)
        })
        .catch((err)=>console.log(err))
    }


    // ++++++++++++++++++++++++++++++  Filter Part ++++++++++++++++++++++++++++++


    filterFood.addEventListener("click",()=>{

        // console.log(Product_data)

        let Fillter_Food=Product_data.filter((el)=>el.category==="Food")
        // console.log(Fillter_Food)
        CardList(Fillter_Food)

    })


    filterElectronics.addEventListener("click",()=>{

        // console.log(Product_data)

        let Fillter_Electronics=Product_data.filter((el)=>el.category==="Electronics")
        // console.log(Fillter_Food)
        CardList(Fillter_Electronics)

    })


    filterPersonalCare.addEventListener("click",()=>{

        // console.log(Product_data)

        let Fillter_Personal_Care=Product_data.filter((el)=>el.category==="Personal Care")
        // console.log(Fillter_Food)
        CardList(Fillter_Personal_Care)

    })

    searchByButton.addEventListener("click",()=>{
        let Fillter_founder=Product_data.filter((el)=>el.founder==="Niks")
        CardList(Fillter_founder)
    })


    // +++++++++++++++++++++++++++++++++++++ Short part+++++++++++++++++++++++++++++++++++++++


    sortAtoZBtn.addEventListener("click",()=>{
        console.log(Product_data)

        sortAtoZBtn=Product_data.sort((a,b)=>a.price-b.price)
        CardList(sortAtoZBtn)

    })

    sortZtoABtn.addEventListener("click",()=>{
        console.log(Product_data)

        sortAtoZBtn=Product_data.sort((a,b)=>b.price-a.price)
        CardList(sortAtoZBtn)

    })


// updates (populate)

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link"))
    {
        let id= e.target.dataset.id
        PopulateFrom(id);
    }
})

function PopulateFrom(id)
{
    fetch(`https://shark-tank-be-1.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>
    {
        console.log(data)
        updatePitchIdInput.value=data.id
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchfounderInput.value=data.founder
        updatePitchCategoryInput.value=data.category
        updatePitchPriceInput.value=data.price
    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    let updateProductData={
        id:updatePitchIdInput.value,
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
        price:updatePitchPriceInput.value
    }

    fetch(`https://shark-tank-be-1.onrender.com/pitches/${updateProductData.id}`,{

    method:"PUT",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateProductData),

    }).then((res)=>res.json())
    .then((data)=>{
        alert("Update Ho gya !! ")
        console.log(data)
    })
    .catch((err)=>console.log(err))
})

updatePricePitchPriceButton.addEventListener("click",()=>{
    let updateProductDataPrice={
        id:updatePitchIdInput.value,
        price:updatePitchPriceInput.value
    }

    fetch(`https://shark-tank-be-1.onrender.com/pitches/${updateProductDataPrice.id}`,{

    method:"PATCH",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateProductDataPrice),

    }).then((res)=>res.json())
    .then((data)=>{
        alert("Update Ho gya !! ")
        console.log(data)
    })
    .catch((err)=>console.log(err))
})