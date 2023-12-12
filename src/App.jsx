import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { IconMovie } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import UserList from "./components/UserList";

const BASE_URL = "https://users-crud.academlo.tech/";

function App() {

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  
  const {register, handleSubmit, reset} = useForm();

  const handleOpenModal = () => setShowModal(true);
  
  const handleCloseModal = () => {
    setShowModal(false);
    reset({
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
    });
    setUserToEdit(null);
  }

  const handleUpdateUser = user => {
    handleOpenModal();
    setUserToEdit(user);
  }
  

  const createUser = newUser => {
    axios.post(`${BASE_URL}/users/`, newUser)
         .then(({data: newUser}) => {
          setUsers([...users, newUser])
          handleCloseModal();
         })
         .catch(err => console.error(err));
  }

  const deleteUser = userToDeleteId => {
    axios.delete(`${BASE_URL}/users/${userToDeleteId}/`)
         .then(() => {
            const newUsers = users.filter(user => userToDeleteId !== user.id);
            setUsers(newUsers)
          })
         .catch(err => console.error(err));
  };

  const updateUser = user => {
    axios.patch(`${BASE_URL}/users/${userToEdit.id}/`, user)
         .then(({data: updateUser}) => {
          const newUsers = users.map(user => user.id === userToEdit.id ? updateUser : user);
          setUsers(newUsers);
          handleCloseModal();
         })
         .catch(err => console.error(err));
  }
  
  useEffect(() => {
    axios.get(`${BASE_URL}/users/`)
         .then(({data}) => setUsers(data))
         .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if(userToEdit !== null)
      reset(userToEdit)
  }, [userToEdit]);

  return (
    <main className="text-[18px]">
      <header className="flex justify-between p-2">
        <h1 className="text-center p-2 font-bold">User CRUD</h1>
        <button className="flex gap-2 items-center bg-blue-400 text-white font-semibold p-2 rounded-xl hover:bg-blue-500 transition-colors" onClick={handleOpenModal}>Add User <IconMovie /></button>
      </header>
      
      <Modal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        register={register}
        handleSubmit={handleSubmit}
        createUser={createUser}
        deleteUser={deleteUser}
        isUpdating={!!userToEdit}
        updateUser={updateUser}/>
      <UserList users={users} deleteUser={deleteUser} handleUpdateUser={handleUpdateUser}/>
    </main>
  );
}

export default App
