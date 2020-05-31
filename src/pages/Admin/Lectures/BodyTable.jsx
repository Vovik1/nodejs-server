import React from 'react';
import RowTable from './RowTable';
import {Table} from 'semantic-ui-react';

const BodyTable = ({lecturesList, handleEditPage, handleOpenDetails}) =>{ 
    return(
        <Table.Body>
            {lecturesList.map((lecture,i)=>{
                return (       
                        <RowTable 
                            key ={i}
                            lecture ={lecture}  
                            handleEditPage={handleEditPage}
                            handleOpenDetails={handleOpenDetails} />
                       );
                })
            }
        </Table.Body>
    );
}

export default BodyTable