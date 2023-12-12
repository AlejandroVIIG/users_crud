import { IconArrowsMinimize } from "@tabler/icons-react";

const Modal = ({showModal, onCloseModal, register, handleSubmit, createUser, isUpdating, updateUser}) => {

    const submit = currentUser => {
        createUser(currentUser);
        isUpdating ? updateUser(currentUser) : createUser(currentUser); 
    }

    return (
    <section className={`fixed bg-black/60 top-0 left-0 right-0 h-screen flex justify-center items-center transition-opacity ${showModal ? "visible opacity-100" : "invisible opacity-0"}`}>

        <form onSubmit={handleSubmit(submit)} className="relative grid gap-4 [&>label]:grid [&>label]:gap-1 [&>label>span>span]:text-red-600 [&>label>span]:text-sm [&>label>span]:font-semibold bg-white p-4 rounded-md w-[min(100%,_ 280px)]">
            
            <button type="button" onClick={onCloseModal} className="absolute top-2 right-2 hover:text-red-500 transition-colors"><IconArrowsMinimize size={20} /></button>
            <h2 className="text-center font-semibold">
                {
                    isUpdating ? "Update user" : "Create user"
                }</h2>
            <label>
                <span>
                    First name: <span>*</span>
                </span>
                <input className="border-2 rounded-md p-1 outline-none" type="text" placeholder="John"
                    {...register("first_name")} />
            </label>
            <label>
                <span>
                    Last name: <span>*</span>
                </span>
                <input {...register("last_name")} className="border-2 rounded-md p-1 outline-none" type="text" placeholder="Doe" />
            </label>
            <label>
                <span>
                    email: <span>*</span>
                </span>
                <input className="border-2 rounded-md p-1 outline-none" type="email" placeholder="test@test.com"
                {...register("email")} />
            </label>
            <label>
                <span>
                    Password: <span>*</span>
                </span>
                <input {...register("password")} className="border-2 rounded-md p-1 outline-none" type="password" placeholder="Pass123"/>
            </label>
            <label>
                <span>
                    Date of birth: <span>*</span>
                </span>
                <input {...register("birthday")} className="border-2 rounded-md p-1 outline-none" type="date"/>
            </label>
            <button onClick={submit} type="submit" className="bg-blue-600 text-white font-semibold p-2 rounded-sm hover:bg-blue-700 transision-colors uppercase hover:tracking-widest">
                {
                    isUpdating ? "Save changes" : "Create user"
                }   
            </button>
        </form>
    </section>
    )
}
export default Modal