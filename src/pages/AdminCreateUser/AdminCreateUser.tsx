import SignUpForm from "../../modules/SingUpForm/components/SignUpForm.tsx";

const AdminCreateUser = () => {
    return (
        <div className='container'>
            <SignUpForm type={'create'}/>
        </div>
    );
};

export default AdminCreateUser