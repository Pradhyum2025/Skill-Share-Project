import React from 'react'
import EditSectionModal from './EditSectionModal'
import DeleteSectionModal from './DeleteSectionModal'
import CreateSectionModal from './CreateSectionModal'
import DeleteSubSectionModal from '../subSection/DeleteSubSectionModal'
import ViewSubSectionModal from '../subSection/Instructor.VideoModal'

export default function SectionModal({purpose,courseId,section,subSection}) {
 
  switch (purpose){

    case 'edit':{
      return (
        <EditSectionModal courseId={courseId} section={section}/>
      )
    }
    case 'delete':{
      return (
      <DeleteSectionModal courseId={courseId} section={section}/>
      )
    }
    case 'create':{
      return(
       <CreateSectionModal courseId={courseId} />
      )
    }
    case 'deleteSubSection':{
      return (
      <DeleteSubSectionModal courseId={courseId} sectionId={section._id} subSection={subSection}/>
      )
    }
    case 'viewSubSection':{
      return (
      <ViewSubSectionModal subSection={subSection}/>
      )
    }
    
  } 
}
