import React, {useState, Fragment} from 'react';
import {Button, Icon, Pagination, Table} from 'semantic-ui-react';
import User from "../../../models/user";
import {PaginationProps} from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";
import DeleteUserModal from "./DeleteUserModal";
import UsersOptions from "./UsersOptions";
import {deleteUser} from "../../../store/actions/deleteUser";
import {connect, ConnectedProps} from "react-redux";

interface Props {
    usersList: User[]
}

const RenderTableUser = ({list, config, handleOpenDetails, handleSetUser}: any) => {
    const [currentUser, setCurrentUser] = useState({});
    return list.map((user: User, index: number) => {
        const {name, email, surName, role} = user;
        return (
            <Table.Row key={index}>
                <Table.Cell width={5}>{`${name} ${surName || ''}`}</Table.Cell>
                <Table.Cell width={6}>{email}</Table.Cell>
                <Table.Cell width={3}>{role}</Table.Cell>
                <Table.Cell width={4}>
                    <Button style={{marginRight: '15px'}}
                            onClick={() => {
                                handleOpenDetails(true);
                                handleSetUser(user);
                            }}>
                        <Icon link name='pencil alternate' style={{margin: '0'}}/>
                    </Button>
                    <Button onClick={() => {
                        setCurrentUser(user);
                        config.handleOpen(true);
                    }}>
                        <Icon link name='trash alternate' color='red' style={{margin: '0'}}/>
                    </Button>
                </Table.Cell>
                <DeleteUserModal user={currentUser} config={config}/>
            </Table.Row>
        )
    })
};

const mapDispatchToProps = (dispatch: Function) => ({
    deleteUser: (id: string) => dispatch(deleteUser(id)),
});
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface UsersListProps extends PropsFromRedux {
    usersList: User[],
    handleOpenDetails: Function,
    handleSetUser: Function
}

const UsersList = ({usersList, handleOpenDetails, handleSetUser, deleteUser}: UsersListProps) => {
    const originalList = [...usersList];
    const [list, setList] = useState([...usersList]); // Todo naming

    //delete modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const handleRemove = (id: string) => {
        deleteUser(id);
        setModalOpen(false);
    };

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    //change page
    const paginate = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => setCurrentPage(data.activePage as number);

    //sort
    const [column, setColumn] = useState(null);
    type DirectionProps = undefined | "ascending" | "descending";
    const [direction, setDirection] = useState<DirectionProps>(undefined);

    const handleSort = (clickedColumn: any) => () => {
        setColumn(clickedColumn);
        switch (direction) {
            case "ascending": {
                setList(list.reverse());
                break;
            }
            case "descending": {
                setList(originalList);
                break;
            }
            default: {
                setList(list.sort((a: any, b: any) => (a[clickedColumn] > b[clickedColumn]) ? 1 : -1));
            }
        }

        const setType = (type: any) => {
            if (type === 'ascending') return 'descending';
            else if (type === 'descending') return undefined;
            else if (type === undefined) return 'ascending';
        };
        setDirection(setType(direction));
    };

    //search
    const [query, setQuery] = useState('');
    const onHandleQuery = (value: string) => setQuery(value);
    const filterFunc = () => {
        return list.filter((user: User) => {
            for (let key in user) {
                if (user.hasOwnProperty(key) && key !== 'id') {
                    if (user[key].includes(query)) {
                        return user
                    }
                }
            }
        });
    };

    const posts = !query ? list : filterFunc();
    const filteredPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const filteredTotalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <Fragment>
            <UsersOptions query={query}
                          handleQuery={onHandleQuery}
                          totalCount={posts.length}
                          handleOpenDetails={handleOpenDetails}
            />
            <Table sortable singleLine compact style={{border: 'none', padding: '0 20px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}
                                          sorted={column === 'name' ? direction : undefined}
                                          onClick={handleSort('name')}
                        >Full Name</Table.HeaderCell>
                        <Table.HeaderCell width={6}
                                          sorted={column === 'email' ? direction : undefined}
                                          onClick={handleSort('email')}
                        >Email</Table.HeaderCell>
                        <Table.HeaderCell width={3}
                                          sorted={column === 'role' ? direction : undefined}
                                          onClick={handleSort('role')}>Role</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <RenderTableUser
                        list={filteredPosts}
                        config={{
                            modalOpen: modalOpen,
                            handleOpen: handleOpen,
                            handleClose: handleClose,
                            handleRemove: handleRemove,
                        }}
                        handleOpenDetails={handleOpenDetails}
                        handleSetUser={handleSetUser}
                    />

                </Table.Body>


                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4' style={{textAlign: 'center'}}>
                            {posts.length &&
                            <Pagination
                                defaultActivePage={1}
                                totalPages={filteredTotalPages}
                                onPageChange={paginate}
                            />}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Fragment>
    )
};

export default connector(UsersList);

