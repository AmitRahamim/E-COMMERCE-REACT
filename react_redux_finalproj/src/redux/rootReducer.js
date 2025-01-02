import { v4 as uuidv4 } from 'uuid';

const initialState = {
  categories: ["Clothing", "Electric","food"],
  users: [{id:'1',firstname:"dani",lastname: "levi",username: "CR7",password: "123",isChecked: true,productsB: [{product:"Watch",Qty:"3",date:"01.02.2020",price:"599"},{product:"PC",Qty:"2",date:"02.02.2020",price:"800"}],registrationDate: "11.12.23",},
          {id:'2',firstname:"dodi",lastname: "biton",username: "tupac",password: "1234",isChecked: true,productsB: [{product:"Watch",Qty:"4",date:"07.07.2021",price:"599"}],registrationDate: "11.12.25"},
          {id:'3',firstname:"lebron",lastname: "james",username: "LBJ",password: "12345",isChecked: true,productsB: [{product:"PS5",Qty:"5",date:"12.12.2024",price:"799"}],registrationDate: "11.12.25",},
          {id:'4',firstname:"lonzo",lastname: "ball",username: "tupac2",password: "123456",isChecked: true,productsB: [{product:"Pants",Qty:"4",date:"12.10.2024",price:"50"},{product:"PC",Qty:"4",date:"12.10.2024",price:"800"}],registrationDate: "11.12.25",},
         ],
  products: [{id:"1",title:"T-Shirt",price:80,category:"Clothing",linktoimg :"https://cdn-ilabanf.nitrocdn.com/tqGMHuzsmqTFSiGQDPlOgzcyUrndJWRT/assets/images/optimized/rev-19017b5/www.torontotees.com/wp-content/uploads/2022/09/men-shirt.png",description:"very nice shirt",boughtB:[{name:"dani",Qty:"3",date:"01/02/2020",id:'1'},{name:"dodi",Qty:"4",date:"07/07/2021",id:'2'}],inStock:43},
             {id:"2",title:"Watch",price:599,category:"Electric",linktoimg :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8-FQhtkGhORnM0viOZj1kmmYQ_WI-cVUVw&s",description:"Luxury watch",boughtB:[{name:"lebron",Qty:"1",date:"02/02/2024",id:'3'},{name:"dani",Qty:"3",date:"01/02/2020",id:'1'}],inStock:46},
             {id:"3",title:"PS5",price:799,category:"Electric",linktoimg :"https://cdn.mos.cms.futurecdn.net/DYpawjHwRVo6t23DLNeqna.png",description:"ps5 is the best!",boughtB:[{name:"lebron",Qty:"5",date:"12/12/2024",id:'3'}],inStock:45},
             {id:"4",title:"Pants",price:50,category:"Clothing",linktoimg :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZRT6QtKGctCsu4aMYPnOoUviAZGrsX1aHw&s",description:"big baller pants",boughtB:[{name:"lonzo",Qty:"4",date:"12/10/2024",id:'4'}],inStock:46},
             {id:"5",title:"PC",price:800,category:"Electric",linktoimg :"https://i5.walmartimages.com/seo/ViprTech-com-Prime-Gaming-PC-Computer-Intel-Core-i5-3rd-Gen-NVIDIA-GTX-750-Ti-2GB-16GB-RAM-1TB-HDD-WiFi-RGB-Windows-10-Pro-1-Year-Warranty-White_d9b65db0-4d5f-4338-b799-3dc93d41bf83.01dbaa60067ddda4ab566fdd7945733e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",description:"macbookair",boughtB:[{name:"lonzo",Qty:"4",date:"12/10/2024",id:'4'},{name:"dani",Qty:"2",date:"02/02/2020",id:'1'}],inStock:44}

]
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDUser':
      return {
        ...state,
        users: [...state.users, { id: uuidv4(), ...action.payload }],
      };
    
    case 'UpdateUser':
    const users = [...state.users];
    const index = users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          users[index] = action.payload;
        }
        return { ...state, users };
    
    case 'ADDCategory':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case 'DELETECategory':
      const newCategories = state.categories.filter((cat) => cat !== action.payload);
      return { ...state, categories: newCategories };

    case 'UPDATECategory': {
      const { oldCategory, newCategory } = action.payload;
      const updatedCategories = state.categories.map((cat) =>
        cat === oldCategory ? newCategory : cat
      );
      return { ...state, categories: updatedCategories };
    }
    case 'UPDATE_PRODUCT': {
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload } // Spread to update product fields
          : product
      );
      return { ...state, products: updatedProducts };
    }
    case 'ADD_PRODUCT_EMPTY':
      return {
        ...state,
        products: [...state.products, { id: uuidv4(), ...action.payload }],
      };

    default:
      return state;
  }
};

export default UsersReducer;
