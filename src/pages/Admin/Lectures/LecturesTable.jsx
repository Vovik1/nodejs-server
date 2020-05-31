import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLectures } from "../../../store/actions/getLectures";
import BodyTable from './BodyTable';
import Pagination from './Pagination';
import UpdatePage from '../../Lectures/Update/UpdatePage'


const mapDispatchToProps = (dispatch) => ({
    getLectures: () => dispatch(getLectures())
});

const mapStateToProps = (state) => ({
    lecturesList: state.lectures.lectures
});

const LecturesTable = ({ lecturesList, getLectures }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lecturesPerPage] = useState(5);
    const [openDetails, setOpenDetails] = useState(false);
    const [editPage, setEditPage] = useState(null);

    useEffect(() => {
        getLectures();
    }, [])

    //Get current lectures
    const indexofLastLecture = currentPage * lecturesPerPage;
    const indexOfFirstLecture = indexofLastLecture - lecturesPerPage;
    const currentLecturesList = lecturesList.slice(indexOfFirstLecture, indexofLastLecture);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleCloseDetails = () => setOpenDetails(false);

    return (
    <div className="adminContent">
        {openDetails && <UpdatePage
                editPage={editPage}
                closeDetails={handleCloseDetails}/>}

        {!openDetails && 
        <Table celled compact style={{border: 'none', padding: '0 20px'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={3}></Table.HeaderCell>
                    <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={8}>Video</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <BodyTable lecturesList={currentLecturesList} 
                handleEditPage={setEditPage}
                handleOpenDetails={setOpenDetails} />
            <Pagination
                lecturesPerPage={lecturesPerPage}
                totalLectures={lecturesList.length}
                paginate={paginate} />
        </Table>
        }
    </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturesTable);


