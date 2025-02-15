import { Category } from "../models/category.js"; 

//Create Category ka handler function
export const createCategory = async (req, res) => {
  try {
    let { name, description } = req.body;
    name = name.trim();
    //Validation
    if(!name || !description) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required'
      })
    }
    //Search that input category already present or not
    const currCategory = await Category.findOne({name})

    if(currCategory){
      return res.status(401).json({
        success: false,
        message: 'Current category is already present and we need to unique catagories, Please try again,'
      })
    }
    //Create category payload
    const categoryPayload = {
      name,
      description
    }

    let response = await Category.create(categoryPayload);
    
    return res.status(200).json({
      success: true,
      message: "category created successful!",
      response
    })

  } catch (error) {
    console.log('category creation server error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'category creatation server error'
    })
  }
}

//get all category handler function
export const getAllCategory = async (req, res) => {
  try {
    const allCatagories = await Category.find({}, { name: true, description: true })

    return res.status(200).json({
      success: true,
      message: 'All catagories return successful',
      catagories: allCatagories
    })

  } catch (error) {
    console.log('error occured in get all category');
    return res.status(500).json({
      success: false,
      message: "Error occured while getting all category"
    })
  }
}

//get specific category handler function
export const getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const allCategory = await Category.find({ _id: categoryId }, { name: true, description: true })
      .populate('categoryCourses')
      .exec();

    return res.status(200).json({
      success: true,
      message: 'Specific category return successful',
      category: allCategory
    })

  } catch (error) {
    console.log('error occured in get all category');
    return res.status(500).json({
      success: false,
      message: "Error occured while getting all category"
    })
  }
}

// Update specific category handler function
export const updateCategory = async(req,res)=>{
  try{
    const { name, description } = req.body;
    const {categoryId}= req.params;
    
    
    //Validation
    if(!name || !description || !categoryId) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required'
      })
    }
    //Search that input category already present or not
    const currCategory = await Category.findById(categoryId)

    if(!currCategory){
      return res.status(401).json({
        success: false,
        message: 'Category not found'
      })
    }
    
    const response = await Category.findByIdAndUpdate({_id:categoryId},{
      name,
      description
    },{new:true})
    

    return res.status(200).json({
      success: true,
      message: "category up to date successfully!",
      response
    })


  }catch(error){
    console.log("Error occured to update category :",error,message);
    return res.status(500).json({
      success:false,
      message:'Failed to update category details'
    })
  }
}


//Delete category handler function
export const deleteCategory = async(req,res)=>{
  try{
    let {categoryId} = req.params;
    
    let currCategory  = await Category.findById(categoryId);
    if(currCategory){
      await Category.findByIdAndDelete(categoryId);
      
      return res.status(200).json({
        success: true,
        message: "category deleted successfully!",
      })
    }else{
      return res.status(400).json({
        success: false,
        message: "category not found!",
      })
    }
  }catch(error){
    onsole.log("Error occured to delete category :",error,message);
    return res.status(500).json({
      success:false,
      message:'Failed to delete category!'
    })
  }
}

