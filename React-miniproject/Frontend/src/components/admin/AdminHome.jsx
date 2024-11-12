import React, { useEffect, useState } from 'react';
import { Block } from '../../../public/icons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, fetchData } from '../../redux/adminRedux/adminThunk';
import { showToastMessage } from '../../validation/Toast';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const searchFunction = (userData, searchValue) => {
    const data = userData.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return data;
};

const AdminHome = () => {
    const userData = useSelector((store) => store.adminSlice.userData);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(null);
    const [name, setName] = useState(null);
    const [search, setSearch] = useState('');
    const [isBlocked, setIsBlocked] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const data = searchFunction(userData, search);
        setData(data);
    }, [search]);

    useEffect(() => {
        if (userData.length > 0) {
            setData(userData);
        }
    }, [userData]);

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    function handleSave(userId) {
        if (name.trim() === '') {
            showToastMessage('Enter a valid Name');
        } else {
            dispatch(editUser({ name, userId, is_blocked: isBlocked, toast }));
            setEdit(null);
        }
    }

    function delUser(userId) {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonColor: '#ccc',
            cancelButtonColor: '#000',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    confirmButtonColor: '#000',
                }).then(() => {
                    dispatch(deleteUser({ userId, toast }));
                });
            }
        });
    }

    return (
        <div className="flex bg-white flex-grow flex-col min-h-screen p-4">
            <ToastContainer />
            <div className="flex justify-center">
                <div className="flex items-center w-full max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        className="px-4 py-2 flex-grow rounded border"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="px-4 py-2 ml-2 rounded border" onClick={() => setSearch('')}>
                        Clear
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto mt-8">
                <table className="table-auto w-5/6 mx-auto">
                    <thead>
                        <tr className="text-white" style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Mobile</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Edit</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&
                            data.map((user, index) => (
                                <tr className="bg-white text-black" key={index}>
                                    {edit === user._id ? (
                                        <>
                                            <td className="border-y px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="border-b-black border-b-2 focus:outline-none"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">{user.email}</td>
                                            <td className="border px-4 py-2">{user.mobile}</td>
                                            <td className="border px-4 py-2">
                                                <select value={isBlocked} onChange={(e) => setIsBlocked(e.target.value === 'true')}>
                                                    <option value="false">UnBlocked</option>
                                                    <option value="true">Blocked</option>
                                                </select>
                                            </td>
                                            <td className="border-y px-4 py-2">
                                                <button onClick={() => handleSave(user._id)} className="border px-2">
                                                    Save
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border px-4 py-2">{user.name}</td>
                                            <td className="border px-4 py-2">{user.email}</td>
                                            <td className="border px-4 py-2">{user.mobile}</td>
                                            <td className="border px-4 py-2">
                                                {user.is_blocked ? 'Blocked' : 'UnBlocked'}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button 
                                                    onClick={() => {
                                                        setEdit(user._id);
                                                        setName(user.name);
                                                        setIsBlocked(user.is_blocked);
                                                    }}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                                    >
                                                   Edit
                                                </button>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button onClick={() => delUser(user._id)}>
                                                    <Block />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;
