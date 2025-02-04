import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSection } from '../../../../operations/section';
import LoadingBtn from '../../../Common/LoadingBtn';

export default function DeleteSectionModal({courseId,section}) {
  const currUser = useSelector(store=>store.auth);
  const fetching = useSelector(store => store.fetching)
  const dispatch = useDispatch();

  const handleDeleteSection= ()=>{
    if(currUser.token){
      DeleteSection(dispatch,courseId,section._id,currUser.token)
    }else{
      return;
    }
  }

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white">

        <button
          onClick={() => document.getElementById('my_modal_5').close()}
          className="absolute top-2 right-3 btn min-h-[30px] h-[30px] bg-gray-100 hover:bg-gray-200 border-0 px-2 p-1">
          <RxCross2 className="text-black font-[900] text-lg" />
        </button>

          <div class="mb-2 text-center">
            <div className='w-full flex justify-center  items-center mb-3'>
            <MdErrorOutline className='text-[2rem] text-red-500'/>
            </div>
            <p className='text-indigo-600 font-[700] text-[1.2rem]'>{section.sectionName}</p>
            <h3 class="mb-5 text-md  text-gray-700 font-semibold">Are you sure you want to delete ?</h3>
            <button
            onClick={handleDeleteSection}
             data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              {fetching?
              <LoadingBtn working={'Deleting.'}/>:
              "Yes, I'm sure"
              }
            </button>
            <button 
             onClick={() => document.getElementById('my_modal_5').close()}
            data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
          </div>
      </div>
    </dialog>
  )
}
