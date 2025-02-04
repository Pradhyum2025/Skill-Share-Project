import React, { useState, useSyncExternalStore } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToBag, isPresentInCart, removeToBag } from '../../operations/bag';
import LoadingBtn from './LoadingBtn';
import { MdAddShoppingCart } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
export default function BagBtn({ course }) {

  const currUser = useSelector(store => store.auth);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const userBag = useSelector(store => store.bag)
  //Add to cart Handler
  const handleAddToBag = (course) => {
    if (currUser?.accountType==='Student' && currUser.token) {
      addToBag(dispatch, course, currUser.token, setFetching);
    } else {
      return;
    }
  }
  //Remove to cart Handler
  const handleRemoveToBag = (courseId) => {
    if (currUser?.accountType==='Student' && currUser.token) {
      removeToBag(dispatch, courseId, currUser.token, setFetching);
    } else {
      return;
    }
  }

  let isPresent = isPresentInCart(course, userBag)

  return (
    <div>

      {isPresent ?
        <button
          onClick={() => handleRemoveToBag(course._id)}
          type='button' class="btn text-black bg-yellow-500 hover:bg-yellow-600  px-3 text-[1rem] font-[600] border-0 min-h-[2rem] h-[2.5rem]">
          {fetching ?
            <LoadingBtn working={'Removing...'} /> :
            <span className='flex items-center gap-2'>Remove <MdRemoveShoppingCart className='text-[1.4rem]'/></span>
          }
        </button> :
        <button
          onClick={() => handleAddToBag(course)}
          type='button' class="btn text-white bg-indigo-600 hover:bg-indigo-700  px-6 text-[1rem] font-[600] border-0 min-h-[2rem] h-[2.5rem]">
          {fetching ?
            <LoadingBtn working={'Adding...'} /> :
            <span className='flex items-center gap-3'>Add <MdAddShoppingCart className='text-[1.4rem]'/></span>
          }
        </button>
      }

    </div>
  )
}
