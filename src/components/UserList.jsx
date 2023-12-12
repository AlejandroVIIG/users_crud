import { IconEdit, IconTrashFilled } from "@tabler/icons-react";

const UserList = ({users, deleteUser, handleUpdateUser}) => {

    return (
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
            {
                users.map(user => (
                    <article key={user.id} className="border-2 rounded-md py-2 px-4 hover:shadow-lg transition-shadow grid gap-2">
                        <h2 className="capitalize font-bold text-lg line-clamp-1">{user.first_name}</h2>
                        <ul>
                            <li>
                                <span className="font-semibold">Last name: {user.last_name}</span>
                            </li>
                            <li>
                                <span className="font-semibold">Email: {user.email }</span>
                            </li>
                            <li>
                                <span className="font-semibold">Date of birth: {user.birthday}</span>
                            </li>
                        </ul>
                        <div className="flex gap-2">
                            <button onClick={() => handleUpdateUser(user)} className="rounded-md p-1 text-white bg-yellow-500 hover:shadow-lg hover:bg-yellow-400 transition-colors"><IconEdit/></button>
                            <button onClick={() => deleteUser(user.id)} className="rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"><IconTrashFilled /></button>
                        </div>
                    </article>
                ))   
            }
        </section>
    )
}
export default UserList;