import SignUpForm from "../../modules/SingUpForm/components/SignUpForm.tsx";
import {useParams} from "react-router-dom";

const AdminEditUser = () => {
    const {id} = useParams();

    return (
        <div className='container'>
            <SignUpForm type={'editAdmin'} id={id ? Number(id) : undefined}/>
        </div>
    );
};

export default AdminEditUser