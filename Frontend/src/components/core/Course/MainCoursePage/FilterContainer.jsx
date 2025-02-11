import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import SearchBar from '../SearchPage';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../../../../operations/category';
import { getAllCourses, getFilteredCourses } from '../../../../operations/course';
import { getAllCategories } from '../../../../operations/category';


export const FilterContainer = () => {
  //set filtrers
  const [filters, setFilters] = useState({
    category: ''
  });

  const dispatch = useDispatch();

  //Fetch existing category on intial render
  useEffect(() => {
    getAllCategories(dispatch);
  }, [])

  const categories = useSelector(store => store.category);

  // Handler change function
  const handleFilterChange =async (e) => {

    //get all course choose by user
    const { name, value } = e.target;

    if (value === '*') {
      setFilters(() => ({
        category: '',
      }));
      return await getAllCourses(dispatch);
    }

    // if user choose a specific category then
    if (categories.length > 0 && value < categories?.length) {

      //Set applied filters then
      setFilters(() => ({
        [name]: categories[value]?.name
      }));

      //get filtered courses
      if (categories[value]) {
        return getFilteredCourses(dispatch, categories[value]?._id);
      }
    }
    return;
  };

  // Clear fiters
  const clearAllFilters =async () => {
    if(filters.category !==''){
      setFilters({
        category: '',
      });
  
      return await getAllCourses(dispatch);
    }else{
     return;
    }
  };

  return (
    <div className="shadow-md bg-gray-800  px-2 py-2  w-full  transition-all duration-300 ease-in-out sticky top-[3.6rem]">

      {/* Fiter options  */}
      <div className={`flex justify-between items-center w-full `}>
        {/* filter btn */}
        <div className="space-y-2">
          <select
            id="category"
            name="category"
            onChange={handleFilterChange}
            className="bg-gray-600 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="*">All Categories</option>
            {categories.map((category, indx) => {
              return <option key={category._id} value={indx}>{category.name}</option>
            })}
          </select>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* clear btn */}
        <button
          onClick={clearAllFilters}
          className={`${(filters?.category==='')?'hidden':'block'} bg-red-500 hover:bg-red-600 text-white font-semibold md:font-bold py-1 md:py-2 px-2 md:px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-[1rem]`}
          aria-label="Clear all filters"
        >
          <span className="flex items-center">
            <FiX className="mr-2" />
            Clear
          </span>
        </button>

      </div>

      {/* Applied categories */}
      {filters?.category !== '' ?
        <div className={`bg-gray-600 px-4 py-2 mt-1 rounded-md`}>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              value && (
                <span key={key} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {key}: {value}
                </span>
              )
            ))}
          </div>
        </div> :
        null
      }

    </div>
  );
};
