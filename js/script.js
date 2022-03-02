// getting input result from API 

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const searchLowerText = searchText.toLowerCase();

    // const url = `https://openapi.programming-hero.com/api/phones?search=${searchLowerText}`
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;

    // fetch(`https://openapi.programming-hero.com/api/phones?search=${searchLowerText}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.data))
}

const displayResults = phones => {
    const resultsField = document.getElementById('display-phones');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 w-75 mx-auto p-3 custom-card">
                
                    <img src="${phone.image}" class="card-image card-img-top w-75 mx-auto" alt="...">
                
                <div>
                    <div class="card-body">
                            <h4 class="card-title">${phone.phone_name}</h4>
                            <p class="card-text">${phone.brand}</p>
                        <div class='text-end'>
                            <button class='custom-button' onclick="loadPhoneDetails('${phone.slug}')">View Details</button>  
                        </div>
                    </div>
                </div>
            </div>
        `
        resultsField.appendChild(div);
    });
}

// phone.slug problem was not loaded without inverted comma

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductDetails(data.data))
}

const displayProductDetails = details => {
    const productDetilsField = document.getElementById('phone-details')

    console.log(details);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${details.image}" class="img-fluid rounded-start p-2" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title fw-bold">${details.name}</h4>
                            <p class="card-text"><small class="">${details.releaseDate}</small></p>
                            <div>
                                <h6 class="fw-bold">Specifications: </h6>
                                <ul class="specifications m-0 p-0">
                                    <li>
                                        <p class="feature-title fw-bold">Chipset: <span class="details fw-light">${details.mainFeatures.chipSet} </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="feature-title fw-bold">Display: <span class="details fw-light">${details.mainFeatures.displaySize} </span>
                                        </p>
                                    </li>
                                    
                                    <li>
                                        <p class="feature-title fw-bold">Memory: <span class="details fw-light"> ${details.mainFeatures.memory}</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    `
    productDetilsField.appendChild(div);
}