// getting input result from API 

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const searchLowerText = searchText.toLowerCase();
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchLowerText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.data))
        
}

// showing results in display 

const displayResults = phones => {
    const resultsField = document.getElementById('display-phones');
    resultsField.textContent='';
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

// loading individual phone details using their id

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductDetails(data.data))
}

// displaying phone details

const displayProductDetails = details => {
    const productDetilsField = document.getElementById('phone-details')
    productDetilsField.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${details.image}" class="img-fluid rounded-start p-3 w-100" alt="...">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title fw-bold">${details.name}</h3>
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