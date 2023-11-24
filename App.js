//Products: Id, Name, Category, Brand, Quantity, Image, Price
const products = [
  {
    id: 1,
    name: "Uniqlo T-shirt",
    category: "Clothing",
    brand: "Uniqlo",
    quantity: 1,
    image: "img/Uniqlo_T-shirt.jpg", 
    color: "Gray",
    price: 10.0,
  },
  {
    id: 2,
    name: "Levi's Jeans",
    category: "Clothing",  
    brand: "Levi's",
    quantity: 1,
    image: "img/Levis_jeans.jpg",   
    color: "blue",
    price: 50.0,
  },
  {
    id: 3,
    name: "Nike Sneakers",
    category: "Shoes",
    brand: "Nike",
    quantity: 1,
    image: "img/Nike_Sneakers.jpg",
    color: "red white black",
    price: 60.0,
  },
  {
    id: 4,
    name: "Adidas Sandals",
    category: "Shoes",
    brand: "Adidas",
    quantity: 1,
    image: "img/Adidas_Sandals.jpg",
    color: "black yellow",
    price: 40.0,
  },
  {
    id: 5,
    name: "Zara Dress",
    category: "Clothing",
    brand: "Zara",
    quantity: 1,
    image: "img/Zara_Dress.jpg",
    color: "black",
    price: 30.0,
  },
  {
    id: 6,
    name: "H&M Skirt",
    category: "Clothing",
    brand: "H&M",
    quantity: 1,
    image: "img/H&M_Skirt.jpg",
    color: "Black white ",
    price: 20.0,
  },
  {
    id: 7,
    name: "Mango Blouse",
    category: "Clothing",
    brand: "Mango",
    quantity: 1,
    image: "img/Mango_Blouse.jpg",
    color: "polca dots white gray brown",
    price: 15.0,
  },
  {
    id: 8,
    name: "Christian Louboutin Heels",
    category: "Shoes",
    brand: "Christian Louboutin",
    quantity: 1,
    image: "img/Christian_Louboutin_Heel.jpg",
    color: "cream pink",
    price: 70.0,
  },
  {
    id: 9,
    name: "The North Face Jacket",
    category: "Clothing",
    brand: "The North Face",
    quantity: 1,
    image: "img/The_North_Face_Jacket.jpg",
    color: "black and white",
    price: 40.0
    
  },
  {
    id: 10,
    name: "Gucci Hat",
    category: "Accessories",
    brand: "Gucci",
    quantity: 1,
    image: "img/Gucci_Hat.jpg",
    color: "Brown",
    price: 10.0,
  },
];

// Create a copy of the original products array using the spread operator
const newProducts = [...products];

// Define a function named displayItem that takes an array of items as a parameter
const displayItem = (items) => {
  // Access the root element in the HTML document where the items will be displayed
  const rootElement = document.getElementById("root");
  if (items.length === 0) {
    // Display a message if no matching products are found
    rootElement.innerHTML = "<p><center>No matching products found.</center></p>";
  } else {
    // Generate HTML markup for each item in the array
    rootElement.innerHTML = items.map((item) => {
      let { image, name, price, quantity } = item;
      // Return HTML markup for each item, utilizing the destructured properties
      return `<div class="box">
            <div class="img-box"> 
                <img class="images" src=${image}></img>
            </div>
            <div class="bottom">
                <p>${name}</p>
                <p>₱ ${price}</p>
                <p style="font-size: 80%"> Quantity : ${quantity}</p>
                <button>Add to Cart</button>
            </div>
        </div>`;
      // Join the array of HTML strings into a single string and set it as the innerHTML of the root element
    }).join("");
  }
};

// Initial display of items
displayItem(newProducts);

//Search bar start --
// Event listener for the search bar
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", () => updateFiltersAndDisplayItems());
// -- Search bar end

//Category elements start --
// Event listener for dropdown items
const categoryElements = document.querySelectorAll(".menu");

categoryElements.forEach((item) => {
  item.addEventListener("click", () => {
    updateFiltersAndDisplayItems();
  });
});
// -- Category elements end 

//price checkbox start --
// Event listener for price checkboxes
const priceCheckboxes = document.querySelectorAll(".price-CheckBox");
const allPriceCheckbox = document.getElementById("price-all");

// Event listener for "All Price" checkbox
allPriceCheckbox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  // If "All Price" is checked, uncheck other checkboxes and trigger filtering
  if (isChecked) {
    priceCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  }
  updateFiltersAndDisplayItems();
});

// Event listener for individual price checkboxes
priceCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // If other checkboxes are checked, uncheck "All Price" and trigger filtering
    allPriceCheckbox.checked = false;
    updateFiltersAndDisplayItems();
  });
});
// -- Price checkbox end

//Brand checkbox start --
// Event listener for brand checkboxes
const brandCheckboxes = document.querySelectorAll(".brand-CheckBox");
const allBrandCheckbox = document.getElementById("brand-all");

// Event listener for "All Brand" checkbox
allBrandCheckbox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  // If "All Brand" is checked, uncheck other checkboxes and trigger filtering
  if (isChecked) {
    brandCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  }
  updateFiltersAndDisplayItems();
});

// Event listener for individual brand checkboxes
brandCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // If other checkboxes are checked, uncheck "All Brand" and trigger filtering
    allBrandCheckbox.checked = false;
    updateFiltersAndDisplayItems();
  });
});
// -- Brand checkbox end

//Update filters start --
// Update and Display Items
function updateFiltersAndDisplayItems() {
  // Make a copy of the original products array
  let filteredData = newProducts;

  // Get the initial innerText of the category dropdown
  const selectedCategory = document.getElementById("Categories").innerText;
  const searchData = searchBar.value.toLowerCase();
  const priceCheckboxes = document.querySelectorAll(".price-CheckBox");
  const brandCheckboxes = document.querySelectorAll(".brand-CheckBox");

  // Function to filter items based on the selected category
  if (selectedCategory !== "Categories" && selectedCategory !== "All") {
    filteredData = filteredData.filter((data) => data.category === selectedCategory);
  }

  // Function to filter items based on the search term
  if (searchData !== "") {
    filteredData = filteredData.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchData);
      const priceMatch = item.price <= parseFloat(searchData);
      const categoryMatch = item.category.toLowerCase().includes(searchData);
      const brandMatch = item.brand.toLowerCase().includes(searchData);
      const colorMatch = item.color.toLowerCase().includes(searchData);

      return nameMatch || colorMatch || priceMatch || categoryMatch || brandMatch;
    });
  }

  // Function to filter items based on the selected price range
  const checkedPriceCheckboxes = Array.from(priceCheckboxes).filter((priceCheckbox) => priceCheckbox.checked);

  if (checkedPriceCheckboxes == 0) {
    allPriceCheckbox.checked = true;
  } else {
    const priceRanges = checkedPriceCheckboxes.map((priceCheckbox) => priceCheckbox.value);
    filteredData = filteredData.filter((item) => {
      const itemPrice = item.price;
      return priceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return itemPrice >= min && itemPrice <= max;
      });
    });
  }

  // Function to filter items based on the selected brands
  const checkedBrandCheckboxes = Array.from(brandCheckboxes).filter((brandCheckbox) => brandCheckbox.checked);
  if (allBrandCheckbox.checked) {
    // Do nothing if "All Brand" is checked
  } else {
    if (checkedBrandCheckboxes == 0) {
      allBrandCheckbox.checked = true;
    } else {
      const selectedBrands = checkedBrandCheckboxes.map((brandCheckbox) => brandCheckbox.value);
      filteredData = filteredData.filter((item) => selectedBrands.includes(item.brand));
    }
  }

  // Display the filtered items
  displayItem(filteredData);
}
// -- Update Filters end


// Function to clear all filters
function clearFilters() {
  // Reset values and checkboxes
  searchBar.value = "";
  allPriceCheckbox.checked = true;
  priceCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  allBrandCheckbox.checked = true;
  brandCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    // Reset the "Categories" dropdown
    const categoriesDropdown = document.getElementById("Categories");
    categoriesDropdown.innerText = "Categories";
  // Update filters and display items
  updateFiltersAndDisplayItems();
}



//Categories - Dropdown
const dropdowns = document.querySelectorAll(".dropdown");

//look through all dropdown elements
dropdowns.forEach((dropdown) => {
  //get inner elements from each dropdown
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  /*
    We are using this method in order to have
    multiple dropdown menus on the page work
  */

  //add a click event to the select element
  select.addEventListener("click", () => {
    //Add the clicked select styles to the select element
    select.classList.toggle("select-clicked");
    //Add rotate styles to the caret element
    caret.classList.toggle("caret-rotate");
    //Add the open styles to the menu element
    menu.classList.toggle("menu-open");
  });

  //Loop through all option elements
  options.forEach((option) => {
    //add a click event to the option element
    option.addEventListener("click", () => {
      //change selected inner text tp clicked option inner text
      selected.innerText = option.innerText;
      //add the clicked select styles to the select element
      select.classList.remove("select-clicked");
      //add the rotate styles to the caret element
      caret.classList.remove("caret-rotate");
      //add the open styles to the menu element
      menu.classList.remove("menu-open");
      //remove active class from all option elements
      options.forEach((option) => {
        option.classList.remove("active");
      });
      //add active class to clicked option element
      option.classList.add("active");
    });
  });
});

